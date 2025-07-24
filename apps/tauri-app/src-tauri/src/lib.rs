use tokio::net::{TcpListener, TcpStream};
use serde::{Deserialize, Serialize};
use tokio_tungstenite::accept_async;
use futures_util::StreamExt;
use tauri::{Manager, Emitter};

#[derive(Debug, Deserialize, Serialize)]
struct LogMessage {
    source: String,                      // "redux" or "console"
    #[serde(default)]
    payload: Option<serde_json::Value>, // redux payload or null for console
    #[serde(default)]
    level: Option<String>,               // "log", "warn", "error" for console
    #[serde(default)]
    message: Option<String>,             // console log message
    #[serde(default)]
    actionType: Option<String>,          // redux action type
    #[serde(default)]
    timestamp: Option<u64>,              // optional timestamp
}

pub async fn run_websocket_server(app_handle: tauri::AppHandle) -> anyhow::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:7878").await?;
    println!("WebSocket server listening on 127.0.0.1:7878");

    loop {
        let (stream, _) = listener.accept().await?;
        let handle = app_handle.clone();
        tauri::async_runtime::spawn(async move {
            handle_client(stream, handle).await;
        });
    }
}

async fn handle_client(stream: TcpStream, app_handle: tauri::AppHandle) {
    let ws_stream = accept_async(stream).await.unwrap();
    println!("Client connected");

    let (_, mut reader) = ws_stream.split();

    while let Some(msg) = reader.next().await {
        match msg {
            Ok(msg) if msg.is_text() => {
                let raw = msg.into_text().unwrap();
                match serde_json::from_str::<LogMessage>(&raw) {
                    Ok(log) => {
                        if let Some(main_window) = app_handle.get_webview_window("main") {
                            let _ = main_window.emit("log-received", &log);
                        }
                    }
                    Err(err) => {
                        eprintln!("Invalid log: {err} | raw: {raw}");
                    }
                }
            }
            _ => {}
        }
    }
}
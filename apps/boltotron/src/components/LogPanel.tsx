import { useEffect, useState } from 'react';
import { listen } from '@tauri-apps/api/event';
type Log = {
  source?: string;
  payload?: string;
  level?: string;
  message?: string;
  actionType?: string;
  timestamp?: number;
};

const LOG_EVENT_NAME = 'log-received';

const LogEntry = ({ log }: { log: Log }) => {
  //TODO: delete logs
  console.log('🚀 -> log->', log);
  return (
    <div className="log-entry py-1">
      {log.source || 'No message'}
      {log.level && (
        <span className="ml-2 text-xs text-gray-500">[{log.level}]</span>
      )}
    </div>
  );
};

const useLogListener = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const setupLogListener = async () => {
      return await listen<Log>(LOG_EVENT_NAME, (event) => {
        setLogs((prevLogs) => [...prevLogs, event.payload]);
      });
    };

    const cleanup = setupLogListener();
    return () => {
      cleanup.then((unsubscribe) => unsubscribe());
    };
  }, []);

  return logs;
};

export function LogPanel() {
  const logs = useLogListener();

  return (
    <div className="font-mono text-sm p-4 log-panel">
      {logs.map((log) => (
        <LogEntry key={`log-${log.timestamp}`} log={log} />
      ))}
    </div>
  );
}

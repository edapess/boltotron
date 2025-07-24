import {LogPanel} from "./components/LogPanel.tsx";

function App() {

  return (
    <div style={{ padding: 20 }}>
      <h1>Reactron Logs</h1>
      <ul>
        <LogPanel/>
      </ul>
    </div>
  );
}

export default App;

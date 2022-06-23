import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Sidebar />
      <Player />
    </div>
  );
}

export default App;

import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import { GlobalContextProvider } from "./GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <Navigation />
        <Sidebar />
        <Player />
      </div>
    </GlobalContextProvider>
  );
}

export default App;

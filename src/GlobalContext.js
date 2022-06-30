import { createContext, useRef, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [songsList, setSongsList] = useState();
  const [currentlyLoadedSongs, setCurrentlyLoadedSongs] = useState();
  const [showNavigationDrawer, setShowNavigationDrawer] = useState();

  return (
    <GlobalContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentPlaylist,
        setCurrentPlaylist,
        songsList,
        setSongsList,
        currentlyLoadedSongs,
        setCurrentlyLoadedSongs,
        showNavigationDrawer,
        setShowNavigationDrawer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
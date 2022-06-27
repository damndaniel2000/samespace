import { createContext, useRef, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [songsList, setSongsList] = useState();

  return (
    <GlobalContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentPlaylist,
        setCurrentPlaylist,
        songsList,
        setSongsList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;

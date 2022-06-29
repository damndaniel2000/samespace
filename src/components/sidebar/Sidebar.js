import React, { useContext, useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import searchIcon from "../../assets/images/searchIcon.svg";
import { List, ListItemButton, Stack, Skeleton } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { LOAD_SONGS } from "../../GraphQL/queries";
import GlobalContext from "../../GlobalContext";

const Sidebar = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const {
    currentPlaylist,
    setCurrentSong,
    currentSong,
    setSongsList,
    currentlyLoadedSongs,
    setCurrentlyLoadedSongs,
  } = useContext(GlobalContext);

  const [getSongs, songs] = useLazyQuery(LOAD_SONGS);

  const secondsToMinute = (s) =>
    (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

  const playSong = (item, index) => {
    setSongsList(currentlyLoadedSongs);
    const data = { ...item };
    data.songIndex = index;
    setCurrentSong(data);
  };

  const getSongsList = (search) => {
    getSongs({
      variables: { playlistId: currentPlaylist.id, search: search },
    }).then((res) => setCurrentlyLoadedSongs(res.data.getSongs));
  };

  useEffect(() => {
    if (currentPlaylist) {
      getSongsList(currentSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylist, getSongs]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>{currentPlaylist?.title}</div>
        <div className={classes.searchbar_container}>
          <input
            placeholder="Search Songs, Artists"
            className={classes.searchbar}
            onChange={(e) => {
              setCurrentSearch(e.target.search);
              getSongsList(e.target.value);
            }}
          />
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>

      <div className={classes.songs}>
        {songs.loading && (
          <Stack spacing="-10px">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
              <Skeleton
                key={item}
                sx={{ bgcolor: "grey.900", height: 88 }}
                animation="wave"
                variant="text"
              />
            ))}
          </Stack>
        )}
        <List>
          {currentlyLoadedSongs?.length ? (
            currentlyLoadedSongs?.map((item, index) => (
              <ListItemButton
                onClick={() => playSong(item, index)}
                className={
                  item._id === currentSong?._id
                    ? `${classes.song} ${classes.active}`
                    : classes.song
                }
                key={item._id}
              >
                <div className={classes.song_left_container}>
                  <img
                    className={classes.icon}
                    src={item.photo}
                    alt="song avatar"
                  />
                  <div>
                    <div className={classes.song_title}>{item.title}</div>
                    <div className={classes.artist}>{item.artist}</div>
                  </div>
                </div>
                <div className={classes.duration}>
                  {secondsToMinute(item.duration)}
                </div>
              </ListItemButton>
            ))
          ) : (
            <ListItemButton className={classes.song}>
              No Results Found
            </ListItemButton>
          )}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

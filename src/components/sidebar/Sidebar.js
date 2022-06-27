import React, { useContext } from "react";
import classes from "./Sidebar.module.css";
import searchIcon from "../../assets/images/searchIcon.svg";
import { List, ListItemButton, Stack, Skeleton } from "@mui/material";
import { useQuery } from "@apollo/client";
import { LOAD_SONGS } from "../../GraphQL/queries";
import GlobalContext from "../../GlobalContext";

const Sidebar = () => {
  const songs = useQuery(LOAD_SONGS, {
    variables: {
      playlistId: 1,
    },
  });
  const { songsList, currentPlaylist, setCurrentSong } =
    useContext(GlobalContext);

  const secondsToMinute = (s) =>
    (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  const playSong = (item) => {
    setCurrentSong(item);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>{currentPlaylist}</div>
        <div className={classes.searchbar_container}>
          <input
            placeholder="Search Songs, Artists"
            className={classes.searchbar}
          />
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>

      <div className={classes.songs}>
        {/* {songs.loading && (
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
        )} */}
        <List>
          {songsList?.map((item) => (
            <ListItemButton
              onClick={() => playSong(item)}
              className={classes.song}
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
          ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

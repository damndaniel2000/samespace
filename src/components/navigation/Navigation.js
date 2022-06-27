import React, { useState, useContext, useEffect, useCallback } from "react";
import classes from "./Navigation.module.css";
import logo from "../../assets/images/logo.svg";
import { LOAD_PLAYLISTS, LOAD_SONGS } from "../../GraphQL/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Skeleton,
} from "@mui/material";
import profileAvatar from "../../assets/images/profileAvatar.svg";
import GlobalContext from "../../GlobalContext";

const Navigation = () => {
  const { setCurrentPlaylist, currentPlaylist, setSongsList } =
    useContext(GlobalContext);
  const [playlistIndex, setPlaylistIndex] = useState(1);

  //playlists taken from API instead of hardcoding incase of more playlists being added
  const playlists = useQuery(LOAD_PLAYLISTS);
  const [getSongs, songs] = useLazyQuery(LOAD_SONGS, {
    variables: {
      playlistId: playlistIndex,
      search: null,
    },
  });

  const handleClick = useCallback(
    (index, title) => {
      setPlaylistIndex(index);
      setCurrentPlaylist(title);
      getSongs().then((res) => setSongsList(res.data.getSongs));
    },
    [getSongs, setCurrentPlaylist, setSongsList]
  );

  useEffect(() => {
    handleClick(1, "For You");
  }, [handleClick, setCurrentPlaylist]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={logo} alt="logo" />
        <div className={classes.navigation}>
          {playlists.loading && (
            <Stack>
              {[0, 1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  sx={{ bgcolor: "grey.900", height: 50 }}
                  animation="wave"
                  variant="text"
                />
              ))}
            </Stack>
          )}
          <List component="nav">
            {playlists.data?.getPlaylists?.map((item) => (
              <ListItemButton
                onClick={() => handleClick(item.id, item.title)}
                className={
                  item.title === currentPlaylist
                    ? classes.selected
                    : classes.not_selected
                }
                key={item.id}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
      <div style={{ marginBottom: "4rem" }}>
        <img src={profileAvatar} alt="profile avatar" />
      </div>
    </div>
  );
};

export default Navigation;

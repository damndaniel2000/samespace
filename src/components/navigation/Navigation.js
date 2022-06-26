import React, { useState } from "react";
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

const Navigation = () => {
  const [playlistIndex, setPlaylistIndex] = useState(1);

  //playlists taken from API instead of hardcoding incase of more playlists being added
  const playlists = useQuery(LOAD_PLAYLISTS);
  const [getSongs, songs] = useLazyQuery(LOAD_SONGS, {
    variables: {
      playlistId: playlistIndex,
      search: null,
    },
  });

  const handleClick = (index) => {
    setPlaylistIndex(index);
    getSongs().then((res) => console.log(res.data.getSongs));
  };

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
                onClick={() => handleClick(item.id)}
                className={
                  item.id === playlistIndex
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
    </div>
  );
};

export default Navigation;

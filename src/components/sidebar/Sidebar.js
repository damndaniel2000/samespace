import React, { useEffect } from "react";
import classes from "./Sidebar.module.css";
import searchIcon from "../../assets/images/searchIcon.svg";
import { List, ListItemButton, Stack, Skeleton } from "@mui/material";
import { useQuery } from "@apollo/client";
import { LOAD_SONGS } from "../../GraphQL/queries";

const Sidebar = () => {
  const songs = useQuery(LOAD_SONGS, {
    variables: {
      playlistId: 1,
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>For You</div>
        <div className={classes.searchbar_container}>
          <input
            placeholder="Search Songs, Artists"
            className={classes.searchbar}
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
          {songs?.data?.getSongs.map((item) => (
            <ListItemButton className={classes.song} key={item._id}>
              <div className={classes.song_left_container}>
                <img
                  className={classes.icon}
                  src={item.photo}
                  alt="song avatar"
                />
                <div>
                  <div className={classes.song_title}>{item.title}</div>
                  <div className={classes.artist}>{item.artist}</div>{" "}
                </div>
              </div>
              <div className={classes.duration}>{item.duration}</div>
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

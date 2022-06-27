import React, { useEffect, useRef, useState, useContext } from "react";
import classes from "./Player.module.css";
import dummy from "../../assets/images/dummy.png";
import { Slider, IconButton } from "@mui/material";
import menuIcon from "../../assets/images/menuIcon.svg";
import volumeIcon from "../../assets/images/volumeIcon.svg";
import prevIcon from "../../assets/images/prevIcon.svg";
import nextIcon from "../../assets/images/nextIcon.svg";
import playIcon from "../../assets/images/playIcon.svg";
import useSound from "use-sound";
import { ColorExtractor } from "react-color-extractor";
import GlobalContext from "../../GlobalContext";

const Player = () => {
  const { currentSong } = useContext(GlobalContext);
  const [progress, setProgress] = useState(0);

  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, data] = useSound(
    "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3"
  );

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const setGradient = (e) => {
    document.getElementById(
      "root"
    ).style.background = `linear-gradient(108.18deg, ${e.pop()} 2.46%, #000000 99.84%)`;
  };

  const handlePlay = () => {
    if (isPlaying) data.pause();
    else play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <div className={classes.header}>
          <div className={classes.song}>{currentSong?.title}</div>
          <div className={classes.artist}>{currentSong?.artist}</div>
        </div>
        <div>
          <ColorExtractor getColors={setGradient}>
            <img
              className={classes.cover}
              src={currentSong?.photo}
              alt="cover"
            />
          </ColorExtractor>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => setPosition(value)}
            sx={{
              color: "#fff",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)'
                }`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
        </div>
        <div className={classes.footer}>
          <IconButton>
            <img src={menuIcon} alt="menu" />
          </IconButton>
          <div className={classes.player_controls}>
            <IconButton>
              <img src={prevIcon} alt="Previous" />
            </IconButton>
            <IconButton>
              <img src={playIcon} alt="Play" onClick={handlePlay} />
            </IconButton>
            <IconButton>
              <img src={nextIcon} alt="Next" />
            </IconButton>
          </div>
          <IconButton>
            <img src={volumeIcon} alt="volume button" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Player;

import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import classes from "./Player.module.css";
import { Slider, IconButton, LinearProgress } from "@mui/material";
import menuIcon from "../../assets/images/menuIcon.svg";
import volumeIcon from "../../assets/images/volumeIcon.svg";
import prevIcon from "../../assets/images/prevIcon.svg";
import nextIcon from "../../assets/images/nextIcon.svg";
import playIcon from "../../assets/images/playIcon.svg";
import pauseIcon from "../../assets/images/pauseIcon.svg";
import headphonesIcon from "../../assets/images/headphones.png";
import { ColorExtractor } from "react-color-extractor";
import GlobalContext from "../../GlobalContext";

const Player = () => {
  const { currentSong, setCurrentSong, songsList } = useContext(GlobalContext);

  const [position, setPosition] = useState(32);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSong, setLastSong] = useState();
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

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
  const handlePlay = useCallback(() => {
    if (lastSong !== currentSong?.title) {
      audioRef.current.load();
      audioRef.current.play();
      setLastSong(currentSong?.title);
      setIsPlaying(true);
      return;
    }
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying, lastSong, currentSong]);

  const nextSong = () => {
    if (currentSong) {
      const index =
        currentSong.songIndex === songsList.length - 1
          ? 0
          : currentSong.songIndex + 1;
      const data = { ...songsList[index] };
      data.songIndex = index;
      console.log(data, currentSong.index);
      setCurrentSong(data);
    }
  };
  const prevSong = () => {
    if (currentSong) {
      const index =
        currentSong.songIndex === 0
          ? songsList.length - 1
          : currentSong.songIndex - 1;
      const data = { ...songsList[index] };
      data.songIndex = index;
      setCurrentSong(data);
    }
  };

  useEffect(() => {
    if (currentSong) {
      handlePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const timer = setInterval(() => {
        setProgress(audioRef.current.currentTime);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [currentSong, isPlaying]);

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        {currentSong ? (
          <>
            <audio ref={audioRef} preload="auto" src={currentSong?.url} />
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
                value={progress || null}
                min={0}
                step={1}
                max={audioRef.current?.duration || null}
                onChange={(_, value) => {
                  audioRef.current.currentTime = value;
                }}
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
                <IconButton onClick={prevSong}>
                  <img src={prevIcon} alt="Previous" />
                </IconButton>
                <IconButton onClick={handlePlay}>
                  <img
                    src={isPlaying ? pauseIcon : playIcon}
                    alt="Play/Pause"
                  />
                </IconButton>
                <IconButton onClick={nextSong}>
                  <img src={nextIcon} alt="Next" />
                </IconButton>
              </div>
              <IconButton>
                <img src={volumeIcon} alt="volume button" />
              </IconButton>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              style={{ width: 100, height: 100 }}
              src={headphonesIcon}
              alt="headphones"
            />
            <h3>Select a song to start playing music...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;

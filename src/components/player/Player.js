import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import classes from "./Player.module.css";
import {
  Slider,
  IconButton,
  useMediaQuery,
  Slide,
  Box,
  Popper,
  Tooltip,
  Stack,
  ClickAwayListener,
} from "@mui/material";
import menuIcon from "../../assets/images/menuIcon.svg";
import volumeIcon from "../../assets/images/volumeIcon.svg";
import prevIcon from "../../assets/images/prevIcon.svg";
import nextIcon from "../../assets/images/nextIcon.svg";
import playIcon from "../../assets/images/playIcon.svg";
import pauseIcon from "../../assets/images/pauseIcon.svg";
import headphonesIcon from "../../assets/images/headphones.png";
import fullScreenIcon from "../../assets/images/fullScreenIcon.svg";
import closeIcon from "../../assets/images/closeIcon.svg";
import { ColorExtractor } from "react-color-extractor";
import GlobalContext from "../../GlobalContext";

const MainPlayer = (props) => {
  const { currentSong } = useContext(GlobalContext);
  const [showVolume, setShowVolume] = useState(false);

  return (
    <>
      {props.fullScreen && (
        <div className={classes.close}>
          <IconButton
            onClick={() => props.setFullScreen(false)}
            title="Exit Full Screen"
          >
            <img style={{ width: 20 }} src={closeIcon} alt="Close Icon" />
          </IconButton>
        </div>
      )}
      <div className={classes.sub_container}>
        {currentSong ? (
          <>
            <div className={classes.header}>
              <div className={classes.song}>{currentSong?.title}</div>
              <div className={classes.artist}>{currentSong?.artist}</div>
            </div>
            <div>
              <ColorExtractor getColors={props.setGradient}>
                <img
                  className={classes.cover}
                  src={currentSong?.photo}
                  alt="cover"
                />
              </ColorExtractor>
              <Slider
                aria-label="time-indicator"
                size="small"
                value={props.progress || null}
                min={0}
                step={1}
                max={props.audioRef.current?.duration || null}
                onChange={(_, value) => {
                  props.audioRef.current.currentTime = value;
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
              <IconButton title="More Options">
                <img src={menuIcon} alt="menu" />
              </IconButton>
              <div className={classes.player_controls}>
                <IconButton title="Previous Song" onClick={props.prevSong}>
                  <img src={prevIcon} alt="Previous" />
                </IconButton>
                <IconButton title="Pause/Play" onClick={props.handlePlay}>
                  <img
                    src={props.isPlaying ? pauseIcon : playIcon}
                    alt="Play/Pause"
                  />
                </IconButton>
                <IconButton title="Next Song" onClick={props.nextSong}>
                  <img src={nextIcon} alt="Next" />
                </IconButton>
              </div>
              <ClickAwayListener onClickAway={() => setShowVolume(false)}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setShowVolume(false)}
                  open={showVolume}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <div
                      style={{
                        width: 200,
                        padding: "0 5px",
                      }}
                    >
                      <Slider
                        sx={{ color: "#fff" }}
                        size="small"
                        aria-label="Volume"
                        value={props.volume}
                        onChange={(e, val) => {
                          props.setVolume(val);
                          props.audioRef.current.volume = val;
                        }}
                        step={0.001}
                        min={0}
                        max={1}
                      />
                    </div>
                  }
                >
                  <IconButton onClick={() => setShowVolume(true)}>
                    <img src={volumeIcon} alt="volume button" />
                  </IconButton>
                </Tooltip>
              </ClickAwayListener>
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
    </>
  );
};

const Player = () => {
  const { currentSong, setCurrentSong, songsList } = useContext(GlobalContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSong, setLastSong] = useState();
  const [progress, setProgress] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const matches = useMediaQuery("(max-width:1100px)");

  const audioRef = useRef(null);

  const setGradient = (e) => {
    const gradientColor = e.pop();
    document.getElementById(
      "root"
    ).style.background = `linear-gradient(108.18deg, ${gradientColor} 2.46%, #000000 99.84%)`;
    document.getElementById(
      "fullscreen"
    ).style.background = `linear-gradient(320deg, ${gradientColor} 9%, rgba(0,0,0,1) 73%)`;
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
    <>
      <audio
        onEnded={nextSong}
        ref={audioRef}
        preload="auto"
        src={currentSong?.url}
      />
      <div className={classes.container}>
        {!matches && (
          <MainPlayer
            nextSong={nextSong}
            prevSong={prevSong}
            isPlaying={isPlaying}
            handlePlay={handlePlay}
            audioRef={audioRef}
            progress={progress}
            volume={volume}
            setVolume={setVolume}
            setGradient={setGradient}
          />
        )}
      </div>
      <Slide
        direction="up"
        in={matches && currentSong}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.minimized_player_container}>
          <div className={classes.minimized_player}>
            <div className={classes.minimized_player_left_section}>
              <img
                className={classes.minimized_player_cover}
                src={currentSong?.photo}
                alt="cover"
              />
              <div className={classes.minimized_player_headers}>
                <div className={classes.minimized_player_song}>
                  {currentSong?.title}
                </div>
                <div className={classes.minimized_player_artist}> </div>
                {currentSong?.artist}
              </div>
            </div>
            <div className={classes.footer}>
              <div className={classes.minimized_player_controls}>
                <IconButton
                  sx={{
                    width: 20,
                  }}
                  title="Previous Song"
                  onClick={prevSong}
                >
                  <img src={prevIcon} alt="Previous" />
                </IconButton>
                <IconButton title="Pause/Play" onClick={handlePlay}>
                  <img
                    src={isPlaying ? pauseIcon : playIcon}
                    alt="Play/Pause"
                  />
                </IconButton>
                <IconButton title="Next Song" onClick={nextSong}>
                  <img src={nextIcon} alt="Next" />
                </IconButton>
                <IconButton
                  onClick={() => setFullScreen(true)}
                  title="Full Screen"
                >
                  <img
                    style={{ width: 30 }}
                    src={fullScreenIcon}
                    alt="Full Screen"
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide direction="up" in={fullScreen} mountOnEnter unmountOnExit>
        <div id="fullscreen" className={classes.fullscreen_container}>
          <MainPlayer
            nextSong={nextSong}
            prevSong={prevSong}
            isPlaying={isPlaying}
            handlePlay={handlePlay}
            audioRef={audioRef}
            progress={progress}
            setGradient={setGradient}
            setFullScreen={setFullScreen}
            volume={volume}
            setVolume={setVolume}
            fullScreen={true}
          />
        </div>
      </Slide>
    </>
  );
};

export default Player;

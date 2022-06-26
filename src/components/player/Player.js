import React, { useEffect, useState } from "react";
import classes from "./Player.module.css";
import dummy from "../../assets/images/dummy.png";
import { LinearProgress } from "@mui/material";

const Player = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <div className={classes.header}>
          <div className={classes.song}>Viva La Vida</div>
          <div className={classes.artist}>Coldplay</div>
        </div>
        <div>
          <img className={classes.cover} src={dummy} alt="cover" />
          <LinearProgress
            sx={{
              backgroundColor: "#393734",
            }}
            color="inherit"
            variant="determinate"
            value={progress}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;

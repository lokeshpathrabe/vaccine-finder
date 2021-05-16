import React, { useState } from "react";
import Paper from "@material-ui/core/paper";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/tooltip";

const useStyles = makeStyles((theme) => ({
  day: {
    height: 80,
    width: 140,
  },
  centerName: {
    backgroundColor: "bisque",
    lineHeight: "1.5em",
    borderRadius: "4px",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const Tile = ({ center }) => {
  const styles = useStyles();
  const [ele, setEle] = useState(1);
  return (
    <Paper
      className={styles.day}
      elevation={ele}
      onMouseEnter={() => setEle(4)}
      onMouseLeave={() => setEle(1)}
    >
      <Tooltip title={center.name}>
        <div className={styles.centerName}>{center.name}</div>
      </Tooltip>

      {center.sessions.map((session) => (
        <div>
          {session.date}: {session.min_age_limit} - {session.available_capacity}
        </div>
      ))}
    </Paper>
  );
};

export default Tile;

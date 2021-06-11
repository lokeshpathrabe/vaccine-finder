import React, { useState } from "react";
import Paper from "@material-ui/core/paper";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/tooltip";
import Badge from "@material-ui/core/badge";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/grid";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  console.log("theme", theme);
  return {
    center: {
      height: 80,
      width: 140,
      overflow: "hidden",
    },
    centerName: {
      backgroundColor: theme.palette.secondary.dark,
      lineHeight: "1.5em",
      borderRadius: "4px",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      padding: "2px",
    },
    badge: {
      padding: "8px",
    },
    slotContainer: {
      padding: "4px",
    },
  };
});

const SlotList = ({ session }) => {
  return (
    <List>
      {session?.slots.map((slot, idx) => (
        <ListItem key={idx} button>
          {slot}
        </ListItem>
      ))}
    </List>
  );
};

const SessionList = ({ center, age }) => {
  return (
    <List>
      {center?.sessions
        .filter((session) => session.min_age_limit === age)
        .map((session, idx) =>
          Boolean(session.available_capacity) ? (
            <ListItem key={`${center.name}-${idx}`} button>
              {`Session ${idx + 1} - `}
              <SlotList session={session} />
            </ListItem>
          ) : (
            <Typography align="center">No sessions to show</Typography>
          )
        )}
    </List>
  );
};

const AvailablilityTag = ({ center, onClick }) => {
  const availabilityByAge = center.sessions.reduce((list, session) => {
    const idx = list.findIndex(
      (tag) => tag.min_age_limit === session.min_age_limit
    );
    if (idx === -1) {
      list.push({
        min_age_limit: session.min_age_limit,
        available_capacity: session.available_capacity,
      });
    } else {
      list[idx].available_capacity += session.available_capacity;
    }
    return list;
  }, []);
  return availabilityByAge.map((age) => (
    <Grid item>
      <Badge badgeContent={age.available_capacity || "0"} color="primary">
        <Chip
          label={`> ${age.min_age_limit}`}
          color="default"
          onClick={(e) => onClick(e, center, age.min_age_limit)}
        />
      </Badge>
    </Grid>
  ));
};

const Tile = ({ center }) => {
  const [anchorEle, setAnchorEle] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [selectedAge, setSelectedAge] = useState();
  const styles = useStyles();
  const [ele, setEle] = useState(1);

  return (
    <Paper
      className={styles.center}
      elevation={ele}
      onMouseEnter={() => setEle(4)}
      onMouseLeave={() => setEle(1)}
    >
      <Tooltip title={center.name}>
        <div className={styles.centerName}>{center.name}</div>
      </Tooltip>
      <Grid container justify="center" className={styles.badge} spacing={2}>
        <AvailablilityTag
          center={center}
          onClick={(e, center, age) => {
            setSelectedCenter(center);
            setSelectedAge(age);
            Boolean(anchorEle)
              ? setAnchorEle(null)
              : setAnchorEle(e.currentTarget);
          }}
        />
        <Popover
          id="mouse-over-popover"
          open={Boolean(anchorEle)}
          anchorEl={anchorEle}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={() => setAnchorEle(null)}
          disableRestoreFocus
        >
          <Grid container justify="center" className={styles.slotContainer}>
            <SessionList center={selectedCenter} age={selectedAge} />
          </Grid>
        </Popover>
      </Grid>
    </Paper>
  );
};

export default Tile;

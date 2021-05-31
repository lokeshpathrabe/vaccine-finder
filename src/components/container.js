import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/typography";
import Header from "./header";
import Tile from "./tile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  day: {
    height: 80,
    width: 140,
  },
  noCenter: {
    padding: "20px",
  },
}));

const CenterList = ({ data }) =>
  data?.map((center, idx) => (
    <Grid key={idx} item spacing={2}>
      <Tile center={center} />
    </Grid>
  ));

const NoCenter = ({ className }) => (
  <Typography className={className} align="center">
    No Centers to show
  </Typography>
);

const Container = ({ data }) => {
  const styles = useStyles();
  return (
    <Paper className={styles.root} elevation={2}>
      <Grid container spacing={6} justify="center">
        {data?.length ? (
          <CenterList data={data} />
        ) : (
          <NoCenter className={styles.noCenter} />
        )}
      </Grid>
    </Paper>
  );
};

export default Container;

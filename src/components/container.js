import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
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
}));

const CenterList = ({ data }) =>
  data?.map((center, idx) => (
    <Grid key={idx} item spacing={2}>
      <Tile center={center} />
    </Grid>
  ));

const NoCenter = () => <div>No Centers to show</div>;

const Container = ({ data }) => {
  const styles = useStyles();
  return (
    <Paper className={styles.root} elevation={2}>
      <Grid container spacing={2}>
        {data?.length ? <CenterList data={data} /> : <NoCenter />}
      </Grid>
    </Paper>
  );
};

export default Container;

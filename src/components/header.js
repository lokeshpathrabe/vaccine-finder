import { withStyles, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { grey } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

const DarkSwitch = withStyles({
  switchBase: {
    color: grey[100],
    "&$checked": {
      color: grey[600],
    },
    "&$checked + $track": {
      backgroundColor: grey[600],
    },
  },
})(Switch);

const HeaderContainer = withStyles((theme) => ({
  root: {
    padding: "0 48px 0 48px",
    backgroundColor: theme.palette.background.paper,
  },
}))(Grid);

const useStyles = makeStyles({
  title: {
    fontWeight: 600,
  },
});

const Header = ({ theme, setTheme }) => {
  const styles = useStyles();
  return (
    <HeaderContainer container>
      <Grid container xs={8} justify="flex-start">
        <LocalHospitalIcon fontSize="large" />
        <Typography variant="h5" className={styles.title}>
          Vaccine Finder
        </Typography>
      </Grid>
      <Grid container xs={4} justify="flex-end">
        <DarkSwitch
          name="theme"
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
          }}
          checked={theme === "dark"}
          color="#303030"
        />
      </Grid>
    </HeaderContainer>
  );
};

export default Header;

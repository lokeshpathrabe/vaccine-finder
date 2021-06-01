import { withStyles, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { grey } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import GitHubIcon from "@material-ui/icons/GitHub";
import Brightness3TwoToneIcon from "@material-ui/icons/Brightness3TwoTone";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";

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

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  titleIcon: {
    color: theme.palette.text.primary,
  },
  github: {
    marginLeft: "24px",
    padding: "2px",
    color: theme.palette.text.primary,
  },
}));

const Header = ({ theme, setTheme }) => {
  const styles = useStyles();
  return (
    <HeaderContainer container>
      <Grid container xs={8} justify="flex-start">
        <LocalHospitalIcon className={styles.titleIcon} fontSize="large" />
        <Typography variant="h5" className={styles.title}>
          Vaccine Finder
        </Typography>
        <a href="https://github.com/lokeshpathrabe/vaccine-finder">
          <GitHubIcon className={styles.github} />
        </a>
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
        {theme === "dark" ? (
          <Brightness3TwoToneIcon
            style={{ color: grey[500], alignSelf: "center" }}
          />
        ) : (
          <WbSunnyTwoToneIcon style={{ color: grey[0], alignSelf: "center" }} />
        )}
      </Grid>
    </HeaderContainer>
  );
};

export default Header;

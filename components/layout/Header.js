import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography, Toolbar } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      backgroundColor: "#333333",
    },
  })
);

const HeaderBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.appBar}>
      <Toolbar />
    </div>
  );
};

export default HeaderBar;

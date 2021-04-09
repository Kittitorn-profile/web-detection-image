import React from "react";
import Webcam from "react-webcam";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box, Button, Icon } from "@material-ui/core";

const videoConstraints = {
  minWidth: 400,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = (props) => {
  const { onClick, value, onClose } = props;
  const classes = useStyles();
  const webcamRef = React.useRef(null);

  const handleOnCLick = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onClick(imageSrc);
  };

  return (
    <div className={classes.container}>
      {value ? (
        <Box>
          <img
            src={value ? value : "../../camera-line.svg"}
            height={value ? "100%" : 100}
            width={value ? "100%" : 100}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        </Box>
      ) : (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={"100%"}
          videoConstraints={videoConstraints}
        />
      )}

      <Box marginY={1} className={classes.btn}>
        {value ? (
          <Box onClick={onClose}>
            <img
              className={classes.iconClose}
              src={"../../close-circle-fill.svg"}
              height={30}
              width={30}
            />
          </Box>
        ) : (
          <Button variant="contained" color="primary" onClick={handleOnCLick}>
            Capture photo
          </Button>
        )}
      </Box>
    </div>
  );
};

export default WebcamCapture;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      backgroundColor: "#E1E1E1",
      borderRadius: 6,
      height: 400,
    },
    btn: {
      position: "absolute",
      margin: 8,
    },
    iconClose: {
      height: 40,
      width: 40,
      position: "absolute",
      backgroundColor: "#ffffff",
      cursor: "pointer",
      borderRadius: 30,
      margin: 8,
      zIndex: 99,
    },
  })
);

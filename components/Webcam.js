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
  const { onClick, value, onClose, dataPoint } = props;
  const classes = useStyles();
  const webcamRef = React.useRef(null);
  const [point, setPoint] = React.useState();
  const [imgWidth, setWidth] = React.useState();
  const [imgHeight, setHeight] = React.useState();

  const handleOnCLick = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onClick(imageSrc);
  };

  const renderColor = (i) => {
    if (i === "human") {
      return "#F10505 ";
    } else if (i === "accessory") {
      return "#FB9501";
    } else if (i === "animal") {
      return "#0000DF";
    } else if (i === "food") {
      return "#29DF00";
    } else if (i === "kitchenware") {
      return "#7B05F1 ";
    } else if (i === "furniture") {
      return "#E6F105";
    } else if (i === "electronic") {
      return "#DF00AD";
    } else if (i === "sport") {
      return "#00DFC4";
    } else {
      return "#333333";
    }
  };

  const handleOverlay = (i) => {
    let cx = document.querySelector("canvas").getContext("2d");
    cx.strokeStyle = renderColor(i.parent);
    cx.lineWidth = 4;
    cx.strokeRect(
      i.bounding_box.left,
      i.bounding_box.top,
      i.bounding_box.right,
      i.bounding_box.bottom
    );
  };

  const fill_canvas = (img, width, height) => {
    if (img) {
      setWidth(width);
      setHeight(height);
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    }
  };

  React.useEffect(() => {
    if (value) {
      const img = new Image();
      img.onload = function () {
        fill_canvas(img, this.width, this.height);
      };
      img.src = value;
    }
  }, [value]);

  React.useEffect(() => {
    if (dataPoint) {
      setPoint(dataPoint.detected_objects);
    } else {
      setPoint();
    }
  }, [dataPoint]);

  return (
    <div className={classes.container}>
      {value ? (
        <Box display="flex" flexDirection="column">
          <canvas
            id="canvas"
            width={imgWidth}
            height={imgHeight}
            style={{ objectFit: "cover" }}
          />
          {point && point.map((i) => handleOverlay(i))}
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
      minHeight: 400,
      objectFit: "contain",
    },
    btn: {
      position: "absolute",
      margin: 8,
    },
    iconClose: {
      height: 40,
      width: 40,
      backgroundColor: "#ffffff",
      cursor: "pointer",
      borderRadius: 30,
      margin: 8,
    },
    overlayBox: {
      height: 60,
      width: 60,
      position: "absolute",
      border: `2px solid red`,
    },
  })
);

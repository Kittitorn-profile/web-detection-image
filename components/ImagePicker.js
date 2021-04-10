import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Box, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const ImagePicker = (props) => {
  const { onClick, value, onClose, dataPoint } = props;
  const classes = useStyles();
  const uploadRef = React.useRef(null);
  const [fileSizeErrorText, setFileSizeErrorText] = React.useState("");
  const [point, setPoint] = React.useState();
  const [imgWidth, setWidth] = React.useState();
  const [imgHeight, setHeight] = React.useState();

  const handleClick = () => {
    uploadRef.current.click();
  };

  const handleChange = (e) => {
    var fileUploaded = e.target.files[0];
    if (fileUploaded) {
      if (fileUploaded.size > 1000000) {
        setFileSizeErrorText(`The file size is more than 1MB.`);
      } else {
        var reader = new FileReader();
        reader.onloadend = () => {
          onClick(reader.result);
        };
        reader.readAsDataURL(fileUploaded);
        setFileSizeErrorText();
      }
    } else {
      var fileUploaded = undefined;
    }
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
      return "#FFFFFF";
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
    setWidth(width);
    setHeight(height);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };

  React.useEffect(() => {
    const img = new Image();
    img.onload = function () {
      fill_canvas(img, this.width, this.height);
    };
    img.src = value ? value : "../../camera-line.svg";
  }, [value]);

  React.useEffect(() => {
    if (dataPoint) {
      setPoint(dataPoint.detected_objects);
    } else {
      setPoint();
    }
  }, [dataPoint]);

  return (
    <Box>
      {value && (
        <Box onClick={onClose}>
          <img
            className={classes.iconClose}
            src={"../../close-circle-fill.svg"}
            height={30}
            width={30}
          />
        </Box>
      )}
      <Button
        className={classes.container}
        onClick={() => !value && handleClick()}
      >
        <Box display="flex" flexDirection="column">
          <canvas id="canvas" width={imgWidth} height={imgHeight} />
          {point && point.map((i) => handleOverlay(i))}
          {!value && <Typography variant="caption">Choose files</Typography>}
        </Box>
        <input
          type="file"
          onChange={(file) => handleChange(file)}
          ref={uploadRef}
          accept=".png, .jpg, .jpeg"
          style={{ display: "none" }}
        />
      </Button>
      {fileSizeErrorText && <Alert severity="error">{fileSizeErrorText}</Alert>}
    </Box>
  );
};

export default ImagePicker;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#E1E1E1",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      minHeight: 400,
      width: "100%",
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
    overlayBox: {
      position: "absolute",
      border: `2px solid red`,
    },
  })
);

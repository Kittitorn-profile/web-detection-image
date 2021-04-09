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

  const handleClick = () => {
    uploadRef.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    if (fileUploaded && fileUploaded.size > 1000000) {
      setFileSizeErrorText(`The file size is more than 1MB.`);
    } else {
      var reader = new FileReader();
      reader.onloadend = () => {
        onClick(reader.result);
      };
      reader.readAsDataURL(fileUploaded);
      setFileSizeErrorText();
    }
  };

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
      <Button className={classes.container} onClick={() => handleClick()}>
        <Box display="flex" flexDirection="column">
          <img
            src={value ? value : "../../camera-line.svg"}
            height={value ? "100%" : 100}
            width={value ? "100%" : 100}
            style={{ objectFit: "cover" }}
          />
          {point &&
            point.map((i) => (
              <Box
                top={i.bounding_box.top}
                left={i.bounding_box.left}
                className={classes.overlayBox}
              />
            ))}

          {!value && <Typography variant="caption">Choose files</Typography>}
        </Box>
        <input
          type="file"
          onChange={(e) => handleChange(e)}
          ref={uploadRef}
          accept="image/*"
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
      height: 400,
      width: "100%",
      objectFit: "contain",
      overflow: "hidden",
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
      height: 60,
      width: 60,
      position: "absolute",
      border: `2px solid red`,
    },
  })
);

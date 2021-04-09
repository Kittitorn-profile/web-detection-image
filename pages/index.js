import React from "react";
import {
  Grid,
  Typography,
  Card,
  Button,
  Box,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { Webcam, ImagePicker } from "../components";
import axios from "axios";

const index = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [dataImg, setData] = React.useState();
  const [dataItemList, setDataItemList] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleData = async (value) => {
    setSelectedFile(value);
    setLoading(true);
    if (value) {
      var imgBase64 = value.replace(/^data:image\/[a-z]+;base64,/, "");
      try {
        const upload = {
          method: "POST",
          baseURL: `https://nvision.nipa.cloud/api/v1/object-detection`,
          headers: {
            Authorization: `ApiKey cdb29f355cb4059995e054208f8cc73c327e9bbc3a0c290e7d88c58022f3e4f8a6c491cf8411c1b1291068c25c15042aac`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            raw_data: imgBase64,
          },
        };
        const result = await axios(upload);

        const arraylist = [];
        result.data &&
          result.data.detected_objects.forEach((element) =>
            arraylist.push(element.parent)
          );
        const list = [...new Set(arraylist)];
        setDataItemList(list);
        setData(result.data);
        setLoading(false);
      } catch (e) {
        setError("Can not be Detection");
        setLoading(false);
      }
    }
  };

  const handleClear = async (value) => {
    setSelectedFile(null);
    setDataItemList();
    setData();
    setError();
  };

  React.useEffect(() => {
    handleClear();
  }, [isOpen]);

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4">
            Detection
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display={"flex"} alignItems={"center"} flexDirection={"row"}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(false)}
                disabled={!isOpen}
              >
                <Typography variant="caption">Browse file</Typography>
              </Button>
            </Box>
            <Box marginLeft={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(true)}
                disabled={isOpen}
              >
                <Typography variant="caption">webcam</Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Analyzed Results</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              {isOpen ? (
                <Webcam
                  value={selectedFile}
                  onClick={(e) => handleData(e)}
                  onClose={() => handleClear()}
                  dataPoint={dataImg}
                />
              ) : (
                <ImagePicker
                  value={selectedFile}
                  onClick={(e) => handleData(e)}
                  onClose={() => handleClear()}
                  dataPoint={dataImg}
                />
              )}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              {isLoading ? (
                <Box className={classes.cardCenter}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {error ? (
                    <Box className={classes.cardCenter}>
                      <img src={"../../cry.svg"} height={200} width={200} />
                      <Box marginTop={1}>
                        <Alert severity="error">{error}</Alert>
                      </Box>
                    </Box>
                  ) : (
                    <Box display="flex" flexDirection="column">
                      <Box display="flex" flexDirection="row">
                        {dataItemList &&
                          dataItemList.length > 0 &&
                          dataItemList.map((item) => (
                            <Box
                              display="flex"
                              flexDirection="column"
                              marginRight={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                src={
                                  item
                                    ? `../../${item}.svg`
                                    : "../../user-3-fill.svg"
                                }
                                height={30}
                                width={30}
                              />
                              <Typography variant="caption">{item}</Typography>
                            </Box>
                          ))}
                      </Box>
                      <Box className={classes.cardRight} marginTop={3}>
                        {dataImg &&
                          dataImg.detected_objects.length > 0 &&
                          dataImg.detected_objects.map((item) => (
                            <Box>
                              <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                              >
                                <Typography variant="h6">
                                  {item.name}
                                </Typography>
                                <Typography variant="h6">
                                  {item.confidence &&
                                    Math.round(item.confidence * 100) + "%"}
                                </Typography>
                              </Box>
                              <BorderLinearProgress
                                variant="determinate"
                                value={
                                  item.confidence &&
                                  Math.round(item.confidence * 100)
                                }
                              />
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default index;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      height: "100vh",
      padding: 32,
    },
    card: {
      display: "flex",
      flexDirection: "column",
      padding: 32,
      backgroundColor: "#fff",
      height: 400,
      border: `2px solid #E1E1E1`,
      boxShadow: "0 0px 10px 0 rgba(48, 48, 48, 0.2)",
    },
    cardRight: {
      overflowY: "scroll",
      height: 330,
    },
    cardCenter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      height: "100%",
      width: "100%",
    },
    overlayBox: {
      height: 100,
      width: 100,
      border: `2px solid #E1E1E1`,
    },
  })
);

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Dollar from "./components/dollar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppWrapper from "./wrappers/appWrapper";
import Switch from "@material-ui/core/Switch";

let socket;
const ENDPOINT = "localhost:5000";

const useStyles = makeStyles({
  mySwitch: {
    "& .MuiSwitch-track": {
      backgroundColor: "white",
    },
  },
});

function App() {
  const [checked, setchecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket = io.connect(ENDPOINT);

    socket.on("get value", async (data) => {
      await setchecked(data);
      setIsLoading(true);
    });

    socket.on("new value", (data) => setchecked(data));
  }, [ENDPOINT]);

  const classes = useStyles();

  return (
    <AppWrapper>
      {isLoading && (
        <div className="App">
          <div className="switchBx">
            <Switch
              checked={checked}
              onChange={(e) => {
                socket.emit("set toggle", e.target.checked);
                setchecked(e.target.checked);
              }}
              name="checkedB"
              className={classes.mySwitch}
            />
            <span>{checked ? "Tabloyu Gizle" : "Tabloyu Göster"}</span>
          </div>
          <Dollar checked={checked} />
        </div>
      )}
    </AppWrapper>
  );
}

export default App;

/*global chrome*/
import * as React from "react";
import Slider from "@mui/material/Slider";
import { Button, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const type = [
  { no: 1, name: "Upper Case" },
  { no: 2, name: "Lower Case" },
  { no: 3, name: "Numbers" },
  { no: 4, name: "Symbols" },
];
var charsObj = [
  {
    key: 1,
    char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    key: 2,
    char: "abcdefghijklmnopqrstuvwxyz",
  },
  {
    key: 3,
    char: "0123456789",
  },
  {
    key: 4,
    char: "!@#$%^&*()",
  },
];

export default function SelectPassword() {
  const [sliderValue, setSliderValue] = useState(0);
  const [password, setPassword] = useState("");
  const [arr, setArr] = useState([0, 0, 0, 0]);
  const [url, setUrl] = useState("");

  const makeArr = (i) => {
    var arr2 = [...arr];
    arr2[i] = !arr2[i];
    setArr(arr2);
  };

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        setUrl(url);
      });
  }, []);
  // function initPopupWindow() {
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //   if (tab?.url) {
  //     try {
  //       let url = new URL(tab.url);
  //       input.value = url.hostname;
  //     } catch {}
  //   }

  //   input.focus();
  // }
  const passGenerator = ([u, l, n, s]) => {
    var password = "";
    var chars = u ? charsObj[0].char : "";
    chars += l ? charsObj[1].char : "";
    chars += n ? charsObj[2].char : "";
    chars += s ? charsObj[3].char : "";

    for (var i = 0; i < sliderValue; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setPassword(password);

    //   let [tab] = chrome.tabs.query({ active: true, currentWindow: true });

    //   if (tab?.url) {
    //     let url = new URL(tab.url);
    //     setUrl(url.hostname);
    //   }
  };

  useEffect(() => {
    passGenerator(arr);
  }, [sliderValue, arr]);

  return (
    <Card
      sx={{
        width: "800px",
        height: "300px",
        display: "flex",
        p: "2%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          mr: "5%",
        }}
      >
        <TextField
          id="outlined-read-only-input"
          label="Your Password"
          defaultValue=""
          value={password}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            mt: "5%",
            mb: "5%",
            width: "100%",
          }}
        />
        <TextField
          required
          value={sliderValue}
          onChange={(i) => setSliderValue(i.target.value)}
          sx={{
            width: "20%",
          }}
        />
        <Slider
          value={sliderValue}
          defaultValue={sliderValue}
          onChange={(i) => setSliderValue(i.target.value)}
          aria-label="Default"
          valueLabelDisplay="auto"
        />

        <Button
          variant="contained"
          onClick={() => alert(`Password for ${url} is ${password}`)}
        >
          Save
        </Button>
      </Box>
      <Box
        sx={{
          diplay: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
        }}
      >
        {type.map((item) => (
          <Box key={item.name}>
            <Checkbox
              {...label}
              value={item.no}
              onChange={(i) => makeArr(i.target.value - 1)}
            />
            {item.name}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

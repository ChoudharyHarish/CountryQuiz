import React, { useState } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import Capital from "./Capital"
import Flag from "./Flag"


function App() {

  //Changin isCapital and isFlag here to render components conditionally in our Menu.js
  let [isCapital, setCapital] = useState(false)
  let [isFlag, setFlag] = useState(false)
  function handleChangeState(id) {
    if (id == "1") {
      setCapital(!isCapital);
    }
    else {
      setFlag(!isFlag)
    }
  }

  return (
    <>
      <Menu isCapital={isCapital} isFlag={isFlag} changeState={handleChangeState} />
      <Footer />
    </>
  );
}

export default App;

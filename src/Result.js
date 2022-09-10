import React from "react";
import FlagIMG from "./images/winner.svg"

function handleClick(){
    window.location.reload(true);
}


function Result(props){
    return (
      
        <div className="modal" style={{alignItems:"center",paddingBottom:"1rem"}}>
        <img src={FlagIMG} className = "winner img-resp" alt="" />
        <h2 className="h-result h-primary">Results</h2>
        <p className="result">You got {props.count} correct answers</p>
        <button onClick={handleClick}>Try Again</button>
    </div>
    )
}

export default Result;
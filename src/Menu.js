import React, { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import Capital from "./Capital";
import Flag from "./Flag";
import globe from "./images/logo.svg"



function Menu(props) {

    function capitalQuiz(event){
        let id = event.target.id;
        props.changeState(id);
    }       

    function flagQuiz(event) {
        let id = event.target.id;
        props.changeState(id);
    }
    return (
        <div className="container">
            <h1>Country Quiz</h1>
            <div className="modal">
                {!props.isCapital && !props.isFlag && <img className="img-resp" src={globe} alt="" />}
                {!props.isCapital && !props.isFlag && <h2>Select game mode</h2>}
                {!props.isCapital && !props.isFlag ?
                    <ul>
                        <li id="1" onClick={capitalQuiz} >City is the capital of?</li>
                        <li id="2" onClick={flagQuiz} >Flag belong to which country?</li>
                    </ul> : props.isCapital ?
                        <Capital/> : <Flag />

                }
            </div>
        </div>
    )
}

export default Menu;
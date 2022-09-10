import React, { useState,useEffect } from "react";
import globe from "./images/logo.svg"
import Result from "./Result";
import { CircularProgress } from "@mui/material";



const myStyle = {
    backgroundColor : "green"
}

const spinnerStyle = {
        textAlign : "center",
        margin: "auto"
}

function setColor(id,color,isCorrectAnswer){
  if(isCorrectAnswer === true){
      let element = document.getElementById(id);
            element.style.backgroundColor =  color;
            element.style.transition =  "all 0.7s ease";
            element.style.borderColor =  color;
            element.style.color=  "white";
  }
  else{
    let element = document.getElementById(id);
            element.style.backgroundColor =  color;
            element.style.transition =  "all 0.4s ease-in-out";
            element.style.borderColor =  color;
            element.style.color=  "white";
  }
}

function setNewColor(id,isNewQustion){
  if(isNewQustion === false){
      let element = document.getElementById(id);
            element.style.backgroundColor =  "white";
            element.style.transition =  "all 0.7s ease";
            element.style.borderColor =  "rgba(96, 102, 208, 0.8)";
            element.style.color=  "rgba(96, 102, 208, 0.8)";
  }
}

function randomGenerator(n){
    let randomNum = (Math.floor(Math.random()* n) + 1)
    return randomNum;
}



function Capital(props){

  const [error, setError] = useState(null);
  let [isLoaded, setIsLoaded] = useState(false);
  const [questionArr, setQustionArr] = useState([]);
  const [question,setQustion] = useState({})
  const [options,setoptions] = useState([])
  const [isCorrectAnswer,setAnswer]  = useState(null)
  let [count,setCount]  = useState(0);
  

  
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQustionArr(result)  //Saving All the data 
          let num  = randomGenerator(250)   //Generating Randomn Number to get Question from arr
          let randomPos = randomGenerator(3)  //Generating Random Position index for answer
          let opt = []                        //Defining options 
          for(let i = 0; i <= 3; i++){
            opt.push(result[randomGenerator(250)].name)   // Making Random Options
          }
          opt[randomPos] = result[num].name;              //Making one random options as correct answer
          setoptions(opt)                                 //Updating state of options []
          setQustion({country : result[num].name , capital :result[num].capital}) //Updating state of question{}
        //   console.log(result[num])
        //   console.log(result[num].name)
        //   console.log(result[num].capital)
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  },[])    //Agar [] second parameter nhi denge den fetch krte rhega


  function generaterRandomQuestion(id,isCorrectAnswer){

    // setNewQuestion(true)
    // console.log(isNewQustion)
    // setNewColor(id,isNewQustion)

    let num  = randomGenerator(250)   
    let randomPos = randomGenerator(3)  
    let opt = []                      
    for(let i = 0; i <= 3; i++){
      opt.push(questionArr[randomGenerator(250)].name)
    }
    opt[randomPos] = questionArr[num].name;         
    setoptions(opt)                                
    setQustion({country : questionArr[num].name , capital :questionArr[num].capital})
    setNewColor(id,false)
  }


  function handleClick(event){
            // console.log(event.target.innerHTML)
            let selectedAnswer = event.target.innerHTML
            if(selectedAnswer === question.country){
                setAnswer(true); 
                setCount(count + 1);
                setColor(event.target.id,"green",true)
                setTimeout(() => {
                  generaterRandomQuestion(event.target.id,true)
                },1500);  
            }
            else{
              // console.log(event.target)
              // setAnswer(false);
                // console.log(count)
              // setColor(event.target.id,"red")
              setAnswer(false)
              setColor(event.target.id,"red",false);
              // setColor(question.country,"green",true);
            }
  }
   
    return (
      isLoaded ? isCorrectAnswer  === false ?
      <Result count = {count}/>
      :
     <div>
     <img className="img-resp globe" src={globe} alt=""/>
                 <h2 className="h-primary h-capital">{question.capital} is capital of ?</h2>
                 <ul>
                     {options.map((currItem,index) => <li key={index} id = {index} onClick={handleClick}>{options[index]}</li>)}    
                 </ul>
  </div>:
   <>
   <h2 className="h-loading">Capital Quiz Qustion is loading...</h2>
   <CircularProgress style = {spinnerStyle}/>
   </>
      )
}

export default Capital
export {randomGenerator}
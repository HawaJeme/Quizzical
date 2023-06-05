import  Interface  from '../components/Interface.jsx'
import  Questions  from '../components/Questions.jsx'
import  React, { useState } from "react"
import {decode} from 'html-entities';


function App() {
  const [questionObjs, setQuestionObjs] = useState([])
  const [gameStart, setgameStart] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [correctAns, setCorrectAns] = useState([])
  const highlights = document.getElementsByClassName("checkedHighlight")
  const allAnswers = document.getElementsByClassName("answer")
  let scores = 0


  async function fetchQuestions(){
    setIsLoading(true)
    const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    const data = await res.json()
    const results = data.results
    setQuestionObjs(decode(results))

    // making correct answers array
    const correctAnsArr = []
    for(let i=0; i < results.length; i++){
      const obj = results[i]
      correctAnsArr.push(decode(obj.correct_answer))
    }
    
    // setting correct ansArr state
    setCorrectAns(correctAnsArr)
    setIsLoading(false)
  }

  function startGame(){
    fetchQuestions()
    if(questionObjs){
      setgameStart(true)
    }
  }

  // checks correct and wrong answers by comparing selected answers
  // to correctAns array state, and counting correct answers.
  function checkAnswers(){
    let selectedAnsArr = []

    for(let i=0; i < correctAns.length; i++){
      const labels = highlights[i]
      const inputsAns = highlights[i].children[0].value
      selectedAnsArr.push(decode(inputsAns))

      for(let ans of allAnswers){
        const allInputsValues = ans.children[0].value

        if(correctAns[i] === decode(allInputsValues)){
          ans.style.backgroundColor = "#4CB261" // green
          if(selectedAnsArr[i] === correctAns[i]){
            scores++
          }
        } else if(selectedAnsArr[i] !== correctAns[i]){
          labels.style.backgroundColor = "#F88686" //red
        }
      }

    }
  }

  function scoreElement(){
    const scoreDiv =  document.querySelector(".scoreElement")
    scoreDiv.textContent = `You've scored ${scores} / 5 correct answers`
    scoreDiv.style.display = "flex"
    scoreDiv.style.alignItems = "center";
    document.getElementById("checkAns").textContent = "Play again"
  }

  function handleSubmit(e){
    e.stopPropagation()
    e.preventDefault()
    checkAnswers()
    if(document.getElementById("checkAns").textContent === "Play again"){
      setgameStart(false)
      location.reload()
    }
    scoreElement()
  }

  function highlightAns(e){
    const label = e.target.parentElement
    for (let highlight of highlights){ // For removing highlighted answers of the same question
      if(label.id === highlight.id){
        highlight.classList.remove("checkedHighlight")
      }
    }
    label.classList.add("checkedHighlight") // adding highlight class to checked answers
  }

  const questionElements = questionObjs.map((obj, index) =>{
    return <Questions
      keys={index}
      question={obj.question}
      correctAns={obj.correct_answer}
      incorrectAns={obj.incorrect_answers}
      highlightAns={highlightAns}
    />
  })

  return (
    <>
      {!gameStart &&<Interface startGame={startGame}/>}

      {isLoading && <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>}

      {gameStart && <form id="quesContainer" onSubmit={handleSubmit}>

        {questionElements}
        {!isLoading &&<div className="scoreDiv">
          <h3 className="scoreElement"></h3>
          <button id="checkAns">Check your answers</button>
        </div>}

      </form>}
    </>
  )
}

export default App

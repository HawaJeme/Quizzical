import  Interface  from '../components/Interface.jsx'
import  Questions  from '../components/Questions.jsx'
import  React, { useState, useEffect } from "react"
import {decode} from 'html-entities';


function App() {
  const [questionObjs, setQuestionObjs] = useState([])
  const [quizStart, setQuizStart] = useState(false)
  const highlights = document.getElementsByClassName("checkedHighlight")
  let correctAns = []
  let scores = 0

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(Response => Response.json())
      .then(data => {
          const results = data.results
          const arr = []
          for(let i=0; i < results.length; i++){
            const obj = results[i]
            arr.push(obj)
          }
          setQuestionObjs(arr)
        })
  }

  useEffect(()=>{
    fetchQuestions()
  }, [])

  useEffect(()=> {
    document.getElementById("start-quiz").addEventListener('click', ()=> {
        document.querySelector(".interface").style.display = "none"
        setQuizStart(true)
    })
  }, [])

  function handleSubmit(e){
    e.stopPropagation()
    e.preventDefault()

    if(document.getElementById("checkAns").textContent === 'Play again'){
      setQuizStart(false)
      location.reload()
    }
    questionObjs.map(obj =>{    // to check correct answers
      correctAns.push(decode(obj.correct_answer))
      for (let ans of document.getElementsByClassName('answer')){
        if(correctAns.includes(decode(ans.children[0].value))){
          ans.style.backgroundColor = "#4CB261" // green
        }
        else if(ans.children[0].value !== decode(obj.correct_answer)
        && ans.classList.contains("checkedHighlight")){
          ans.style.backgroundColor = "#F88686" //red
        }
      }
    })
    calculateScores()
    document.querySelector(".scoreElement").textContent = `You've scored ${scores} / 5 correct answers`
    document.querySelector(".scoreElement").style.display = "inline"
    document.getElementById("checkAns").textContent = 'Play again'
  }

  function highlightAns(e){
    for (let highlight of highlights){ // For removing highlighted answers of the same question
      if(e.target.parentElement.id === highlight.id){
        highlight.classList.remove("checkedHighlight")
      }
    }
    e.target.parentElement.classList.add("checkedHighlight") // adding highlight class to checked answers
  }

  function calculateScores(){
    for(let highlight of highlights){
      if(correctAns.includes(decode(highlight.children[0].value))){
        scores++
      }
    }
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
      <Interface />
      {quizStart && <form id='quesContainer' onSubmit={handleSubmit}>
        {questionElements}
        <div className='scoreDiv'>
          <h3 className='scoreElement'></h3>
          <button id='checkAns'>Check your answers</button>
        </div>
      </form>}
    </>
  )
}

export default App

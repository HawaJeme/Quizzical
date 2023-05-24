import  Interface  from '../components/Interface.jsx'
import  Questions  from '../components/Questions.jsx'
import  React, { useState, useEffect } from "react"
import {decode} from 'html-entities';


function App() {
  const [questionObjs, setQuestionObjs] = useState([])
  const [quizStart, setQuizStart] = useState(false)
  const highlights = document.getElementsByClassName('checkedHighlight')
 
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
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
    let correctAns = []
    let selectedAns = []

    for(let i=0; i < highlights.length; i++){
      selectedAns.push(decode(highlights[i].children[0].value))
    }
    
    // console.log(selectedAns)
    questionObjs.map(obj =>{
      correctAns.push(decode(obj.correct_answer))
      for (let ans of document.getElementsByClassName('answer')){
        if(correctAns.includes(ans.children[0].value)){
          ans.style.backgroundColor = "#4CB261" // green
        }
        else if(ans.children[0].value !== decode(obj.correct_answer) && ans.classList.contains('checkedHighlight') ){
          ans.style.backgroundColor = "#F88686" //red
        }
      }
    })
    // console.log(correctAns)
  }
  function highlightAns(e){
    for (let highlight of highlights){ // For removing highlighted answers of the same question
      if(e.target.parentElement.id === highlight.id){
        highlight.classList.remove('checkedHighlight')
      }
    }
    e.target.parentElement.classList.add("checkedHighlight")
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
        <button id='checkAns'>Check your answers</button>
      </form>}
    </>
  )
}

export default App

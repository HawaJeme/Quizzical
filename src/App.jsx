import  Interface  from '../components/interface.jsx'
import  Questions  from '../components/Questions.jsx'
// import {decode} from 'html-entities';
import React from "react"


function App() {
  const [questionObjs, setQuestionObjs] = React.useState([])
  const [quizStart, setQuizStart] = React.useState(false)
 
  React.useEffect(()=>{
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

  addEventListener('click', (e)=> {
    if(e.target.id === "start-quiz"){
      document.querySelector(".interface").style.display = "none"
      setQuizStart(true)
    }
  })

  console.log(questionObjs)
  const questionElements = questionObjs.map(obj =>{
    return <Questions
      question={obj.question}
      correctAns={obj.correct_answer}
      incorrectAns={obj.incorrect_answers}
    />
  })

  return (
    <>
      <Interface />
      <div className='quesContainer'>
        {quizStart && questionElements}
      </div>
    </>
  )
}

export default App

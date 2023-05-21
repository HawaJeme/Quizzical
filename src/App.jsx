import  Interface  from '../components/interface.jsx'
import  Questions  from '../components/Questions.jsx'
import {decode} from 'html-entities';
import React from "react"


function App() {
const [questionObjs, setQuestionObjs] = React.useState([])

addEventListener('click', (e)=> {
  if(e.target.id === "start-quiz"){
    ApiFetch()
  }
})

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(Response => Response.json())
      .then(data => {
          const results = data.results
          for(let i=0; i < results.length; i++){
            const obj = results[i]
            // const arr = []
            setQuestionObjs(obj)
          }})
  }, [])

  console.log(questionObjs)
  // const answers = []
  // const questionElements = questionObjs.map(obj =>{
  //   <Questions
  //     question={obj.question}
  //     correctAns={obj.correct_answer}
  //     incorrectAns={obj.incorrect_answers}
  //   />
  // })

  console.log('test')
  return (
    <>
      <Interface />
      {questionElements}
    </>
  )
}

export default App

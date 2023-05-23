import  Interface  from '../components/Interface.jsx'
import  Questions  from '../components/Questions.jsx'
import  React from "react"


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
  React.useEffect(()=> {
    addEventListener('click', (e)=> {
      if(e.target.id === "start-quiz"){
        document.querySelector(".interface").style.display = "none"
        setQuizStart(true)
      }
    })
  }, [])
  console.log(quizStart)

  function handleForm(e){
    e.stopPropagation()
    e.preventDefault()
    console.log(e.target)
  }

  const questionElements = questionObjs.map((obj, index) =>{
    return <Questions
      keys={index}
      question={obj.question}
      correctAns={obj.correct_answer}
      incorrectAns={obj.incorrect_answers}
    />
  })

  return (
    <>
      <Interface />
      {quizStart && <form id='quesContainer' onSubmit={handleForm}>
        {questionElements}
        <button id='checkAns'>Check your answers</button>
      </form>}
    </>
  )
}

export default App

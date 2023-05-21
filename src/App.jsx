import  Interface  from '../components/interface.jsx'
import  Questions  from '../components/Questions.jsx'
import {decode} from 'html-entities';

// let questionElements = ''
let arr = []

addEventListener('click', (e)=> {
  if(e.target.id === "start-quiz"){
    ApiFetch()
  }
})
// document.getElementById("start-quiz").addEventListener("click", ()=>{
//   document.querySelector(".interface").style.display = "none"
//   ApiFetch()
// })

function ApiFetch(){
  fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(Response => Response.json())
      .then(data => {
          const results = data.results
          for(let i=0; i < results.length; i++){
            const obj = results[i]
            arr.push(obj)
          }
          console.log(arr)
  })
}
function App() {
  const questionElements = arr.map( obj =>{
      <Questions
        question={obj.question}
        correctAns={obj.correct_answer}
        incorrectAns={obj.incorrect_answers}
      />
  })
  console.log('test')
  return (
    <>
      <Interface />
      {questionElements}
    </>
  )
}

export default App

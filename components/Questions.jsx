import React from "react"
import {decode} from 'html-entities';

export default function Questions(props){
    const answers = [...new Set(...[props.incorrectAns])]
    let randomIndex = Math.floor(Math.random() * (answers.length + 1))
    answers.splice(randomIndex, 0, props.correctAns)
    console.log(answers)
    // const allAns = [...new Set(...[answers])]
    // console.log(allAns)
    const answerElements = answers.map(ans => {
        return <button className="answer"> {decode(ans)} </button>
    })
    return(
        <div>
            <h3>{decode(props.question)}</h3>
            <div className="ansDiv">{answerElements}</div>
            <br></br>
        </div>
    )
}
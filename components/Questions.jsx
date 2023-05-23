import React from "react"
import {decode} from 'html-entities';

export default function Questions(props){
    const answers = [...new Set(...[props.incorrectAns])]
    let randomIndex = Math.floor(Math.random() * (answers.length + 1))
    answers.splice(randomIndex, 0, props.correctAns)

    const answerElements = answers.map(ans => {
        return (
            <label className="answer">
                <input type="radio" name={`${props.keys}`} value={ans}></input>{decode(ans)}
            </label>
        )
    })
    return(
        <>
            <h3>{decode(props.question)}</h3>
            <div className="ansDiv" >{answerElements}</div>
            <br></br>
        </>
    )
}
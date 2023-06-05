import React from "react"
import {decode} from 'html-entities';

export default function Questions(props){
    const answers = [...new Set(...[props.incorrectAns])]
    let randomIndex = Math.floor(Math.random() * (answers.length + 1))
    answers.splice(randomIndex, 0, props.correctAns)

    const answerElements = answers.map((ans, index) => (
        <label className="answer" id={props.keys} key={index}>
            <input 
                type="radio"
                required
                value={ans}
                onClick={(e)=> props.highlightAns(e)}>
            </input>
            {decode(ans)}
        </label>
    ))

    return(
        <>
            <h2>{decode(props.question)}</h2>
            <div className="ansDiv" >{answerElements}</div>
            <br></br>
        </>
    )
}
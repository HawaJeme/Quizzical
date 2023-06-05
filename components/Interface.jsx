import React from "react"

export default function Interface(props){
    return (
        <div className="interface">
            <h2>Quizzical</h2>
            <h5>Test your general knowledge with quizzes</h5>
            <button id="start-quiz" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}
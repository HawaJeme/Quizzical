import React from "react"

export default function Questions(props){
    console.log(props)
    return(
        <div>
            <h3>{props.question}</h3>
        </div>
    )
}
let resultsHtml = ''
function ApiFetch(){
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then(Response => Response.json())
        .then(data => {
            const results = data.results
            for(let i=0; i < results.length; i++){
                console.log(results[i].question)
                // resultsHtml = results[i].question
            }
    })
}
ApiFetch()
document.getElementById("start-quiz").addEventListener("click", ()=>{
    document.querySelector(".interface").style.display = "none"
})
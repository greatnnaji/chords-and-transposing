function transposeUp(htmlLineWithChords,song){
  let incomingChordsArray = htmlLineWithChords
  let arrayofChordsGotten = getChords(song)
  let suitableArray = findChord(arrayofChordsGotten)
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ''
  for(let string of arrayofChordsGotten){
    for(let key of suitableArray){
      for(let i=0; i< suitableArray.length; i++){
          if(key[i].includes(string)){
            let char = string
            string = string.replaceAll(key[i], key[(i+1)%12])
          }
        }
      }
    }
for(line of incomingChordsArray){
textDiv.innerHTML = textDiv.innerHTML + `<pre>${incomingChordsArray}</pre>`
}
return incomingChordsArray
}
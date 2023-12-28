let count = 0 //keeps track of what semitone we are at so we kno when ti update the color
const chordArray = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const chordArray1 = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

//This function returns the suitable array from the chord array's above which best fits our use
//its takes in any array of chords
function findChord(originalChords) {
  let chordArrayCheck = false
  let chordArray1Check = false

  for (let string of originalChords) {
    for (let string1 of chordArray) {
      if (string.startsWith(string1)) {
        chordArrayCheck = true
      }
    }
  }
  if (chordArrayCheck) {
    return chordArray
  }

  for (let string of originalChords) {
    for (let string1 of chordArray1) {
      if (string.startsWith(string1)) {
        chordArray1Check = true
      }
    }
  }
  if (chordArray1Check) {
    return chordArray1
  }
  //if the inputted array of chords is not a fit for any of our chord arrays above
  return false
}

function transposeUp() {
  count++
  let arrayofChordsElements = document.querySelectorAll(".chord")//store the chords by their ID
  let arrayofChordsGotten = [...arrayofChordsElements].map(v => v.innerText)//spread their inner text into a new array 
  let suitableArray = findChord(arrayofChordsGotten)//stores the array that best fits our purposes
  let transposed = []//keeps track of the transposed elements in the order they came in

  for (let string of arrayofChordsGotten) {
    let index = suitableArray.indexOf(string)
    if (index > -1)
      transposed.push(suitableArray[(index + 1) % suitableArray.length])//get us the next element if that element exists in our suitable Array
     else{
      if(string === '#'){//making sure we dont store extra sharps since our SuitableArray takes care of the transposing
        string = ''
      }
      transposed.push(string)//else just append the element if it doesn't(for our sharps and minors)
     }
  }

  //Loop through and append the transposed elements into the innerText of our array of chords elements
  //(works as a form of replacing)
  for (let j = 0; j < arrayofChordsGotten.length; j++) {
      if((count > 0)&&(count < suitableArray.length)){//add the appropriate color
        arrayofChordsElements[j].style.color = "red"
      }else{ 
        count = 0
      }
      if(count == 0) {
        arrayofChordsElements[j].style.color = "green"
      }
      arrayofChordsElements[j].innerText = transposed[j]
  }
}

//Does the reverse of the function above (transposeUp)
function transposeDown(){
  count--
  let arrayofChordsElements = document.querySelectorAll(".chord")
  let arrayofChordsGotten = [...arrayofChordsElements].map(v => v.innerText)
  let textDiv = document.getElementById("text-area")
  textDiv = ''
  let suitableArray = findChord(arrayofChordsGotten)
  let transposed = []

  for (let string of arrayofChordsGotten) {
    let index = suitableArray.indexOf(string)
    if (index > -1)
      transposed.push(suitableArray[(index - 1 + suitableArray.length) % suitableArray.length])//gets us the previous element and wraps around if need be
     else{
      transposed.push(string)
     }
  }
  for (let j = 0; j < arrayofChordsGotten.length; j++) {
    if(count < 0){
      count = (count + suitableArray.length) % suitableArray.length//using modulus to wrap around so we do not deal with the negative values of count
    }

    if((count > 0)&&(count < suitableArray.length)){
      arrayofChordsElements[j].style.color = "red"
    }

    if(count == 0){
      arrayofChordsElements[j].style.color = "green"
    }
      arrayofChordsElements[j].innerText = transposed[j]
    }
  }

//Base code of Tutorial2 (some of it have been extracted and adjusted as needed)
//This function outputs the base case for our program 
function parseChordProFormat(chordProLinesArray) {
  //parse the song lines with embedded
  //chord pro chords and add them to DOM
  console.log('parseChordProFormat::chordProLinesArray')
  console.dir(chordProLinesArray)

  //clear any newline or return characters as a precaution --might not be needed
  for (let i = 0; i < chordProLinesArray.length; i++) {
    chordProLinesArray[i] = chordProLinesArray[i].replace(/(\r\n|\n|\r)/gm, "");
  }

  let chordLine = ''
  let lyricLine = ''

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ''//clears html

  for (let i = 0; i < chordProLinesArray.length; i++) {
    let line = chordProLinesArray[i]
    let chordLength = 0//length of the chord symbol
    console.log('line:')
    console.dir(line)
    chordLine = ''
    lyricLine = ''
    let collecting_chord = false; //true whenever we are collection chord characters
    for (let c of line) {
      if (c === '[') {
        collecting_chord = true
        if (chordLength > 0) {
          //put a blank between tighly spaced chords
          chordLine += ' '
          chordLength++
        }
      }
      else if (c === ']') {
        collecting_chord = false
      }
      else if (collecting_chord === true) {
        chordLine += `<span class="chord">${c}</span>`//adds the chord characters to the chordline with color 
        chordLength++
      }
      else {
        lyricLine += c
        if (chordLength > 0) chordLength-- //consume chord symbol char
        else {
          chordLine += ' '
        }
      }
    }
    textDiv.innerHTML = textDiv.innerHTML + `<pre>${chordLine}</pre>`
    textDiv.innerHTML = textDiv.innerHTML + `<pre>${lyricLine}</pre>`
  }
}

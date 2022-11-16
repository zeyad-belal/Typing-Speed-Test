// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

let levels = {
    "easy" : 6,
    "normal":5,
    "hard":4,
}

let level = document.querySelector(".lvl")
let remainSeconds = document.querySelector(".seconds")
let userInput = document.querySelector(".input")
let theWord = document.querySelector(".the-word")
let upcomingWords =document.querySelector(".upcoming-words")
let secondsLeft =document.querySelector(".time span")
let yourScore =document.querySelector(".score .got")
let totalScore =document.querySelector(".total")
let finish =document.querySelector(".finish")
let startBtn =document.querySelector(".start")


// initial states
let defaultLvl = "normal"
let defaultSeconds = levels[defaultLvl]
level.innerHTML = defaultLvl
remainSeconds.innerHTML = defaultSeconds
secondsLeft.innerHTML = remainSeconds.innerHTML
totalScore.innerHTML = words.length

userInput.onpaste = function () {
  return false;
}

startBtn.onclick = function (){
  //remove btn
  this.remove()
  //generate word
  generateWord()
  userInput.focus()

}

function generateWord (){
  // reseting values
  userInput.value= ""
  secondsLeft.innerHTML =defaultSeconds
  upcomingWords.innerHTML= ""

  // generate random word
  let randomWord =words[Math.floor(Math.random()*words.length)]
  theWord.innerHTML =randomWord

  // delete the random word from words array
  let wordIndex = words.indexOf(randomWord)
  words.splice(wordIndex,1)

  // adding the remaining words
  for(let i=0 ; i<words.length ; i++){
    let div = document.createElement("div")
    let divText = document.createTextNode(words[i])
    div.appendChild(divText)
    upcomingWords.appendChild(div)
  }

  // set remaining time
  let timing = setInterval(()=>{
    secondsLeft.innerHTML--
    userInput.addEventListener("change",()=>{
      // user input is correct sitaution
      if(userInput.value.toLowerCase() === randomWord.toLowerCase()){
        clearInterval(timing)
        yourScore.innerHTML++
        generateWord()
      } 
    })
    // lose situation (time out)
    if(secondsLeft.innerHTML == 0 ){
      clearInterval(timing)
      upcomingWords.remove()
      finish.classList.add("bad")
      finish.innerHTML =`Game Over Your score is ${yourScore.innerHTML}`
    }
  },1000)

// win situation
  if(yourScore.innerHTML == totalScore.innerHTML) {
    clearInterval(timing)
    upcomingWords.remove()
    theWord.remove()
    finish.classList.add("good")
    finish.innerHTML =`Congratz`
  }  

}

//Variables


const deck = document.querySelector(".deck");
const starOne = document.querySelector(".star_one");
const starTwo = document.querySelector(".star_two");
const starThree = document.querySelector(".star_three");
const stars = document.querySelector(".stars");
const restart = document.querySelector(".restart");

/*
 * Create a list that holds all of your cards
  */
const cards = document.querySelectorAll(".card");

const arrayOfCards = Array.from(cards);


let shuffledCards = shuffle(arrayOfCards);
let listOfOpenCards = [];
let listOfMatchedCards = [];


let movesNumber = document.querySelector(".moves");
let moves= 0 ;

let modal = document.querySelector(".modal");
let headingModal = document.querySelector("#headingModal");
let modalMessage="";
let restartText=document.querySelector(".restart-text");


// FUNCTIONS:



// // Create unordered list;
//
 function makeUL() {

     // Create the deck element:
     deck.innerHTML=" ";
     restartGame();

     for(let j = 0; j < 16 ; j++) {

        shuffledCards[j].classList.remove("show", "open", "match", "card");
        shuffledCards[j].classList.add("card");
        shuffledCards[j].addEventListener("click", showCard);

        deck.appendChild(shuffledCards[j]);




      }

     // Finally, return the constructed list:
     return deck;

 }

 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

function setupGame() {
//function to initialise game
  makeUL();
//count moves
  moves = 0;
//timer
  startTimer();
}

function restartGame(){
  restart.addEventListener("click", function () {

  shuffle(arrayOfCards);

  stopTimer();
  movesNumber.innerHTML=0;
  setupGame();

  rating();
  modalMessage="";


  })
}



function addMoves() {
  moves++;
  movesNumber.innerHTML = moves;
  //starRating()
}


function showCard(target) {
  //console.log(this);

  this.classList.add("open","show");
  listOfOpenCards.push(this);


  if (listOfOpenCards.length === 1){

    for(let j = 0; j < 16 ; j++) {
       this.removeEventListener("click", showCard);
      }
  }

  if (listOfOpenCards.length === 2){
      addMoves();
      checkMatch();
      //rating
      rating();
      for(let j = 0; j < 16 ; j++) {
        shuffledCards[j].addEventListener("click", showCard);
        }

  }
}


function checkMatch() {

  let card_one = listOfOpenCards[0];
  let card_two = listOfOpenCards[1];


  let card_one_symbol = card_one.innerHTML;
  let card_two_symbol = card_two.innerHTML;

  if (card_one_symbol === card_two_symbol){

    card_one.classList.add("match");
    card_two.classList.add("match");
    listOfMatchedCards.push(card_one,card_two);

}
  else{
    setTimeout(function(){
      card_one.classList.remove("open","show");
      card_two.classList.remove("open","show");
    }, 750)
    }

    listOfOpenCards=[];
// console.log(listOfMatchedCards);
    endGame();

}

//rating
function rating() {

  if (moves<=13) {

    starOne.innerHTML='<i class="fa fa-star-o"></i>';
    starTwo.innerHTML='<i class="fa fa-star-o"></i>';
    starThree.innerHTML='<i class="fa fa-star-o"></i>';

    ratingStars = 3
  }

  if (moves>13 && moves<=24) {

    starOne.innerHTML='<i class="fa fa-star-o"></i>';
    starTwo.innerHTML='<i class="fa fa-star-o"></i>';
    starThree.innerHTML='';

    ratingStars = 2
  }

  if (moves>25)  {

    starOne.innerHTML='<i class="fa fa-star-o"></i>';
    starTwo.innerHTML='';
    starThree.innerHTML='';

    ratingStars = 1
  }
}


//timer from http://logicalmoon.com/2015/05/using-javascript-to-create-a-timer/
function startTimer() {
        var seconds = 00;
	timer = setInterval(function() {
	    seconds ++;
	    document.getElementById("seconds").innerText = seconds % 60;
            document.getElementById("minutes").innerText = parseInt(seconds / 60);
        }, 1000);
}

function stopTimer() {
        clearInterval(timer);
    }


function endGame() {

  if (listOfMatchedCards.length === 16) {

    modal.style.display = "block";
    console.log("ende");
    stopTimer();
    modalMessage = document.createElement("p");
    let minutesGame = document.getElementById("minutes");
    let secondsGame = document.getElementById("seconds");
    modalMessage.innerHTML = "<p>Your made it in <strong>" +
      minutesGame.textContent + ":" + secondsGame.textContent +
      "</strong>, <br> You did it in <strong> "+
      moves +
      "</strong> moves <br> and we give you: <strong>" +
      ratingStars +
      '</strong>  stars! </p>'
    modalMessage.classList.add('modal-text')
    headingModal.appendChild(modalMessage);

    }

}

restartText.onclick = function (event) {
  //if (event.target === window) {
    modalMessage.innerHTML="";
    modal.style.display = "none";

    listOfMatchedCards=[];
    shuffle(arrayOfCards);
    stopTimer();
    movesNumber.innerHTML=0;
    setupGame();
    rating();

  //}
}


// init Gameboard when DOM content is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    setupGame();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

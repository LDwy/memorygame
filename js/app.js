//Variables

const startButton = document.querySelector("#startButton");
const board = document.querySelector("#board");
/*
 * Create a list that holds all of your cards
  */
const cardPictures = document.getElementsByTagName("i");

const arrayOfCardPictures = Array.from(cardPictures);

arrayOfCardPictures.splice(0,4);

let shuffledCards = shuffle(arrayOfCardPictures);


// FUNCTIONS:



// // Create unordered list;
//
 function makeUL() {
     // Create the deck element:

     const deck = document.createElement("ul");
     deck.classList.add("deck");
     deck.setAttribute("id", "memory-board");

     for(let j = 0; j < 16 ; j++) {
         // Create the deck card:
         const card = document.createElement("li");
         //adding card class to card li:
         card.classList.add("card");

         //console.log(card);
         // Set its contents:
         card.appendChild(shuffledCards[j]);

         // Add it to the list:
         deck.appendChild(card);

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

  for (let j = 0; j < 16; j++) {
    shuffledCards[j].classList.remove("show", "open", "match");

  makeUL();

  }

}


function clickOnCard() {
  for (let shuffledCard of shuffledCards) {
  shuffledCard.addEventListener('click', showCard)
}
}


function showCard () {
  this.classList.add("open");
  this.classList.add("show");

}
//
//document.body.onload = setupGame();
// $(document).ready(function() {
//
//   setupGame();
//
//     )}
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

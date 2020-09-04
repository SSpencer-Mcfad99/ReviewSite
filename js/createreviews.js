"use-strict";

(() => {
  // variables
  const gameName = document.getElementById("game");
  const reviewContent = document.getElementById("review");
  const starToggle1 = document.getElementById("star-toggle-1");
  const starToggle2 = document.getElementById("star-toggle-2");
  const starToggle3 = document.getElementById("star-toggle-3");
  const starToggle4 = document.getElementById("star-toggle-4");
  const starToggle5 = document.getElementById("star-toggle-5");
  const uploadBtn = document.getElementById("upload");
  let rating = 0;

  // toggleRating(elem) - changes the rating variable to the innerHTML content of the inputted element and then puts that element into another function showStar(). 
  function toggleRating(elem) {
    rating = elem.innerHTML;
    showStar(elem);
  }

  // showStar(elem) - calls the clearRating() function and changes the color of a specified element to yellow.
  function showStar(elem) {
    clearRating();
    elem.style.color = "yellow";
  }

  // clearRating() - resets all the colours of the number next to each star to white.
  function clearRating() {
    [starToggle1, starToggle2, starToggle3, starToggle4, starToggle5].forEach(c => c.style.color = "white");
  }

  /* addReview() - This function first sanitises the user input by replacing special characters with another string/character. 
    A check is then conducted to see that all user fields are filled and to see if there is a valid rating. 
    If the fields and rating is valid, it then assigns the otherReviews variable as either parses the reviews currently stored in the localStorage or an empty set (dependant on if there's anything in localStorage or not).
    
    Then it creates the details for the new review into an array with the keys: Game, Stars and Review.
    With the values as the user inputs and the rating. It then pushes the new review into the array of older reviews.
    It then sets the reviews into the localStorage called 'reviews' and then stringifies the array using JSON.stringify command since you can only store string values in localStorage.
    
    Then the input fields are cleared, the rating is set to default and clearRating() function is called.
    If there's no values then an alert is sent to let the user know that they need to add input to all fields.
  */
  function addReview() {
    name = gameName.value.replace(/&/g, "and").replace(/</g, "&lt").replace(/>/g, "&gt").replace(/[;]/g,",");
    gameReview = reviewContent.value.replace(/&/g, "and").replace(/</g, "&lt").replace(/>/g, "&gt").replace(/;/g,",");

    if ((gameName.value != "") && ((rating>0) && (rating<=5)) && (reviewContent.value != "")) {
      const otherReviews = JSON.parse(localStorage.getItem('reviews')) || [];

      const reviewDetails = {
        'Game': name,
        'Stars': rating,
        'Review': gameReview
      };
    
      otherReviews.push(reviewDetails);
      localStorage.setItem('reviews', JSON.stringify(otherReviews));
      alert('review added!');
      
      gameName.value = "";
      clearRating();
      rating = 0;
      reviewContent.value = "";
    } else {
      alert("You need to enter values!");
    }
  }

  // Event Listeners
  [starToggle1, starToggle2, starToggle3, starToggle4, starToggle5].forEach(c => c.addEventListener( "click", ev => {
    toggleRating(c);
  }));

  uploadBtn.addEventListener("click", ev => {
    addReview();
  });
})()
"use-strict";

(() => {
  // variables
  const loadBtn = document.getElementById("loadReviews");
  const reviewName = document.getElementById("gameName");
  const table = document.getElementById("table");
  
  let reviews = JSON.parse(localStorage.getItem('reviews'));
  let rowWrapper = document.getElementsByClassName("table-row");
  let rowLength = rowWrapper.length;
  let title = document.getElementById("gameTitle");
  let currentRow = 1;
  let check = 0;
  
  /* loadReviews() - Resets check to the default value and then calls the clear table function (see clearTable for details) if the table has more than just headers.
  It then checks to see if there are reviews in localStorage or not. If there is, it then calls the sortsReview function to add any reviews of a game searched for
  by a user (more details in sortReviews). It will then update the rowWrapper and rowLength variables and updates check if there's been anything added to the table.
  
  It will then reset currentRow to 1 ready for the next call of the function. If check remains the default, it will send an alert to let the user know that the game
  currently has no reviews and will reset the content of the h3 tag to the default. If reviews is an empty array, it will send an alert telling the user that there 
  are no reviews on the site.
  */
  function loadReviews() {    
    const name = reviewName.value.replace(/&/g, "and").replace(/</g, "&lt").replace(/>/g, "&gt").replace(/[;]/g,",");
    check = 0;
    if (rowLength > 1) {
      clearTable();
    }

    if(reviews.length > 0) {
      reviews.forEach(e => sortReviews(e, name))    
       
      rowWrapper = document.getElementsByClassName("table-row");
      rowLength = rowWrapper.length;
      
      if (currentRow > 1) {
        check = 1;
      }
      
      currentRow = 1;
      
      if (check === 0) {
        title.innerHTML = "Game Title";
        alert("There are no reviews for that game!");    
      }    
    } else {
       alert("No reviews on website!"); 
    }
  }
  
  /* sortReviews(review, name) - This function takes in a review and will check to see if the contents the user has input equals the game name stored (both converted to lower case).
    If it is then it will add the review to the table using the displayReview() function (see displayReview() for details) and change the h3 tag to the game's name. If not then it 
    will repeat the function but for the next review (if review is not last in array).
  */
  function sortReviews(review, name) {
    if (name.toLowerCase() === review.Game.toLowerCase()) {
      displayReview(review);  
      title.innerHTML = review.Game;
    }    
  }
  
  // clearTable() - Removes all table-rows excluding the header table-row from bottom of table upwards. It will update the rowWrapper and rowLength variables afterwards.
  function clearTable() {
    for (i = rowLength - 1; i > 0; i--) {
      rowWrapper[i].parentNode.removeChild(rowWrapper[i]);
    }    

    rowWrapper = document.getElementsByClassName("table-row");
    rowLength = rowWrapper.length;
  }
  
  /* displayReview(review) - Takes in a review and adds it to the table. It first creates a new div element and sets it's class attribute to table-row and appends to table.
    Then the first column (which contains the rating) of row is created as a new div element and has it's class attribute set to 'left-table-cell' and is appended to the table-row.
    For the contents of the first column, the container for the rating is created as a div and has it's id attribute set to 'star-container' and is appended to the first column.
    
    Then the rating-stars are created via a for loop and the use of the Stars variable within the passed in review. Each star is created as a span element and given an id attribute of star.
    It is then appended to the star container.
    
    Finally, the other column is created as a div element with a class attribute of 'right-table-cell'. The actual review is then added to the textContent of the column. And a delete button with an event listener that 
    the calls function deleteReview and deletes the table row if clicked (It also updates the rowWrapper and rowLength variables). It is then appended to the table-row. Then current row increments in preparation for the next review to be added to the table.
  */
  function displayReview(review) {
    const div = document.createElement('div');
    div.setAttribute('class', "table-row");
    table.appendChild(div);
    
    const columnA = document.createElement('div') ;
    columnA.setAttribute('class', 'left-table-cell');
    div.appendChild(columnA);
    
    const stars = document.createElement('div');
    stars.setAttribute('id', 'star-container');
    columnA.appendChild(stars);
    
    for (x = 0; x < parseInt(review.Stars); x++) {
        const star = document.createElement('span');
        star.setAttribute('id', 'star');
        stars.appendChild(star);
    }
    
    const columnB = document.createElement('div');
    columnB.textContent = review.Review;
    columnB.setAttribute('class', 'right-table-cell');
    div.appendChild(columnB);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    columnB.appendChild(deleteButton);
    deleteButton.addEventListener('click', ev => { 
      deleteReview(review.Game, review.Stars, review.Review);
      table.removeChild(div);
      
      rowWrapper = document.getElementsByClassName("table-row");
      rowLength = rowWrapper.length;
    }); 
    
    currentRow = currentRow + 1;
  }
  
  /* deleteReview(gameName, starRating, reviewContent) - This function iterates through the reviews array and checks to see if the review shares the same name, rating and content.
    If it does then that element is removed from the array. Otherwise, it checks the next element of the array. It then updates the localStorage to account for these deleted elements.
  */
  
  function deleteReview(gameName, starRating, reviewContent) {
    for (let i = 0; i < reviews.length; i++) {
      if ((reviews[i].Game === gameName) && (reviews[i].Stars === starRating) && (reviews[i].Review === reviewContent)) {
        reviews.splice(i,1);  
      }
    }    

    localStorage.setItem('reviews', JSON.stringify(reviews));    
    reviews = localStorage.setItem('reviews', JSON.stringify(reviews)) || [];
  }
  
  // Event Listeners
  loadBtn.addEventListener('click', ev => {
    if (reviewName.value != "") {
      loadReviews();
    } else {
      alert("You need to enter a game name!");  
    }
  });
  
  reviewName.addEventListener("keyup", ev => {
    if (ev.key === "Enter") {
      loadBtn.click();
    }
  });
})();
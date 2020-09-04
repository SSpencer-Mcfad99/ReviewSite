"use-strict";

(() => {
  // variables
  const loadBtn = document.getElementById("loadReviews");
  const reviewName = document.getElementById("gameName");
  const container = document.getElementById("reviewsContainer");

  let reviews = JSON.parse(localStorage.getItem('reviews'));

  function loadReviews() {
    const name = reviewName.value.replace(/&/g, "and").replace(/</g, "&lt").replace(/>/g, "&gt").replace(/[;]/g,",");
    if (container.hasChildNodes()) {
      clearTable();
    }

    if(reviews.length > 0) {
      reviews.forEach(e => sortReviews(e, name));

      if (container.hasChildNodes() === false) {
        alert("There are no reviews for that game!");
      }
    } else {
       alert("No reviews on website!");
    }
  }

  function sortReviews(review, name) {
    if (name.toLowerCase() === review.Game.toLowerCase()) {
      displayReview(review);
    }
  }


  function clearTable() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function displayReview(review) {
    const div = document.createElement('div');
    div.classList.add("row", "bgGrey");
    div.innerHTML = "&nbsp";
    container.appendChild(div);

    const div2 = document.createElement('div');
    div2.classList.add("row-centered", "bgPurple");
    div2.setAttribute("align-items","center");
    container.appendChild(div2);

    const sectionA = document.createElement('div') ;
    sectionA.setAttribute('class', 'rating-container');
    div2.appendChild(sectionA);

    const stars = document.createElement('div');
    stars.setAttribute('class', 'stars-container');
    sectionA.appendChild(stars);

    for (x = 0; x < parseInt(review.Stars); x++) {
        const star = document.createElement('span');
        star.setAttribute('id', 'star');
        stars.appendChild(star);
    }

    const div3 = document.createElement('div');
    div3.classList.add("row-centered", "bgPurple");
    container.appendChild(div3);

    const sectionB = document.createElement('div');
    sectionB.textContent = review.Review;
    sectionB.setAttribute('class', 'review-container');
    div3.appendChild(sectionB);

    const div4 = document.createElement('div');
    div4.classList.add("row-centered", "bgPurple", "buttonDelRow", "paddingSmallBottom");
    container.appendChild(div4);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("buttonDel");
    deleteButton.textContent = 'delete review';
    div4.appendChild(deleteButton);
    deleteButton.addEventListener('click', ev => {
      deleteReview(review.Game, review.Stars, review.Review);
      container.removeChild(div);
      container.removeChild(div2);
      container.removeChild(div3);
      container.removeChild(div4);
    });
  }

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

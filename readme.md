# CTEC3905 Assignment
 NOTE: THESE NOTES ARE BASED ON THE OLD VERSION OF THE SITE RATHER THAN THE UPDATED VERSION.
 
  Below here is a basic summary for all css, html and js files for the website with some discussion on issues faced. After all these are references.

  This website is a games review website where a user can store reviews locally and delete/view them.

## Notes
  Near the end of the project, I started experimenting with trying to move the reviews from localStorage and instead into a file called reviews.txt.
However, as I experimented I found that this would be beyond my abilities or requires a js library/server-side language which does not fulfill assessment
criteria. As a result, I reverted the whole git repo back to a previous state and deleted the branch for some testing involving this also.

## createreviews.html

  The `createreviews.html` file allows for users to give a star rating and a review for a specific game using input fields as well as span elements.  
It has a stylesheet link to the `css/styles.css` file and 2 script tags after the main content which links to the `js/scripts.js` and `js/createreviews.js` files.

### Challenges faced

  Throughout the project, I was having to overcome the issue of displaying the rating stars on the page and how to make them responsive. This underwent multiple variations
in the project. Ultimately I went for inserting span elements inside containing the number of the star value since the css for the rating-star class had hover elements to
it which meant that it would not stay lit once clicked on by the user. I instead lit up the number of the selected value. There was also the issue of a filled star being added
in after every element before the hovered over star  so I included the after property for the hover event.

  There were also issues with getting the sizing and padding between elements right for smaller screened devices so this had been an issue of trial-and-error (as seen with the mass
commit messages towards the end). This issue was discovered when I tested the site on my phone.

## externalreviews.html

  The `externalreviews.html` file is a page containing a table containing links to other reviewing sites as well as some information about them.
It has a stylesheet link to the `css/styles.css` file and a script tag after the main content which links to the `js/scripts.js` file.

### Challenges faced
  Throughout the project, there were issues with logos forcing the table to be bigger than the body element, meaning it would expand past the end
of the navbar and everything else on small devices. Like with the stars-container in `createreviews.html`, this took some trial and error with testing
on my phone.

  There was also an issue with trying to fix some errors regarding links to sites/images in the table which were resolved easily or using alternative
sites for getting similar images to avoid mixed content warnings (eg Nintendolife logo being a site with http rather than https initially).

## index.html

  The `index.html` file is the homepage for the website. It contains a navbar with links to other pages on the site.
It also contains a description of what the site is and some review rules. It has a stylesheet link to the `css/styles.css` file and a script tag after the main content which links to the `js/scripts.js` file.

## viewreviews.html

  The `viewreviews.html` file is a template which has a table that is updated when the user enters a game name into the input field and clicks the loadButton using the `js/loadreviews.js` file.
It has a stylesheet link to the `css/styles.css` file and two script tag after the main content which links to the `js/scripts.js` and `js/loadreviews.js` files.

### Challenges faced
  An issue I ran into was  getting the stars to format correctly inside of the table cell class. However, this was resolved relatively quickly using flex and flex-direction css properties to display
it in a row rather than a column of stars.

## css/styles.css

  The `css/styles.css` file contains a template for a responsive page.

### Challenges faced
  There were multiple sizing and spacing issues throughout the website when in a window barely about the criteria for changing the site to mobile view.
These were fixed incrementally throughout development as and when they were discovered during testing (either on PC or mobile). A solution was having to
commit several updates to GitHub so that the results could be properly examined on a mobile device. These were solved by changing margin, font-size and width
of different element types.

  There were also issues of previously working css code suddenly not workingm, which was fixed by changing the order of some css code (the css for the toggle events
code is a prime example of this).

## js/createreviews.js

  The `js/createreviews.js` file does multiple things. It changes the value of the rating based on which star you click and highlights that number.
It also gets the values inside the input fields and rating which are assigned as values in an array. The new review is then added to the array of
old reviews and the new array of reviews is added to localStorage by stringifying it using the JSON.stringify function. More details in comments.

### Challenges faced
  During development, a problem I had was storing the values. I chose to store it into an array right from the start in localStorage but it was always
finding a way to store it that would allow it to be easily accessible afterwards. The solution to this was using key/value pairs in the array to accessible
each element and for the 'reviews' localStorage item to essentially be an array of arrays. I used the 3 keys, one for each value from the inputs from the
`createreviews.html` page and to load the previous state of localStorage item before this. When the reviews are loaded in, they would be parsed with the JSON
parse command and then the new review would be appended to the end of the list. The updated array would then be set back into localStorage using the name 'reviews'
again, being stringified before so as localStorage only accepts string values.

## js/loadreviews.js

  The `js/loadreviews.js` file clears the table on `viewreviews.html` and then will display all reviews of a specified game if it exists in localStorage.
It splits the review into rating in the left column and the review itself as well as a button with an event listener that deletes the row in the right column.
It creates a new row for each review and goes through the array using a foreach statement that applies function sortReviews to each one.

An alert will be returned if the game doesn't exist in the reviews or if there are no reviews on the site. See comments below for more detail.

### Challenges faced
  Throughout development, there were issues when the checking of the reviews variable in `viewreviews.html` wasn't working properly. These were fixed by either
moving the filter to another part of the function or by changing the conditions within if statements and for loops.
  There was also times where some function calls within the file weren't working but this was due to an extra semicolon which was quickly removed.

## js/scripts.js

  The `js/scripts.js` file toggles the properties of rightNav when menu-toggle is clicked.

### Challenges faced
  In earlier stages of development, this js file contained the js code for all html pages on the site. However, when getting deeper into writing js code for
functionality of `createreviews.html` and `viewreviews.html`, I noticed that there were errors appearing the console since it couldn't find defined consts and lets
values due to the content being on the other pages. So in order to have the js code functioning easier, it was decided to split the `js/script.js` into 3 js files:
`js/script.js`, `js/createreviews.js` and `js/loadreviews.js`.

# References

Below are some resources I used to help me to create this assignment:

- Adapted lab_04 code to produce flexbox style for navigation bar for assignment.
- Adapted lab_06 code for adding child elements to an already existing div.
- Adapted css .rating-star code from [here](https://css-tricks.com/star-ratings/).

# Sportify

Sportify is a mobile application and website that sells sports equipment. It is main features are designed to encourage users to spend and buy more items from the shop.

GitHub: https://github.com/Johnathan-Wang/IP-project
 
## Design Process
 
The Application Sportify is designed to cater to different types of users, the main user Sportify aims to draw in are Sporty people, they want sports equipment and we provide it. These people are then catagorised further into Philantropist, Achievers, Self-seekers and Consumers.

Some resons for why these users may want to use Sporify:
- As a Achiever, I would like a competition to fuel my competative spirit.
- As a Consumer, I would want a way to earn rewards to spend on discount for future purchases.
- As a Self-seeker, i would want a way to earn recognition among other users.
- AS a philantropist, i would like a way to help other users.


## Features
 
### Existing Features
- Feature 1 - Allows users to create an account if they do not have one yet
- Feature 2 - Allows users to login to their accounts and blocks them if there is no account or the wrong infomation was writen
- Feature 3 - Allows users to logout of their account if they want
- Feature 4 - Allows users to add items from the index.html page into the cart and change the quantity showing how much it would cost in total.
- Feature 5 - Allows users to see their current information and change it if they want.
- Feature 6 - Allows users to filter out which items in the search page they would want to see (All, balls, rackets, etc).
- Feature 7 - Allows users to earn points from purchasing items which will add to their total points shown in the profile page.
- Feature 8 - Allows users to write, rate and post review to the reviews page.
- Feature 9 - Allows users to write in a question they may have to Sportify in the contact page.

## Technologies Used

- [HTML](https://html.com/)
    - The project uses **HTML** to hold our main content like words, images, etc.
- [CSS](https://css3.com/)
    - The project uses **CSS** to Style and create the layout of Sportify.
- [Javascript](https://www.javascript.com/)
    - The project uses **Javascript** to Code out the differnent complex features of Sportify.
- [Restdb](https://restdb.io/)
    - The project uses **Restdb** as the API of Sportify to hold information such as user information.
- [JSON](https://www.json.org/)
    - The project uses **JSON** as the local storage to hold certain information like product information.
- [Cloudfare](https://www.cloudflare.com/en-gb/)
    - The project uses **Cloudfare** as a way to receive icons for the nav bar of Sportify.

## Testing

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Login:
    1. Go to login page
    2. Try to login with empty fields and verify an error message appears.
    3. Try to login with random field inputs and verify an error message appears.
    4. Try to login with a valid username and password and verify it lets you in.

2. Sign-up:
    1. Go to Sign-up page
    2. Try to sign up with empty fields and verify that an error message appears.
    3. Try to sign up with a username and password of your choosing and see if it lets you.
    4. Try to Login in with your newly created account.

3. Add to cart:
    1. Go to Index page
    2. Try to add an item from the index into the cart and see if it is inside it.
    3. Try to add multiple different items and increase or decrease quantity to see if it is in cart and shows total

4. Checkout:
    1. Go to the Index page cart tab
    2. Try to checkout with nothing in the cart and see if it brings you into the checkout page.
    3. Try to checkout with something in the cart and see if it brings you into the checkout page and displays the correct total amount in the cart.
    4. Try to checkout with empty fields to verify error message appears.
    5. Try to checkout with filled fields to verify checkout works.

5. Search filter:
    1. Go to search page.
    2. See if items are displayed.
    3. Try pressing one of the filter buttons to see if onlt the items in that catagory are showing.

6. Contact form:
    1. Go to the "Contact" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with all inputs valid and verify that a success message appears.

7. Review page:
    1. Go to review page
    2. Try to enter fields and submit to see if review is posted to the site

8. Points:
    1. fill the cart up to more than $100 and go through the checkout until the rewards page.
    2. Check if the rewards page shows the appropiate points that should be given based on how much you spent
    3. continue to the profile page and see if your points have indeed increased by the amount shown.
  
Media queary:
on larger screens, all content is centered and allows for scrolling the page

Bugs and issues arising during testing:
- Api locks out due to being on the free plan
- Reviews allow for empty fields to be posted


## Credits

### Content

#### Media
3D models Artstation links:
- [Tennis racket](https://www.artstation.com/artwork/obVwJL)
- [Dumbell](https://www.artstation.com/artwork/lDveGJ)
- [Basketball hoop](https://www.artstation.com/artwork/ao5Yqk)
- [Weight bench](https://www.artstation.com/artwork/OGYoeK)


### Acknowledgements

I received inspiration for this project from [Decathalon](https://www.decathlon.com/)

### Contrabutions
Html:
- Login.html - Johnathan
- Sign-up.html - John
- Index.html - John
- Search.html - Johnathan
- Profile.html - Johnathan
- Contact.html - Johnathan
- Checkout.html - John
- rewards.html - Johnathan
- Reviews.html - Johnathan
- ReviewRewards.html - John
- Tierrewards.html - John, Johnathan

Javascript:
- Login.js - Johnathan
- Signup.js - John
- Announcements.js - John
- Cart.js - John
- Search.js - Johnathan
- Profile.js - John, Johnathan
- Checkout.js - John
- rewards.js - John, Johnathan
- review.js - Johnathan
- tierrewards.js - John, Johnathan

CSS:
Styles.css - John, Johnathan

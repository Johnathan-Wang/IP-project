//login page
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const apiEndpoint = 'https://login-dec3.restdb.io/rest/user-login?q={"username":"'+username+'","password":"'+password+'"}';
    //const apiEndpoint = 'https://login-dec3.restdb.io/rest/user-login';
    const apiKey = "65b79ba7f38b576c3fcb4028";
  
    const headers = {
        "Content-Type": "application/json",
        "x-apikey": apiKey
    };
  
    // const data = {
    //     "username": username,
    //     "password": password
    // };
  
    fetch(apiEndpoint, {
        method: "GET",
        headers: headers,
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        if (data.length > 0) {
          localStorage.setItem("UserData",JSON.stringify(data[0]))
          window.location.href = "index.html";
        } else {
          alert("Invalid username or password");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred during the login process.';
    })
  }
  
  //sign-up page
  function SignUp() {
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const contact = document.getElementById("contact").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
  
  
    const apiEndpoint = 'https://login-dec3.restdb.io/rest/user-login';
    const apiKey = "65b79ba7f38b576c3fcb4028";
  
  
    const headers = {
      "Content-Type": "application/json",
      "x-apikey": apiKey
    };
  
  
    const data = {
      "username": username,
      "password": password,
      "contact": contact,
      "name": name,
      "email": email,
      "points": 0
    };
  
  
    fetch(apiEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data) 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
  
      console.log(responseData);
  
      window.location.href = "login.html";
    })
    .catch(error => {
  
      console.error('Error:', error);
      document.getElementById('error-message').textContent = 'An error occurred during the Sign-up process.';
    });
  }
  
  // index page announcements
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slider-img');
  
  function showSlide(index) {
      if (index < 0) {
          currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
          currentSlide = 0;
      } else {
          currentSlide = index;
      }
  
      slides.forEach((slide, i) => {
          if (i === currentSlide) {
              slide.style.display = 'block';
          } else {
              slide.style.display = 'none';
          }
      });
  }
  
  function changeSlide(n) {
      showSlide(currentSlide + n);
  }
  
  showSlide(currentSlide);
  
  //  filtered items
  filterSelection("all")
  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
  }
  
  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }
  
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }
  
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
  
  // checkout page
  document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Perform any necessary validation or processing here
  
    window.location.href = 'rewards.html';
  });
  
  // reviews
  
  function addReview() {
    const username = document.getElementById('username').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
  
    const reviewsContainer = document.getElementById('reviews-container');
  
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';
  
    reviewDiv.innerHTML = `
        <p><strong>${username}</strong> - Rating: ${rating} stars</p>
        <p>${review}</p>
    `;
  
    reviewsContainer.appendChild(reviewDiv);
  
    // clear the fields
    document.getElementById('username').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('review').value = '';
  }
  
  // show profile idk man
  document.addEventListener('DOMContentLoaded', function () {
    // API URL
    const apiUrl = 'https://login-dec3.restdb.io/rest/user-login?q={"username": "'+sessionStorage.key["id"]+'"}';
    const apiKey = '65b79ba7f38b576c3fcb4028';
    const usernameElement = document.getElementById('username');
    const fullnameElement = document.getElementById('fullname');
    const emailElement = document.getElementById('email');
    const contactElement = document.getElementById('contact');
    const pointsElement = document.getElementById('points');
  
    // fetch user information based on username
    function fetchUserProfile() {
        fetch(`${apiUrl}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey,
                "Cache-Control": "no-cache"
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // adds the user information
            usernameElement.textContent = data[0].username;
            emailElement.textContent = data[0].email;
            contactElement.textContent = data[0].contact;
            pointsElement.textContent = data[0].points;
        })
        .catch(error => console.error('Error fetching user profile:', error));
    }
  
    // trying to change user information
    function updateProfile() {
        const newName = document.getElementById('new-name').value;
        const newEmail = document.getElementById('new-email').value;
        const newContact = document.getElementById('new-contact').value;
  
        // update user information
        const updateAPIUrl = 'https://login-dec3.restdb.io/rest/user-login/'+JSON.parse(localStorage.getItem("UserData"))._id;
        fetch(`${udpateApiUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({
                name: newName,
                email: newEmail,
                contact: newContact,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // updates the displayed user information
            fullnameElement.textContent = data.name;
            emailElement.textContent = data.email;
            contactElement.textContent = data.contact;
  
            // empties input fields
            document.getElementById('new-name').value = '';
            document.getElementById('new-email').value = '';
            document.getElementById('new-contact').value = '';
  
            console.log('User profile updated successfully:', data);
        })
        .catch(error => console.error('Error updating user profile:', error));
        console.error(error)
    }
  
    // fetch user profile when the page loads
    fetchUserProfile(username);
  
    document.getElementById('save-button').addEventListener('click', function () {
    updateProfile();
  
    });
  
  });
  
  // rewards/ point idk
  
  function calculatePoints() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
  
    let points = 0;
  
    if (amount >= 50 && amount < 100) {
      points = 30;
    } else if (amount >= 100 && amount < 300) {
      points = 90;
    } else if (amount >= 300 && amount < 500) {
      points = 150;
    } else if (amount >= 500) {
      points = 300;
    }
  
    document.getElementById("points").innerText = `You earned ${points} points!`;
  }
  
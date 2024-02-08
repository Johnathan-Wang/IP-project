function SignUp() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const contact = document.getElementById("contact").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
  
  
    const apiEndpoint = 'https://userlogin-6619.restdb.io/rest/user-details';
    const apiKey = "65c43b7d86354fd527464bcf";
  
  
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
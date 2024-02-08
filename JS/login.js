function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const apiEndpoint = 'https://userlogin-6619.restdb.io/rest/user-details?q={"username":"'+username+'","password":"'+password+'"}';
  const apiKey = "65c43b7d86354fd527464bcf";

  const headers = {
      "Content-Type": "application/json",
      "x-apikey": apiKey
  };

  // Fetch user details from API
  fetch(apiEndpoint, {
      method: "GET",
      headers: headers,
  })
  .then(response => {
      // Check if response is successful
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      // Check if user data is returned
      if (data.length > 0) {
          // Store user data in local storage
          localStorage.setItem("UserData",JSON.stringify(data[0]))
          // Redirect user to index page
          window.location.href = "index.html";
      } else {
          // Alert user for invalid username or password
          alert("Invalid username or password");
      }
  })
  .catch(error => {
      // Log and display error message if any error occurs during the login process
      console.error('Error:', error);
      document.getElementById('error-message').textContent = 'An error occurred during the login process.';
  })
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const apiEndpoint = 'https://userlogin-6619.restdb.io/rest/user-details?q={"username":"'+username+'","password":"'+password+'"}';
    
    const apiKey = "65c43b7d86354fd527464bcf";
  
    const headers = {
        "Content-Type": "application/json",
        "x-apikey": apiKey
    };
  
    
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
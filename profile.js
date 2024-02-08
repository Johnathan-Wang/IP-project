const apiKey = '65c43b7d86354fd527464bcf';
        const usernameElement = document.getElementById('username');
        const fullnameElement = document.getElementById('fullname');
        const emailElement = document.getElementById('email');
        const contactElement = document.getElementById('contact');
        const pointsElement = document.getElementById('points');
        const tierElement = document.getElementById('tier');

        document.addEventListener('DOMContentLoaded', function () {
            // API URL
            const apiUrl = 'https://userlogin-6619.restdb.io/rest/user-details?q={"username": "'
                                +JSON.parse(localStorage.getItem("UserData")).username+'"}';

            // Fetch user profile
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
                // Display user information
                usernameElement.textContent = data[0].username;
                fullnameElement.textContent = data[0].name;
                emailElement.textContent = data[0].email;
                contactElement.textContent = data[0].contact;

                // Retrieve points from local storage
                const points = data[0].points;
                
                // Display points
                if (points !== null) {
                    pointsElement.textContent = points;

                    // Calculate and display tier
                    let tier = '';
                    if (points >= 10000) {
                        tier = 'Gold';
                    } else if (points >= 5000) {
                        tier = 'Silver';
                    } else if (points >= 1000) {
                        tier = 'Bronze';
                    } else {
                        tier = 'Regular';
                    }
                    tierElement.textContent = `(${tier})`;
                } else {
                    console.error('Points not found in local storage');
                }
            })
            .catch(error => console.error('Error fetching user profile:', error));

            document.getElementById('save-button').addEventListener('click', function () {
                updateProfile(); 
            });

        });

        function updateProfile() {
          const newName = document.getElementById('new-name').value;
          const newEmail = document.getElementById('new-email').value;
          const newContact = document.getElementById('new-contact').value;

          // update user information
          const updateAPIUrl = 'https://userlogin-6619.restdb.io/rest/user-details/'+JSON.parse(localStorage.getItem("UserData"))._id;
          fetch(`${updateAPIUrl}`, {
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
          }).catch(error => console.error('Error updating user profile:', error));
      }

        document.getElementById('logout-button').addEventListener('click', function () {
            // remove user data from local storage
            localStorage.removeItem('UserData');
            localStorage.setItem('cart', "");
            // redirect to login page
            window.location.href = 'login.html';
        });

        document.getElementById('view-rewards').addEventListener('click', function () {
            const points = pointsElement.textContent; // Retrieve points from the displayed element
            if (points) {
                window.location.href = `tierrewards.html?points=${points}`;
            } else {
                console.error('Points not found');
            }
        });
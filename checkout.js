// Retrieve total amount from local storage
const totalAmount = localStorage.getItem('totalAmount');
// Update the total amount element with the retrieved value
document.querySelector('.totalAmount').innerText = `$${totalAmount}`;

document.getElementById('cartForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Calculate points based on total amount
    let points = calculatePoints(totalAmount);
    //update points
    updateProfilePoints(points);
});

// Function to calculate points based on total amount spent
function calculatePoints(totalAmount) {
    let points = 0;
    totalAmount = parseFloat(totalAmount.replace('$', '')); // Remove $ sign
    if (totalAmount >= 50 && totalAmount < 100) {
        points = 30;
    } else if (totalAmount >= 100 && totalAmount < 300) {
        points = 90;
    } else if (totalAmount >= 300 && totalAmount < 500) {
        points = 150;
    } else if (totalAmount >= 500) {
        points = 300;
    }
    return points;
}

// Function to update profile points in local storage
function updateProfilePoints(addPoints) {

    //get current points from db
    const apiUrl = 'https://userlogin-6619.restdb.io/rest/user-details?q={"username": "'
                                +JSON.parse(localStorage.getItem("UserData")).username+'"}';
    const apiKey = '65c43b7d86354fd527464bcf';
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const contactElement = document.getElementById('contact');
    const pointsElement = document.getElementById('points');

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
        const points = data[0].points;
        
        // Display points
        if (points == null) {
            points=0    
        } else {
            console.error('Points not found in local storage');
        }

        //add points
        newPoints=points+addPoints;

        //update db
        const updateAPIUrl = 'https://userlogin-6619.restdb.io/rest/user-details/'+data[0]._id;
        fetch(`${updateAPIUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({
                points: newPoints,
            }),
        }).then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            if (data.points==newPoints) {
                
                //empty cart
                localStorage.setItem('cart', "");

                //go to rewards page
                window.location.href = 'rewards.html?points='+addPoints; 
            }
        })

    }).catch(error => console.error('Error fetching user profile:', error));
    document.getElementById('checkoutForm').addEventListener('submit', function (event) {
        event.preventDefault();
      
      
      
        window.location.href = 'rewards.html';
      });

}
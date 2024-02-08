document.addEventListener('DOMContentLoaded', function () {
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
        newPoints=points+30;

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
                
                alert ("Points added.")
            }
        })

    }).catch(error => console.error('Error fetching user profile:', error));
})
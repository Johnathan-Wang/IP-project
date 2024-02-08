document.addEventListener('DOMContentLoaded', function () {

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

                document.getElementById('current-points').textContent = points
            })

            // Redeem button click event
            document.getElementById('redeem-button').addEventListener('click', function () {
                // Get current points
                const currentPoints = parseInt(document.getElementById('current-points').textContent);
                
                // Determine which reward to redeem
                const selectedReward = document.querySelector('input[name="reward"]:checked');
                if (selectedReward) {
                    const rewardPoints = parseInt(selectedReward.value);
                    
                    // Check if user has enough points
                    if (currentPoints >= rewardPoints) {
                        // Deduct points
                        const updatedPoints = currentPoints - rewardPoints;
                        document.getElementById('current-points').textContent = updatedPoints;

                        const updateAPIUrl = 'https://userlogin-6619.restdb.io/rest/user-details/'+JSON.parse(localStorage.getItem("UserData"))._id;
                        fetch(`${updateAPIUrl}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-apikey': apiKey,
                                "Cache-Control": "no-cache"
                            },
                            body: JSON.stringify({
                                points: updatedPoints,
                            }),
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        }).then(data => {
                            if (data.points==updatedPoints) {
                                alert(`Congratulations! Reward redeemed successfully.`);
                            }
                        })                        
                    } else {
                        alert('Insufficient points to redeem this reward.');
                    }
                } else {
                    alert('Please select a reward to redeem.');
                }
            });
        });
document.addEventListener('DOMContentLoaded', function () {
    // Function to get URL parameters
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Get points from URL parameters
    const points = getParameterByName('points');
    if (points) {
        document.getElementById('current-points').textContent = points;
    } else {
        console.error('Points not found in URL parameters');
    }

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
                alert(`Congratulations! Reward redeemed successfully.`);
            } else {
                alert('Insufficient points to redeem this reward.');
            }
        } else {
            alert('Please select a reward to redeem.');
        }
    });
});
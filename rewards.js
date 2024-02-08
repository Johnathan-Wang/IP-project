document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const points = urlParams.get('points');
    
    // Display points
    if (points !== null) {
        document.getElementById('pointsDisplay').innerText = points;
    } else {
        console.error('Points not found in local storage');
    }
});
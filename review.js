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
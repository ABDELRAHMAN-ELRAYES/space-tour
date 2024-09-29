document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('planetForm');
  const postsList = document.querySelector('.postsList');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const planetName = document.getElementById('planetName').value;
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (!planetName || !file) {
      alert('Please provide both a planet name and an image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      postsList.innerHTML += `
          <div class="card">
            <div class="profile-section">
              <div class="profile-pic-container">
                <img src="images/be2e2b2be7d0326875e6f3a52ad08a7b.jpg" alt="User Profile Picture" class="profile-pic" />
              </div>
              <span class="user-name">User Name</span>
            </div>
            <h3 class="planet-name">${planetName}</h3>
            <img src="${e.target.result}" alt="${planetName}" class="planetPic" />
            <a href="#" class="heart-link">❤️</a>
            <label class="commentLabel" for="comment">Comment</label>
            <input type="text" id="comment" name="comment" placeholder="Add a comment..." />
          </div>
        `;
    };

    reader.readAsDataURL(file);

    form.reset();
  });
});

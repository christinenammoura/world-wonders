document.addEventListener("DOMContentLoaded", () => {
    fetch("https://www.world-wonders-api.org/v0/wonders")
        .then((response) => response.json())
        .then((data) => {
            console.log(data); 
            displayWonders(data);
        })
        .catch((error) => {
            console.error("Error fetching wonders:", error);
        });
});

function displayWonders(wonders) {
    const wondersList = document.getElementById("wonders-list");
    wondersList.innerHTML = wonders.map(wonder => `
        <div class="wonder">
            <h2>${wonder.name}</h2>
            <img src="${wonder.links.images[0] || 'placeholder.jpg'}" alt="${wonder.name}" style="width: 100%; max-width: 400px; height: auto;">
            
            <a href="wonder.html?name=${encodeURIComponent(wonder.name)}">View Details</a>
        </div>
    `).join('');
}

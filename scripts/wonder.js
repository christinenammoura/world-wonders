document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const wonderName = urlParams.get("name");

    if (!wonderName) {
        document.getElementById("wonder-details").textContent = "Wonder not found.";
        return;
    }

    fetch("https://www.world-wonders-api.org/v0/wonders")
        .then((response) => response.json())
        .then((data) => {
            const wonder = data.find(w => w.name === decodeURIComponent(wonderName));
            if (wonder) {
                displayWonderDetails(wonder);
            } else {
                document.getElementById("wonder-details").textContent = "Wonder not found.";
            }
        })
        .catch((error) => {
            console.error("Error fetching wonder details:", error);
            document.getElementById("wonder-details").textContent = "Failed to load details.";
        });
});

function displayWonderDetails(wonder) {
    document.getElementById("wonder-name").textContent = wonder.name;
    document.getElementById("wonder-details").innerHTML = `
        <img src="${wonder.links.images[0] || 'placeholder.jpg'}" alt="${wonder.name}" style="width: 100%; max-width: 600px; height: auto;">
        <p><strong>Location:</strong> ${wonder.location}</p>
        <p><strong>Build Year:</strong> ${wonder.build_year > 0 ? wonder.build_year : `${Math.abs(wonder.build_year)} BC`}</p>
        <p><strong>Time Period:</strong> ${wonder.time_period}</p>
        <p><strong>Summary:</strong> ${wonder.summary}</p>
        <p><strong>Related Links:</strong></p>
        <ul>
            <li><a href="${wonder.links.wiki}" target="_blank">Wikipedia</a></li>
            <li><a href="${wonder.links.britannica}" target="_blank">Britannica</a></li>
            <li><a href="${wonder.links.google_maps}" target="_blank">Google Maps</a></li>
            <li><a href="${wonder.links.trip_advisor}" target="_blank">Trip Advisor</a></li>
        </ul>
    `;
}

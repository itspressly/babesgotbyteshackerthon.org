document.addEventListener("DOMContentLoaded", () => {
  const totalPatients = document.getElementById("total-patients");
  const recentVisits = document.getElementById("recent-visits");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchResults = document.getElementById("search-results");

  // Simulated Database
  const patients = [
    { name: "John Doe", lastVisit: "2024-11-01" },
    { name: "Jane Smith", lastVisit: "2024-10-30" },
    { name: "Michael Brown", lastVisit: "2024-11-10" },
  ];

  // Loading Metrics
  totalPatients.textContent = patients.length;
  recentVisits.textContent = patients.slice(0, 2).length;

  // Search Functionality
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const results = patients.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      searchResults.innerHTML = results
        .map(
          (r) => `<p>${r.name} - Last Visit: ${r.lastVisit}</p>`
        )
        .join("");
    } else {
      searchResults.innerHTML = "<p>No results found.</p>";
    }
  });
});

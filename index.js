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
        .map((r) => `<p>${r.name} - Last Visit: ${r.lastVisit}</p>`)
        .join("");
    } else {
      searchResults.innerHTML = "<p>No results found.</p>";
    }
  });

  // Queue Management
  const queueForm = document.getElementById("queue-form");
  const queueName = document.getElementById("queue-name");
  const symptoms = document.getElementById("symptoms");
  const queueList = document.getElementById("queue-list");

  const queue = [];

  const triageConditions = [
    { keywords: ["chest pain", "difficulty breathing"], level: "High" },
    { keywords: ["fever", "cough"], level: "Medium" },
    { keywords: ["headache", "fatigue"], level: "Low" },
  ];

  function determineTriage(symptoms) {
    for (let condition of triageConditions) {
      if (condition.keywords.some((keyword) => symptoms.includes(keyword))) {
        return condition.level;
      }
    }
    return "Low";
  }

  queueForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = queueName.value;
    const patientSymptoms = symptoms.value.toLowerCase();
    const triageLevel = determineTriage(patientSymptoms);

    queue.push({ name, triageLevel, position: queue.length + 1 });
    updateQueueDisplay();

    queueName.value = "";
    symptoms.value = "";
  });

  function updateQueueDisplay() {
    queueList.innerHTML = queue
      .map(
        (patient) =>
          `<li>${patient.name} - Triage: ${patient.triageLevel} (Position: ${patient.position})</li>`
      )
      .join("");
  }
});

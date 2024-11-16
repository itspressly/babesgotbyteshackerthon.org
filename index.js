document.addEventListener("DOMContentLoaded", () => {
  const totalPatients = document.getElementById("total-patients");
  const recentVisits = document.getElementById("recent-visits");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchResults = document.getElementById("search-results");

  const queueForm = document.getElementById("queue-form");
  const queueName = document.getElementById("queue-name");
  const symptoms = document.getElementById("symptoms");
  const problems = document.getElementById("problems");
  const queueList = document.getElementById("queue-list");
  const suggestionDisplay = document.getElementById("suggestion-display");

  // Initializing an empty list for patient data
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  // Function to update the displayed metrics
  function updateDashboard() {
    totalPatients.textContent = patients.length;
    recentVisits.textContent = patients.slice(0, 2).length;
  }

  // Function to search for a patient by name
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const results = patients.filter((p) => p.name.toLowerCase().includes(query));
    if (results.length > 0) {
      searchResults.innerHTML = results
        .map(
          (r) => `<p>${r.name} - Last Visit: ${r.lastVisit} - Symptoms: ${r.symptoms} - Problems: ${r.problems}</p>`
        )
        .join("");
    } else {
      searchResults.innerHTML = "<p>No results found.</p>";
    }
  });

  // Handling the patient queue
  function updateQueueDisplay() {
    queueList.innerHTML = patients
      .map(
        (patient, index) =>
          `<li>${patient.name} - Symptoms: ${patient.symptoms} - Problems: ${patient.problems} (Position: ${index + 1})</li>`
      )
      .join("");
  }

  // Function to generate suggestions based on symptoms
  function generateSuggestion(symptoms) {
    // Example of a simple rule-based system
    if (symptoms.includes("fever") && symptoms.includes("headache")) {
      return "It might be a viral infection. We recommend visiting a doctor for proper diagnosis and treatment.";
    } else if (symptoms.includes("cough") && symptoms.includes("sore throat")) {
      return "You could be experiencing a cold. Rest and stay hydrated. If symptoms persist, see a doctor.";
    } else if (symptoms.includes("fatigue") && symptoms.includes("muscle pain")) {
      return "These could be signs of overexertion. Consider resting and hydrating.";
    } else {
      return "Please provide more details or consult a doctor for a proper diagnosis.";
    }
  }

  // Handle form submission
  queueForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = queueName.value;
    const symptomText = symptoms.value;
    const problemText = problems.value;
    const lastVisit = new Date().toLocaleDateString();

    const newPatient = { name, symptoms: symptomText, problems: problemText, lastVisit };
    patients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(patients)); // Save data to local storage

    // Update UI
    updateDashboard();
    updateQueueDisplay();

    // Generate and display AI suggestion
    const suggestion = generateSuggestion(symptomText.toLowerCase());
    suggestionDisplay.innerHTML = `<p><strong>Suggested Action:</strong> ${suggestion}</p>`;

    // Reset form fields
    queueName.value = "";
    symptoms.value = "";
    problems.value = "";
  });

  // Initializing dashboard
  updateDashboard();
  updateQueueDisplay();
});

/*
const clearDataButton = document.getElementById("clear-data-button");
clearDataButton.addEventListener("click", () => {
  localStorage.removeItem("patients");
  updateDashboard();  // Update the dashboard after clearing
  updateQueueDisplay(); // Update the queue display
});
*/
document.addEventListener("DOMContentLoaded", () => {
  const csvFileInput = document.getElementById("csvFileInput");
  const processFileButton = document.getElementById("processFileButton");
  const addPersonForm = document.getElementById("addPersonForm");
  const waitingList = document.getElementById("waitingList");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const totalSick = document.getElementById("total-sick");
  const recentAdditions = document.getElementById("recent-additions");

  let patients = [];
  const recentEntriesLimit = 5;

  const concerningSymptoms = ["fever", "cough", "sore throat", "headache"];

  // Update Dashboard
  function updateDashboard() {
    totalSick.textContent = patients.length;

    // Show recent additions
    const recent = patients.slice(-recentEntriesLimit).reverse();
    recentAdditions.innerHTML = recent
      .map((patient) => `<li>${patient.Name} - Symptoms: ${patient.Symptoms}</li>`)
      .join("");
  }

  // Display Patients
  function displayPatients(filteredPatients) {
    waitingList.innerHTML = "";
    filteredPatients.forEach((patient, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${patient.Name} - Symptoms: ${patient.Symptoms}`;
      waitingList.appendChild(listItem);
    });
  }

  // Parse CSV
  function parseCSV(csvText) {
    const rows = csvText.split("\n").map((row) => row.split(","));
    const headers = rows[0];
    const data = rows.slice(1);

    return data.map((row) => {
      const entry = {};
      headers.forEach((header, index) => {
        entry[header.trim()] = row[index]?.trim();
      });
      return entry;
    });
  }

  // Add a new person
  function addPerson(name, symptoms) {
    const newPatient = { Name: name, Symptoms: symptoms };
    patients.push(newPatient);
    updateDashboard();
    displayPatients(patients);
  }

  // Process CSV File
  processFileButton.addEventListener("click", () => {
    const file = csvFileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvData = e.target.result;
        const parsedData = parseCSV(csvData);

        parsedData.forEach((entry) => {
          const symptoms = entry.Symptoms?.toLowerCase() || "";
          if (concerningSymptoms.some((symptom) => symptoms.includes(symptom))) {
            patients.push(entry);
          }
        });

        updateDashboard();
        displayPatients(patients);
      };

      reader.readAsText(file);
    } else {
      alert("Please select a CSV file first!");
    }
  });

  // Manual Entry Form
  addPersonForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("nameInput").value.trim();
    const symptomsInput = document.getElementById("symptomsInput").value.trim();

    if (nameInput && symptomsInput) {
      addPerson(nameInput, symptomsInput);

      // Clear form fields
      addPersonForm.reset();
    } else {
      alert("Please fill in both fields!");
    }
  });

  // Search Functionality
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filteredPatients = patients.filter((patient) =>
      patient.Name?.toLowerCase().includes(query)
    );
    displayPatients(filteredPatients);
  });
});

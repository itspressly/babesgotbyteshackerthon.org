document.addEventListener("DOMContentLoaded", () => {
    const csvFileInput = document.getElementById("csvFileInput");
    const processFileButton = document.getElementById("processFileButton");
    const waitingList = document.getElementById("waitingList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
  
    // Array to store patients
    let patients = [];
  
    // Filter criteria (symptoms of concern)
    const concerningSymptoms = ["fever", "cough", "sore throat", "headache"];
  
    // Function to parse CSV data
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
  
    // Function to display patients in the waiting list
    function displayPatients(filteredPatients) {
      waitingList.innerHTML = "";
      filteredPatients.forEach((patient, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${patient.Name} - Symptoms: ${patient.Symptoms}`;
        waitingList.appendChild(listItem);
      });
    }
  
    // Event listener for processing the CSV file
    processFileButton.addEventListener("click", () => {
      const file = csvFileInput.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const csvData = e.target.result;
          const parsedData = parseCSV(csvData);
  
          // Filter for concerning symptoms
          patients = parsedData.filter((entry) => {
            const symptoms = entry.Symptoms?.toLowerCase() || "";
            return concerningSymptoms.some((symptom) => symptoms.includes(symptom));
          });
  
          // Update the waiting list display
          displayPatients(patients);
        };
  
        reader.readAsText(file);
      } else {
        alert("Please select a CSV file first!");
      }
    });
  
    // Event listener for search functionality
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase();
      const filteredPatients = patients.filter((patient) =>
        patient.Name?.toLowerCase().includes(query)
      );
      displayPatients(filteredPatients);
    });
  });
  
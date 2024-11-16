document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('symptom-form');
    const symptomsInput = document.getElementById('symptoms');
    const suggestionOutput = document.getElementById('suggestion-output');
    
    // Predefined symptom suggestions
    const symptomSuggestions = {
        "fever": "You may be experiencing a fever, which can be a sign of infection or illness. Consider seeing a healthcare provider if symptoms worsen.",
        "cough": "A persistent cough can be caused by various issues, including a cold, flu, or respiratory infection. Monitor your symptoms.",
        "headache": "Headaches are common and can be caused by stress, dehydration, or a variety of other conditions. Rest, hydration, and over-the-counter pain relief might help.",
        "stomach ache": "Stomach pain can be related to indigestion, a virus, or other conditions. If the pain persists, consult a doctor.",
        "chest pain": "Chest pain can be a serious symptom and might indicate a heart issue or a respiratory condition. Seek medical attention immediately.",
        "fatigue": "Extreme fatigue could indicate many things, such as sleep deprivation, anemia, or even a viral infection. Get plenty of rest and seek medical advice if it continues."
    };

    // Function to get suggestion based on symptoms
    function getSuggestion(symptoms) {
        const symptomsLower = symptoms.toLowerCase();
        let suggestion = "No suggestion found for the provided symptoms. Please try again or see a healthcare provider.";

        // Match symptom to predefined suggestions
        for (const key in symptomSuggestions) {
            if (symptomsLower.includes(key)) {
                suggestion = symptomSuggestions[key];
                break;
            }
        }

        return suggestion;
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from reloading page
        const symptoms = symptomsInput.value.trim();

        if (symptoms) {
            const suggestion = getSuggestion(symptoms);
            suggestionOutput.innerHTML = suggestion;
        } else {
            suggestionOutput.innerHTML = "Please enter your symptoms to get a suggestion.";
        }
    });
});

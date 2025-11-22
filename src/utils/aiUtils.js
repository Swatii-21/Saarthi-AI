// src/utils/aiUtils.js

// ------------------------------
// Offline predefined responses
// ------------------------------
const offlineResponses = {
  health: {
    fever: {
      title: "Fever Management",
      steps: [
        "Take rest and stay hydrated",
        "Measure your temperature",
        "Take paracetamol if temperature is above 100°F",
        "Apply cold compress on forehead",
        "Consult a doctor if fever persists for more than 3 days",
      ],
    },
    headache: {
      title: "Headache Relief",
      steps: [
        "Rest in a quiet room",
        "Apply a cold or warm compress",
        "Drink water",
        "Take a warm shower",
        "If pain persists, consult a healthcare provider",
      ],
    },
    cough: {
      title: "Cough Management",
      steps: [
        "Drink warm water",
        "Take steam inhalation",
        "Gargle with warm salt water",
        "Avoid smoke/dust",
        "If cough persists, see a doctor",
      ],
    },
  },

  firstAid: {
    cuts: {
      title: "Treating Cuts",
      steps: [
        "Wash hands",
        "Apply pressure to stop bleeding",
        "Clean the wound",
        "Apply antiseptic",
        "Cover with sterile bandage",
      ],
    },
    burns: {
      title: "Burn First Aid",
      steps: [
        "Cool the burn under water",
        "Remove tight clothes/jewelry",
        "Cover with clean cloth",
        "Do not apply ice or butter",
        "Seek help for severe burns",
      ],
    },
  },

  fireSafety: {
    "fire prevention": {
      title: "Fire Prevention Tips",
      steps: [
        "Install smoke detectors",
        "Keep flammable items away",
        "Never leave cooking unattended",
        "Check electrical wiring",
        "Keep fire extinguishers ready",
      ],
    },
  },

  disasterHelp: {
    earthquake: {
      title: "Earthquake Safety",
      steps: [
        "Drop, Cover, Hold On",
        "Stay away from windows",
        "Move to open space outdoors",
        "Stay inside vehicle if driving",
        "Check for injuries",
      ],
    },
  },

  awareness: {
    hygiene: {
      title: "Personal Hygiene",
      steps: [
        "Wash hands regularly",
        "Cover mouth when coughing",
        "Keep surroundings clean",
        "Drink clean water",
        "Eat fresh food",
      ],
    },
  },
};

// ------------------------------
// Response Finder
// ------------------------------
export const getOfflineAIResponse = (category, query) => {
  const categoryData = offlineResponses[category?.toLowerCase()];
  if (!categoryData) return null;

  const queryLower = query.toLowerCase();

  for (const [key, value] of Object.entries(categoryData)) {
    if (queryLower.includes(key) || key.includes(queryLower)) {
      return value;
    }
  }

  return {
    title: "General Information",
    steps: [
      "Please provide more details",
      "Try rephrasing your question",
      "In emergencies, contact local services",
    ],
  };
};

// ------------------------------
// Placeholder multilingual support
// ------------------------------
export const getMultilingualResponse = (response, language) => {
  // Currently returns English, but you can plug any translator later
  return response;
};

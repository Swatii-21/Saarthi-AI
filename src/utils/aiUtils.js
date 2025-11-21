// Offline AI response utilities

const offlineResponses = {
  health: {
    'fever': {
      steps: [
        'Take rest and stay hydrated',
        'Measure your temperature',
        'Take paracetamol if temperature is above 100°F',
        'Apply cold compress on forehead',
        'Consult a doctor if fever persists for more than 3 days'
      ],
      title: 'Fever Management'
    },
    'headache': {
      steps: [
        'Rest in a quiet, dark room',
        'Apply a cold or warm compress to your forehead',
        'Stay hydrated by drinking water',
        'Take a warm shower or bath',
        'If pain persists, consult a healthcare provider'
      ],
      title: 'Headache Relief'
    },
    'cough': {
      steps: [
        'Stay hydrated - drink warm water or tea',
        'Use a humidifier or take steam',
        'Gargle with warm salt water',
        'Avoid irritants like smoke and dust',
        'If cough persists for more than a week, see a doctor'
      ],
      title: 'Cough Management'
    }
  },
  firstAid: {
    'cuts': {
      steps: [
        'Wash your hands with soap and water',
        'Apply gentle pressure with a clean cloth to stop bleeding',
        'Clean the wound with running water',
        'Apply an antiseptic cream',
        'Cover with a sterile bandage',
        'Change the bandage daily'
      ],
      title: 'Treating Cuts and Wounds'
    },
    'burns': {
      steps: [
        'Cool the burn under cool running water for 10-15 minutes',
        'Remove any tight clothing or jewelry near the burn',
        'Cover the burn with a clean, dry cloth',
        'Do not apply ice, butter, or ointments',
        'Seek medical help for severe burns'
      ],
      title: 'Burn First Aid'
    },
    'choking': {
      steps: [
        'Encourage coughing if the person can cough',
        'Perform 5 back blows between shoulder blades',
        'Perform 5 abdominal thrusts (Heimlich maneuver)',
        'Alternate between back blows and abdominal thrusts',
        'Call emergency services if the person cannot breathe'
      ],
      title: 'Choking First Aid'
    }
  },
  fireSafety: {
    'fire prevention': {
      steps: [
        'Install smoke detectors in your home',
        'Keep flammable materials away from heat sources',
        'Never leave cooking unattended',
        'Check electrical wiring regularly',
        'Keep fire extinguishers accessible',
        'Have an escape plan ready'
      ],
      title: 'Fire Prevention Tips'
    },
    'if fire breaks out': {
      steps: [
        'Stay calm and alert others',
        'Call emergency services immediately',
        'If safe, use a fire extinguisher',
        'Crawl low under smoke',
        'Feel doors before opening - if hot, use another exit',
        'Never use elevators during a fire'
      ],
      title: 'What to Do During a Fire'
    }
  },
  disasterHelp: {
    'earthquake': {
      steps: [
        'Drop, Cover, and Hold On',
        'Stay away from windows and heavy objects',
        'If outdoors, move to an open area',
        'If in a vehicle, stop and stay inside',
        'After shaking stops, check for injuries',
        'Be prepared for aftershocks'
      ],
      title: 'Earthquake Safety'
    },
    'flood': {
      steps: [
        'Move to higher ground immediately',
        'Avoid walking or driving through floodwater',
        'Stay away from electrical equipment',
        'Listen to local news for updates',
        'Do not return home until authorities say it is safe',
        'Be cautious of contaminated water'
      ],
      title: 'Flood Safety'
    }
  },
  awareness: {
    'hygiene': {
      steps: [
        'Wash hands frequently with soap and water',
        'Cover your mouth when coughing or sneezing',
        'Maintain clean surroundings',
        'Drink clean, safe water',
        'Eat fresh, properly cooked food',
        'Get regular health checkups'
      ],
      title: 'Personal Hygiene'
    },
    'nutrition': {
      steps: [
        'Eat a balanced diet with fruits and vegetables',
        'Stay hydrated by drinking enough water',
        'Limit processed and junk food',
        'Eat meals at regular intervals',
        'Include protein in your diet',
        'Consult a nutritionist for personalized advice'
      ],
      title: 'Healthy Nutrition'
    }
  }
};

export const getOfflineAIResponse = (category, query) => {
  const categoryData = offlineResponses[category.toLowerCase()];
  if (!categoryData) {
    return null;
  }

  // Simple keyword matching for offline responses
  const queryLower = query.toLowerCase();
  
  for (const [key, value] of Object.entries(categoryData)) {
    if (queryLower.includes(key) || key.includes(queryLower)) {
      return value;
    }
  }

  // Default response if no match found
  return {
    title: 'General Information',
    steps: [
      'Please provide more specific details about your concern',
      'You can try rephrasing your question',
      'For immediate emergencies, contact local emergency services',
      'Consult a healthcare professional for medical advice'
    ]
  };
};

export const getMultilingualResponse = (response, language) => {
  // In a real implementation, this would translate the response
  // For now, return the English response
  // In production, you would have multilingual versions of all responses
  return response;
};


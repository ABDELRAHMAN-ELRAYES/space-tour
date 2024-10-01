const descriptions = {
  'star-type': {
    'm-dwarf':
      'M-dwarf stars are cooler and smaller, but their habitable zones are closer.',
    'g-type':
      'G-type stars are similar to our Sun and have stable habitable zones.',
    'f-type':
      'F-type stars are hotter and larger, potentially making their habitable zones farther out.',
  },
  'planet-size': {
    'earth-size':
      'Earth-sized planets have similar gravity and conditions to Earth.',
    'super-earth':
      'Super-Earths are larger than Earth but may have similar conditions.',
    'gas-giant':
      'Gas giants are unlikely to be habitable due to lack of solid surface.',
  },
  atmosphere: {
    nitrogen: 'Nitrogen-rich atmospheres can support life similar to Earth.',
    oxygen: 'Oxygen-rich atmospheres are essential for life as we know it.',
    methane:
      'Methane-rich atmospheres are generally inhospitable to known life forms.',
  },
  'star-age': {
    young:
      'Young stars can be very active, making their planets less likely to support life.',
    'middle-aged':
      'Middle-aged stars are usually stable, providing a good chance for habitability.',
    old: 'Old stars may not provide enough energy for life as conditions change.',
  },
};

// Result logic based on user selections
const assessHabitability = () => {
  const starType = document.getElementById('star-type').value;
  const planetSize = document.getElementById('planet-size').value;
  const orbitDistance = document.getElementById('orbit-distance').value;
  const atmosphere = document.getElementById('atmosphere').value;
  const starAge = document.getElementById('star-age').value;

  // Simple habitability logic (can be expanded)
  let result = 'This planet is ';

  if (starType && planetSize && atmosphere && starAge) {
    if (orbitDistance < 0.5) {
      result += 'not habitable (too close to the star).';
    } else if (orbitDistance > 1.5) {
      result += 'not habitable (too far from the star).';
    } else if (atmosphere === 'methane' || starAge === 'young') {
      result += 'not habitable (incompatible atmosphere or star activity).';
    } else {
      result += 'habitable!';
    }
  } else {
    result = 'Please make all selections.';
  }

  return result;
};

// Update displayed orbit distance in real-time
document
  .getElementById('orbit-distance')
  .addEventListener('input', function () {
    const orbitDistance = document.getElementById('orbit-distance').value;
    document.getElementById(
      'orbit-distance-value'
    ).innerText = `${orbitDistance} AU`;
  });

// Handle quiz submission
document.getElementById('submit-quiz').addEventListener('click', function () {
  const resultDiv = document.getElementById('result');
  const result = assessHabitability();
  resultDiv.innerText = result;
  resultDiv.style.display = 'block'; // Ensure the result is displayed

  // Show explanation based on selections
  const explanation = result.includes('not habitable')
    ? 'This planet falls outside the conditions known to support life. Consider adjusting your selections for better results.'
    : 'The conditions you selected indicate that this planet is in the habitable zone with an appropriate atmosphere for supporting life.';

  const descriptionDiv = document.getElementById('description');
  descriptionDiv.innerText = explanation;

  // Show visual based on star type selection
  const visuals = {
    'm-dwarf': 'https://example.com/m-dwarf-image.jpg', // Replace with actual image URLs
    'g-type': 'https://example.com/g-type-image.jpg',
    'f-type': 'https://example.com/f-type-image.jpg',
  };

  const visualElement = document.getElementById('visual');
  visualElement.src = visuals[starType];
  visualElement.style.display = 'block'; // Show the image
});

// Update descriptions on selection change
document.querySelectorAll('select').forEach((select) => {
  select.addEventListener('change', function () {
    const descriptionDiv = document.getElementById('description');
    if (this.value) {
      descriptionDiv.innerText = descriptions[this.id][this.value];
    } else {
      descriptionDiv.innerText = ''; // Clear description if no value selected
    }
  });
});

// Reset quiz
document.getElementById('reset-quiz').addEventListener('click', function () {
  document.getElementById('star-type').selectedIndex = 0;
  document.getElementById('planet-size').selectedIndex = 0;
  document.getElementById('orbit-distance').value = 1;
  document.getElementById('atmosphere').selectedIndex = 0;
  document.getElementById('star-age').selectedIndex = 0;
  document.getElementById('orbit-distance-value').innerText =
    '1 AU (Earth Distance)';
  document.getElementById('result').innerText = '';
  document.getElementById('description').innerText = '';
  document.getElementById('result').style.display = 'none'; // Hide the result
  document.getElementById('visual').style.display = 'none'; // Hide the image
});

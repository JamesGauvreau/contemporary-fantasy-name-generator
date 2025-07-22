// * Deprecated constants, console.logs

const result = filterByKeys(allPrenomena[whichPrenomenObjectNo],{startsWith: ['english','scottish'],endsWith: '_M'});
const result2 = filterByKeys(allPrenomena[whichPrenomenObjectNo],{startsWith: [whichNation],endsWith: ''});

console.log('--- Testing const whichNation ---');
console.log(whichNation);

console.log('--- Testing const isWizard ---');
console.log(isWizard);

console.log('--- Testing const whichGender ---');
console.log(whichGender);

console.log('--- Testing filterByGender(allPrenomena[callPrenomenObject], isWizard) ---');
console.log(filterByGender(allPrenomena[whichPrenomenObjectNo], isWizard))

console.log('--- Testing filterByNation(originalObject, nation) ---');
console.log(filterByNation(allPrenomena[whichPrenomenObjectNo], whichNation));

console.log('--- Testing filterByNation(originalObject, nation) ---');
console.log(filterByNation(allPrenomena[whichPrenomenObjectNo], whichNation));

const filterWrapper = {startsWith: [whichNation],endsWith: [whichGender]};

// const whichPrenomenObjectNo = callPrenomenObject();
// const whichNation = callNation();

// const isWizard = callGender();
// const whichGender = isWizard ? '_M' : '_F';

// console.log('--- Testing const whichPrenomenObjectNo ---');
// console.log(whichPrenomenObjectNo);

// console.log(nameDennis_Denise.english_M[1]);


// * Deprecated functions

function measureWrapperObject(obj) {
    return obj ? Object.keys(obj).length : 0;
}

const countObject = measureWrapperObject(resultTestWrapper);

if (!success) {
    console.error(`❌ Failed to find results after ${maxRetries} attempts.`);
    // Optional: fallback logic here
}

function filterByGender(originalObject, isWizard) { // the second parameter should refer to the output of callGender.
    const genderSuffix = isWizard ? '_M' : '_F';
    const newObject = {};

    for (const key in originalObject) {
        // Check key ends with the appropriate gender suffix
        if (key.endsWith(genderSuffix)) {
            const value = originalObject[key];

            // Check value is an array AND contains at least one string
            if (Array.isArray(value) && value.some(item => typeof item === 'string')) {
                newObject[key] = value; // Only assign if array includes strings
            }
        }
    }

    return newObject;
}

function filterByNation(originalObject, nation) { 
            // the second parameter should refer to the output of callGender.
    const newObject = {};

    for (const key in originalObject) {
        // Check key ends with the appropriate gender suffix
        if (key.startsWith(nation)) {
            const value = originalObject[key];

            // Check value is an array AND contains at least one string
            if (Array.isArray(value) && value.some(item => typeof item === 'string')) {
                newObject[key] = value; // Only assign if array includes strings
            }
        }
    }

    return newObject;
}

// * Possibly deprecated

console.log('--- TEST START ---')

const maxRetries = 5;
let attempts = 0;
let resultTestWrapper = {};
let success = false;

while (attempts < maxRetries && !success) {
  const whichPrenomenObjectNo = callPrenomenObject();
  const whichNation = callNation();
  const isWizard = callGender();
  const whichGender = isWizard ? '_M' : '_F';

  const filterWrapper = { startsWith: [whichNation], endsWith: whichGender };

  resultTestWrapper = filterByKeys(allPrenomena[whichPrenomenObjectNo], filterWrapper);
  resultTestWrapper = removeKeysContaining(resultTestWrapper, 'diminutive');

  if (resultTestWrapper && Object.keys(resultTestWrapper).length > 0) {
    success = true;
    console.log('✅ Filtered result');
  } else {
    attempts++;
    console.warn(`⚠️ Attempt ${attempts}: No results found for nation: ${whichNation}, gender: ${whichGender}. Retrying...`);
  }
}

function pickObject(obj) {
  const keys = Object.keys(obj);
  if (!keys.length) return null;

  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { [randomKey]: obj[randomKey] };
}

const whichObject = pickObject(resultTestWrapper);

function selectFromSingleKeyObject(obj) {
  const keys = Object.keys(obj);
  if (keys.length !== 1) {
    throw new Error(`Expected one key but found ${keys.length}: ${keys.join(', ')}`);
  }

  const values = obj[keys[0]];

  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Value must be a non-empty array.');
  }

  if (values.length === 1) {
    return values[0];
  }

  if (Math.random() <= 0.5) {
    return values[0];
  } else {
    const roll = Math.ceil(Math.random() * values.length) - 1;
    return values[roll];
  }
}

function fullNameBuilder(){
  return (document.getElementById(
    "genFullName"
  ).innerHTML = `<b>Name:</b> ${selectFromSingleKeyObject(whichObject)}.`);
};

fullNameBuilder();

buttonCharacterGenerator.onclick = fullNameBuilder;
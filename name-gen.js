//  TODO
//  v1      minimum viable product
//          - press a button, get some names
//  v1.x    add diminutives
//  v1.x    integrate family names
//  v1.x    fine-tune the odds
//  v1.x    work with keys
//  v1.x    Add celestial names, etc.
//  v2      Build diminutives from roots
//  v3      Work with subtypes
//  
//  ?       Check number of options before rolling, let retries = options, if complete failure still then have a pop-up announcing an error, advising the user to change their options.

//  ! PSEUDO 
//  Check # of objects in super_array
//  Roll random number based on # of objects in super_array
//  Determine gender (Witch || Wizard) by random flip. 
//  Access a particular object
//  Check how many names in array (object_name.english_M or object_name.english_F)
//  ? If 1 name, pick it.
//  ? If 2 names, pick the second.
//  * Else, Roll Math.random()
//  ? If 0.5 or lower, pick first option in array (object_name.english_M || object_name.english_F)
//  * Else, Roll Math.ceil(Math.random() * names in array)
//  Use # to pick an option.

//  TODO
//  * Paste objects into object sheet
//  Test
//  Export
//  Import into main js sheet
//  Test

// * --- Imports ---

import allPrenomena from './prenomen-list.js'; // All code in a file whose content is imported will be activated by the import, and the activation will occur before any other code in name-gen.js.

// * --- Constants ---

const allNations = ["english", "cornish", "french", "irish", "latin", "scottish", "welsh"];

// * --- DOM Helpers ---

function getCategorySelections() {
  const allRadios = document.querySelectorAll('input[type="radio"][name^="category_"]');
  const selections = {};

  allRadios.forEach(radio => {
    if (radio.checked) {
      const category = radio.name.replace('category_', '');
      selections[category] = radio.value;
    }
  });

  return selections;
}

const whichRadioSelections = getCategorySelections(); // * Alter this?

// * --- Utility Functions ---

function capitalize(str) { // ! Ideally we will make this unnecessary by enforcing consistency between radio names and object keys
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function callPrenomenObject() {
    const arrayLength = allPrenomena.length;
    const rollObject = Math.floor(Math.random() * arrayLength);
    return rollObject;
}

function callNation() {
    const arrayLength = allNations.length;
    const rollObject = Math.floor(Math.random() * arrayLength);
    return allNations[rollObject];
}

function callGender() { // * callGender will return a value of true (masc) or false (fem), to be read by the isWizard parameter in filterByGender.
    return Math.random() < 0.5; // ? This replaces two rows: {1} const rollGender = Math.floor(Math.random() * 2); {2} return rollGender === 0;
} 

function removeKeysContaining(obj, substring) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !key.includes(substring))
  );
}

function filterByKeys(originalObject, { startsWith = [], endsWith = '' } = {}) {
    const result = {};

    for (const key in originalObject) {
        const value = originalObject[key];

        const startsOk = startsWith.length === 0 || startsWith.some(prefix => key.startsWith(prefix));
        const endsOk = endsWith ? key.endsWith(endsWith) : true;

        if (startsOk && endsOk && Array.isArray(value) && value.some(item => typeof item === 'string')) {
            result[key] = value;
        }
    }

    return result;
}

function filterByCategoryRestrictions(entries, categorySelections) {
  return entries.filter(entry => {
    for (const [category, status] of Object.entries(categorySelections)) {
      if (status === "forbidden") {
        const key = `is${capitalize(category)}`;
        if (entry[key] === true) return false;
      }
    }
    return true;
  });
}

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


console.log('--- Testing filterByKeys testWrapper ---');
console.log(resultTestWrapper);
console.log('--- keyObject ---');
console.log(selectFromSingleKeyObject(whichObject));

// ! Everything above is working well.
// * Note that separate instances of a filter will grab identical data.

//  TODO
//  Work on integrating radio buttons
//  Reorganize if necessary
//  Read nations from HTML
  //  Can probably get rid of the nations constant afterward
//  Add a button to the HTML in order to read the form info and generate a name into the HTML. 

// ! Workspace below

console.log('--- Testing getCategorySelections() ---');
console.log(whichRadioSelections.gaelic);
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

//  ! PSEUDO 
//  Check # of objects in super_array
//  Roll random number based on # of objects in super_array
//  Determine gender (Witch || Wizard) by random flip. 
//  Access a particular object
//  Check how many names in array (object_name.english_M or object_name.english_F)
//  ? If 1 name, pick it.
//  ? If 2 names, pick the second.
//  * Else, Roll Math.random()
// ? If 0.5 or lower, pick first option in array (object_name.english_M || object_name.english_F)
//  * Else, Roll Math.ceil(Math.random() * names in array)
//  Use # to pick an option.

//  TODO
//  * Paste objects into object sheet
//  Test
//  Export
//  Import into main js sheet
//  Test

import allPrenomena from './prenomen-list.js'; // All code in a file whose content is imported will be activated by the import, and the activation will occur before any other code in name-gen.js.

const allNations = ["english","cornish","french","irish","latin","scottish","welsh"];

// console.log(nameDennis_Denise.english_M[1]);

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



const whichPrenomenObjectNo = callPrenomenObject();
const whichNation = callNation();
const isWizard = callGender();

console.log('--- Testing const whichPrenomenObjectNo ---');
console.log(whichPrenomenObjectNo);

console.log('--- Testing const whichNation ---');
console.log(whichNation);

console.log('--- Testing const isWizard ---');
console.log(isWizard);

// console.log('--- Testing filterByGender(allPrenomena[callPrenomenObject], isWizard) ---');
// console.log(filterByGender(allPrenomena[whichPrenomenObjectNo], isWizard))

// console.log('--- Testing filterByNation(originalObject, nation) ---');
// console.log(filterByNation(allPrenomena[whichPrenomenObjectNo], whichNation));

// console.log('--- Testing filterByNation(originalObject, nation) ---');
// console.log(filterByNation(allPrenomena[whichPrenomenObjectNo], whichNation));

// ! Everything above is working well.
// ! next step is align the two filters with each other.
// * Note that separate instances of a filter will grab identical data.

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

const result = filterByKeys(allPrenomena[whichPrenomenObjectNo],{startsWith: ['english','scottish'],endsWith: '_M'});
const result2 = filterByKeys(allPrenomena[whichPrenomenObjectNo],{startsWith: [whichNation],endsWith: ''});

console.log('--- Testing filterByKeys ---');
console.log(result2);


function getRandomPrenomenSet() {
    return allPrenomena[Math.floor(Math.random() * allPrenomena.length)];
}

function getNewObjectForGender(isWizard) {
    const randomSet = getRandomPrenomenSet();
    return filterByGender(randomSet, isWizard);
}

function getPrenomen(languageKey, isWizard) {
    const filtered = getNewObjectForGender(isWizard);
    return filtered[languageKey]; // e.g., 'english_M' or 'english_F'
}

const gender = callGender();

// console.log(getPrenomen(english))

// console.log(allPrenomena[28]);
// console.log(filterByGender(allPrenomena[26], true));
// // console.log(allPrenomena[28].english_M[1]);
// // console.log(filterPrenomena());
// console.log(callGender());
// // console.log(filterPrenomena())
// // console.log(callPrenomen(allPrenomena));
// console.log("getNewObject test:")
// console.log(getNewObject())
// console.log("getPrenomen test:")
// console.log(getPrenomen());
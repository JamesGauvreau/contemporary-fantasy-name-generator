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

// console.log(nameDennis_Denise.english_M[1]);

function callGender() {
    const rollGender = Math.floor(Math.random() * 2);
    return rollGender === 0;
} // * callGender will return a value of true (masc) or false (fem), to be read by the isMale parameter in filterByGender.

// ! We're making progress! The function below is accurately capturing the information we want to capture.

function filterByGender(originalObject, isMale) { // the second parameter should refer to the output of callGender.
    const genderSuffix = isMale ? '_M' : '_F';
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

// ! Next thing is to check whether I'm making the code too convoluted (we want an easy way to refer to gender multiple times throughout the functions)
// ! Single Responsibility Principle 

function getNewObject() { 
    const newObject = filterByGender(allPrenomena[Math.floor(Math.random() * allPrenomena.length)], false);
    return newObject;
}

function getPrenomen() {
    const prenomenArray = getNewObject();
    return prenomenArray.english_F;
    // const prenomenArray = getNewObject().english_F;
    // const prenomenNumber = prenomenArray.length * Math.floor(Math.random());
    // const prenomenSelection = prenomenArray[prenomenNumber];
    // return prenomenSelection;
}

// console.log(allPrenomena[28]);
console.log(filterByGender(allPrenomena[26], true));
// console.log(allPrenomena[28].english_M[1]);
// console.log(filterPrenomena());
console.log(callGender());
// console.log(filterPrenomena())
// console.log(callPrenomen(allPrenomena));
console.log("getNewObject test:")
console.log(getNewObject())
console.log("getPrenomen test:")
console.log(getPrenomen());
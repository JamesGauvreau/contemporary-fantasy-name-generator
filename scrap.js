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
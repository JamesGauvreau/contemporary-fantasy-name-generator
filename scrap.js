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

const unitMap = new Map();
const metalValues = new Map();


function romanToDecimal(roman) {
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let result = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanValues[roman[i]];

        if (currentValue < prevValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }

        prevValue = currentValue;
    }

    return result;
}


function processQuery(query) {
    const val = query.split(' ');
    if (val[1] === 'is') {
        unitMap.set(val[0], val[2]);
    } else if (val[0] === 'how' && val[1] === 'much') {

        const intergalacticUnits = val.slice(3, -1);
        const decValue = romanToDecimal(intergalacticUnits.map(unit => unitMap.get(unit)).join(''));
        console.log(`${intergalacticUnits.join(' ')} is ${decValue}`);
    } else if (val[0] === 'how' && val[1] === 'many' && val[2] === 'Credits') {
        // Calculate metal value
        const intergalacticUnits = val.slice(4, -2);
        const decimalValue = romanToDecimal(intergalacticUnits.map(unit => unitMap.get(unit)).join(''));
        const metal = val[val.length - 2];
        const credits = parseInt(val[val.length - 1]);
        const value = credits / decimalValue;
        metalValues.set(metal, value);
        console.log(`${intergalacticUnits.join(' ')} ${metal} is ${credits} Credits`);
    } else {
        console.log("I have no idea what you are talking about");
    }
}

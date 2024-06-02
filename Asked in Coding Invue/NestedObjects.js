// Write a code to count the sum of all values in variable `i` .

const js = {
    i: 5,
    j: 20,
    js1: {
        i:10,
        k:9,
    },
    js2: {
        i: 20,
        js4: {
            i:15,
            k:9,
            js5: {
                l:10,
                i:9,
            },
        },
        k:9,
    },
    js3: {
        l:10,
        i:9,
    },
    
}
function sumOfI(obj) {
    let sum = 0;

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                sum += sumOfI(obj[key]);
            } else if (key === 'i') {
                sum += obj[key];
            }
        }
    }

    return sum;
}

console.log(sumOfI(js));
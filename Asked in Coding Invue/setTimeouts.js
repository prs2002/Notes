//what will be the output

//1st
arr = [12, 24, 1, 9];

arr.forEach((i) => {
    setTimeout(() => {
        console.log(i);
    }, i);
});

//2nd
for (i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0);
}
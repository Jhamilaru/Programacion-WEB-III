new Promise((resolve) => {
    resolve(2);
})
.then(num => {
    console.log(num); // 2
    return num * 2;
})
.then(num => {
    console.log(num); // 4
    return num * 2;
})
.then(num => {
    console.log(num); // 8
});


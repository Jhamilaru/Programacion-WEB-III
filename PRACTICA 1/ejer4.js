function mayorMenor(arr) {
    let mayor = arr[0];
    let menor = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > mayor) mayor = arr[i];
        if (arr[i] < menor) menor = arr[i];
    }
    return { mayor, menor };
}

let obj4 = mayorMenor([3,1,5,4,2]);
console.log(obj4);

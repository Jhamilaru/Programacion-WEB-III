//PROMESAS
function doble(num) {
    return new Promise(resolve => {
        resolve(num * 2);
    });
}

doble(2)
    .then(r => doble(r))
    .then(r => doble(r))
    .then(r => console.log(r)); // 16

// CON ASYNC AWAIT
async function calcular() {
    let r = await doble(2);
    r = await doble(r);
    r = await doble(r);
    console.log(r); // 16
}

calcular();


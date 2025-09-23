async function calcular() {
    let r = await doble(2);
    r = await doble(r);
    r = await doble(r);
    console.log(r); // 16
}

calcular();

// Usando callbacks
setTimeout(() => {
    console.log("Paso 1");
    setTimeout(() => {
        console.log("Paso 2");
        setTimeout(() => {
            console.log("Paso 3");
        }, 1000);
    }, 1000);
}, 1000);

//CON ASYNC AWAIT
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function proceso() {
    await esperar(1000);
    console.log("Paso 1");
    await esperar(1000);
    console.log("Paso 2");
    await esperar(1000);
    console.log("Paso 3");
}

proceso();

function obtenerDato() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Dato obtenido"), 1000);
    });
}

obtenerDato().then(d => console.log(d));
async function obtenerDatoAsync() {
    let d = await obtenerDato();
    console.log(d);
}

obtenerDatoAsync();


function promesaComoCallback(cb) {
    Promise.resolve("Hola desde promesa")
        .then(res => cb(res));
}

promesaComoCallback((dato) => {
    console.log(dato);
});

function callbackEjemplo(cb) {
    setTimeout(() => cb("Listo con callback"), 1000);
}

function callbackAPromesa() {
    return new Promise((resolve) => {
        callbackEjemplo(resolve);
    });
}

callbackAPromesa().then(msg => console.log(msg));

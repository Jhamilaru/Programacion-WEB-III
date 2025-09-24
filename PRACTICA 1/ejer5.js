function miFuncion(cadena){
    let invertida = "";
    for(let i=cadena.length-1; i>=0; i--){
        invertida += cadena[i];
    }
    if(cadena === invertida){
        return true;
    }else{
        return false;
    }
}

let band = miFuncion("oruro");
console.log(band); // true

band = miFuncion("hola");
console.log(band); // false


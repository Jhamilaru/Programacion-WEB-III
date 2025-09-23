function miFuncion(texto) {
    let obj = { a:0, e:0, i:0, o:0, u:0 };
    texto = texto.toLowerCase();

    for(let i=0; i<texto.length; i++){
        let letra = texto[i];
        if(letra == "a"){
            obj.a++;
        }
        else if(letra == "e"){
            obj.e++;
        }
        else if(letra == "i"){
            obj.i++;
        }
        else if(letra == "o"){
            obj.o++;
        }
        else if(letra == "u"){
            obj.u++;
        }
    }
    return obj;
}

let obj = miFuncion("euforia");
console.log(obj); 


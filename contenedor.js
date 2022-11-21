class Contenedor{

    //Genero el archivo productos con un array vacio para empezar a trabajarlo
    constructor(archivo){
        this.archivo = archivo;
        this.articulos = [];
        this.fs = require('fs')
    }

    save(objeto){
        const objects = this.getAll();
        let newId = 1;
        if (objects.length !== 0) {
            newId = objects.length + 1;
        } else {
            newId;
        }
        const newObj = { id : newId, ...objeto}
        this.articulos.push(newObj);

        async function guardar(fs, archivo, articulos) {
            try {
                await fs.promises.writeFile(`./${archivo}`, JSON.stringify(articulos, null,2))
                console.log('guardado!')
            } catch (error) {
                console.log(error)
            }
        }
        guardar(this.fs, this.archivo, this.articulos);
    }

    getById(numero){
        if (this.articulos.length !== 0) {
            this.articulos.forEach(element => {
                if (element.id == numero) {
                    return console.log(element);
                }
            });
        } else {
            return console.log('No hay artículos')
        }
    }

    getAll(){
        return this.articulos;
    }

    deleteAll(){
        if (this.articulos.length !== 0) {
            this.articulos = [];
            async function guardar(fs, archivo, articulos) {
                try {
                    await fs.promises.writeFile(`./${archivo}`, JSON.stringify(articulos, null,2))
                    console.log('guardado!')
                } catch (error) {
                    console.log(error)
                }
            }
            guardar(this.fs, this.archivo, this.articulos);
        } else {
            return console.log('No hay artículos')
        }
    }

    deleteById(numero){
        if (this.articulos.length !== 0) {
            let indice = 0;
            this.articulos.forEach((element, index) => {
                if (element.id == numero) {
                    indice = index;
                }
            });
            //Elimina el elemento en ese índice
            delete this.articulos[indice];
            this.articulos.splice(indice,1)
            //Persisto los cambios en el archivo productos.txt
            async function guardar(fs, archivo, articulos) {
                try {
                    await fs.promises.writeFile(`./${archivo}`, JSON.stringify(articulos, null,2))
                     console.log('guardado!')
                 } catch (error) {
                     console.log(error)
                 }
             }
             guardar(this.fs, this.archivo, this.articulos);

        } else {
            return console.log('No hay artículos')
        }
    }
}

let producto1 =  {
    tittle : 'Teclado Gamer Mecánico',
    prize : '5000',
    thumbnail : 'https://http2.mlstatic.com/D_NQ_NP_824385-MLA51631455577_092022-O.jpg'
};

let producto2 =  {
    tittle : 'Monitor LED',
    prize : '45000',
    thumbnail : 'https://compucordoba.com.ar/img/Public/1078-producto-monitor-lg-20-8535.jpg'
};

let producto3 =  {
    tittle : 'Placa de Video',
    prize : '30000',
    thumbnail : 'https://compucordoba.com.ar/img/Public/1078-producto-61sbansjcgl-ac-sx679-1-5453.jpg'
};

let cont = new Contenedor('productos.txt');

//Guardar los productos en la clase
cont.save(producto1);
cont.save(producto2);
cont.save(producto3);

//Obtener todos los productos
console.log('OBTENGO LOS PRODUCTOS DESPUES DE GUARDARLOS: ');
console.log(cont.getAll());

//Comprobar busqueda por ID
cont.getById(2);
cont.getById(6);

//Eliminar un elemento
cont.deleteById(2)
console.log('Obtengo los productos luego de eliminar uno:');
console.log(cont.getAll());

//Eliminar todos los artículos
cont.deleteAll()
console.log('Obtengo los productos luego de eliminarlos a todos:');
console.log(cont.getAll());
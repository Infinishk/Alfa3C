let inquilino = "";
const btn_buscar = document.querySelector('#btn_buscar');
const ayuda_inquilino = document.querySelector('#ayuda_inquilino');
const ayuda_vacio = document.querySelector('#ayuda_vacio');
const buscar = document.querySelector('#buscar');

// Checar si hay contenido dentro del input para desactivar el botón
function checar_inquilino() {
    if (buscar.value != inquilino) {
        btn_buscar.disabled = true;
        ayuda_inquilino.classList.remove('is-hidden');
    } else {
        ayuda_inquilino.classList.add('is-hidden');
        btn_buscar.disabled = false;
    }

    if (buscar.value.length === 0) {
        btn_buscar.disabled = true;
        ayuda_inquilino.classList.add('is-hidden');
    }
}

const buscar_inquilino = () => {
    const valor_busqueda = document.getElementById('buscar').value;
    //función que manda la petición asíncrona
    fetch('/inquilino/buscarInquilino/autocomplete/' + valor_busqueda, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((result) => {
        return result.json(); //Regresa otra promesa
    }).then((data) => {
        if (data.inquilinos.length == 0 && btn_buscar.disabled == true) {
            ayuda_vacio.classList.remove('is-hidden');
        } else {
            ayuda_vacio.classList.add('is-hidden');
        }

        if (data.inquilinos.length === 1) {
            inquilino = data.inquilinos[0].Nombre + ' ' + data.inquilinos[0].Apellidos + ' ' +
                data.inquilinos[0].RFC;
        }

        checar_inquilino();

        if (data.inquilinos.length == 0) {
            ayuda_inquilino.classList.add('is-hidden');
        }

        $("#buscar").autocomplete({
            source: data.inquilinos.map(function (inquilinos) {
                return (inquilinos.Nombre + ' ' + inquilinos.Apellidos + ' - ' +
                    inquilinos.RFC);
            }),
            select: function (event, ui) {
                inquilino = ui.item.value;
                btn_buscar.disabled = false;
            },
            minLength: 3
        });

    }).catch(err => {
        console.log(err);
    });
};


$("#buscar").on("autocompleteselect", function (event, ui) {
    ayuda_inquilino.classList.add('is-hidden');
});

const ayuda_buscar = document.querySelector('#ayuda_buscar');

// Checar si hay contenido dentro del input para desactivar el botón
function checar_contenido() {
    btn_buscar.disabled = buscar.value.length === 0;
    if (buscar.value.length === 0) {
        ayuda_buscar.classList.remove('is-hidden');
        ayuda_vacio.classList.add('is-hidden');
    } else {
        ayuda_buscar.classList.add('is-hidden');
    }
}

buscar.addEventListener('input', buscar_inquilino);
buscar.addEventListener('input', checar_contenido);
buscar.addEventListener('input', checar_inquilino);
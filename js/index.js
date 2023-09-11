const select = document.getElementById("tipo");
const boton = document.getElementById("boton");

let tipo = 0;
let recompra = 0;
let recomprar = 0;
let stop = 0;
let entrada = 0;
let tamano = 0;

select.addEventListener("change", function () {
  const valorSeleccionado = select.value;
  if (valorSeleccionado == 1) {
    boton.className = "btn btn-success";
  } else {
    boton.className = "btn btn-danger";
  }
});

function start() {
  tipo = parseFloat(document.getElementById("tipo").value);
  recompra = parseFloat(document.getElementById("recompra").value);
  recomprar = parseFloat(document.getElementById("recomprar").value);
  stop = parseFloat(document.getElementById("stop").value);
  entrada = parseFloat(document.getElementById("entrada").value);
  tamano = parseFloat(document.getElementById("tamano").value);
  if (
    !isNaN(tipo) &&
    !isNaN(recompra) &&
    !isNaN(recomprar) &&
    !isNaN(stop) &&
    !isNaN(entrada) &&
    !isNaN(tamano)
  ) {
    calcular();
  } else {
    // Al menos uno de los campos está vacío o no es un número válido
    alert("Por favor, complete todos los campos con números válidos.");
  }
}
function calcular() {
  let precio_total = entrada * tamano;
  let cantidad_total = tamano;
  let promedio = entrada;
  let seguir = true;
  let counter = 0;
  let stop_loss = 0;
  let porcentage = 0;

  const tbody = document.querySelector(".t-body");
  tbody.innerHTML = "";
  while (seguir) {
    if ((stop / precio_total) * 100 < recompra) {
      seguir = false;
      porcentage = (stop / precio_total) * 100;
      if (tipo == 1) {
        stop_loss = promedio - (promedio * porcentage) / 100;
      } else {
        stop_loss = promedio + (promedio * porcentage) / 100;
      }
      const newRow = document.createElement("tr");

      newRow.innerHTML = `

                <td class='table-danger text-danger'>Stop Loss</td>
                <td class='table-danger'>${redondearNumero(stop_loss)}</td>
                <td class='table-danger'>${redondearNumero(cantidad_total)}</td>
                <td class='table-danger'>${redondearNumero(
                  promedio * cantidad_total
                )}</td>`;

      tbody.appendChild(newRow);
    } else {
      counter++;
      if (tipo == 1) {
        entrada = entrada - (entrada * recompra) / 100;
      } else {
        entrada = entrada + (entrada * recompra) / 100;
      }
      tamano = tamano + (tamano * recomprar) / 100;
      precio_total += entrada * tamano;
      cantidad_total += tamano;
      promedio = precio_total / cantidad_total;
      const newRow = document.createElement("tr");
      newRow.innerHTML = `

                <td class='rows bg-transparent text-white'>${counter}</td>
                <td class='rows bg-transparent text-white'>${redondearNumero(
                  entrada
                )}</td>
                <td class='rows bg-transparent text-white'>${redondearNumero(
                  tamano
                )}</td>
                <td class='rows bg-transparent text-white'>${redondearNumero(
                  entrada * tamano
                )}</td>`;

      tbody.appendChild(newRow);
    }
  }
}

function redondearNumero(numero) {
  if (numero < 1) {
    return numero.toFixed(6); // Mantener números menores que 1 sin cambios
  } else {
    return numero.toFixed(2);
  }
}

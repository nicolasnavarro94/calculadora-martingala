const select = document.getElementById("tipo");
const boton = document.getElementById("boton");

let tipo = 0;
let recompra = 0;
let recomprar = 0;
let stop = 0;
let entrada = 0;
let tamano = 0;
let gasto_total;
let tamano_total;
let stop_loss = 0;
let promedio = 0;
let porcentage_stop = 0;

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
  sl = parseFloat(document.getElementById("stop").value);
  entrada = parseFloat(document.getElementById("entrada").value);
  tamano = parseFloat(document.getElementById("tamano").value);
  gasto_total = tamano * entrada;
  tamano_total = tamano;
  if (
    !isNaN(tipo) &&
    !isNaN(recompra) &&
    !isNaN(recomprar) &&
    !isNaN(sl) &&
    !isNaN(entrada) &&
    !isNaN(tamano)
  ) {
    calcular();
  } else {
    alert("Por favor, complete todos los campos con números válidos.");
  }
}
function calcular() {
  let continuar = true;
  let counter = 0;
  const tbody = document.querySelector(".t-body");
  tbody.innerHTML = "";
  while (continuar) {
    let nuevo_precio;

    if (tipo == 1) {
      nuevo_precio = entrada - (entrada * recompra) / 100;
    } else {
      nuevo_precio = entrada + (entrada * recompra) / 100;
    }
    let nueva_cantidad = tamano + (tamano * recomprar) / 100;
    let nuevo_gasto_total = gasto_total + nueva_cantidad * nuevo_precio;
    let nuevo_promedio = nuevo_gasto_total / (nueva_cantidad + tamano_total);
    let nuevo_porcentage_stop = (sl / nuevo_gasto_total) * 100;

    if (tipo == 1) {
      nuevo_stop_loss =
        nuevo_promedio - (nuevo_promedio * nuevo_porcentage_stop) / 100;
    } else {
      nuevo_stop_loss =
        nuevo_promedio + (nuevo_promedio * nuevo_porcentage_stop) / 100;
    }

    if (nuevo_porcentage_stop < recompra) {
      console.log(
        "stop: " +
          stop_loss +
          " cantidad: " +
          tamano_total +
          " usdt: " +
          gasto_total
      );
      const newRow = document.createElement("tr");

      newRow.innerHTML = `

                <td class='table-danger text-danger'>Stop Loss</td>
                <td class='table-danger'>${redondearNumero(stop_loss)}</td>
                <td class='table-danger'>${redondearNumero(tamano_total)}</td>
                <td class='table-danger'>${redondearNumero(gasto_total)}</td>`;

      tbody.appendChild(newRow);
      continuar = false;
    } else {
      counter++;
      entrada = nuevo_precio;
      tamano = nueva_cantidad;
      tamano_total += tamano;
      gasto_total = nuevo_gasto_total;
      stop_loss = nuevo_stop_loss;
      porcentage_stop = nuevo_porcentage_stop;
      promedio = nuevo_promedio;
      console.log(promedio);
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
                  nueva_cantidad * nuevo_precio
                )}</td>`;

      tbody.appendChild(newRow);
    }
  }
}

function redondearNumero(numero) {
  if (numero < 1) {
    return numero.toFixed(6);
  } else {
    return numero.toFixed(2);
  }
}

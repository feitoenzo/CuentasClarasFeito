


var addingUsers = true;
var users = [];
//FUNCION PARA AGREGAR USUARIOS EN BUCLE
function addUser() {
    if (addingUsers) {
        var nombre1 = document.getElementById("nombre1").value;
        var monto1 = document.getElementById("monto1").value;
        users.push({ nombre1: nombre1, monto1: monto1 });
        displayUsers();
    }
}
//FRENAR EL BUCLE CON UN BOTON
function stopAddingUsers() {
    addingUsers = false;
    document.getElementById("calculate").style.display = "block";
    document.getElementById("nombre1").style.display = "none";
    document.getElementById("monto1").style.display = "none";
    document.getElementById("addUser").style.display = "none";
    document.getElementById("stopAddingUsers").style.display = "none";
}


//ESTA FUNCION CALCULA EL MNOTO TOTAL GASTADO Y EL PROMEDIO PARA SABER CUANTO DEBERIA PONER CADA USUARIO
function calculatePromedio() {
    var total = 0;
    for (var i = 0; i < users.length; i++) {
        total += parseFloat(users[i].monto1);
    }
    var promedio = total / users.length;
    document.getElementById("result").innerHTML = "El total es de $" + total + "<br> El promedio es de $" + promedio + "<br>";
    return total;
}




//FUNCION QUE  IMPRIME EN HTML EL LISTADO DE USUARIOS Y MOTON INGRESADO
function displayUsers() {
    var list = document.getElementById("userList");
    var item = document.createElement("li");
    item.innerHTML = document.getElementById("nombre1").value + " - $" + document.getElementById("monto1").value;
    list.appendChild(item);
}

 // AQUI LO COMPLICADO, QUIERO LOGRAR QUE LA FUNCION CALCULATEPAYMENTS ME DIGA POR HTML CUANTO DEBE DARLE CADA USUARIO QUE PUSO MENOS DEL PROMEDIO A OTRO QUE HAYA PUESTO MAS DEL PROMEDIO PERO 
 // SE ME COMPLICO BASTANTE, VI MIL VIDEOS, ESTOY EN EL MEDIO DEL CAMPO EN ESTE MOMENTO Y NO LO PUDE LOGRAR, A MEDIDA QUE INVESTIGUE UN POCO MEJOR LOS ERRORES PUSHEO AL REPOSITORIO
function calculatePayments() {
    var total = 0;
    for (var i = 0; i < users.length; i++) {
        total += parseFloat(users[i].monto1);
    }
    var promedio = total / users.length;
    var payments = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var debeDar = 0;
        var to = [];
        if (parseFloat(user.monto1) < promedio) {
            debeDar = promedio - parseFloat(user.monto1);
        }
        payments.push({ from: user.nombre1, to: to, monto1: debeDar });
    }
    // loop para saber cuanto debe cada uno para saldar la deuda
    while (i < payments.length) {
        var j = 0;
        while (j < payments.length) {
            if (i !== j && payments[i].monto1 > 0) {
                var monto1 = Math.min(payments[i].monto1, payments[j].monto1);
                payments[i].monto1 -= monto1;
                payments[j].monto1 -= monto1;
                payments[i].to.push(payments[j].from);
            }
            j++;
        }
        i++;
    }
    var result = "";

    for (var i = 0; i < payments.length; i++) {
        if (payments[i].monto1 !== 0) {
            var debeA = "";
            for (var j = 0; j < payments[i].to.length; j++) {
                if (j > 0) debeA += ", ";
                debeA += payments[i].to[j];
            }
            result += payments[i].from + " debe dar $" + payments[i].monto1 + " a " + debeA + "<br>";
        }
        document.getElementById("result").innerHTML += result;
    }
}



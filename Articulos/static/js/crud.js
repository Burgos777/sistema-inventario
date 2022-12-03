function validacion(){
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var obs1 = document.getElementById("obs1").value;

    if(nombre==''){
        alert("Debe ingresar el nombre..");
        document.getElementById("nombre").focus();
        return;
    }
    if(telefono==''){
        alert("Debe ingresar un teléfono..");
        document.getElementById("telefono").focus();
        return;
    }
    if(email==''){
        alert("Debe ingresar un email..");
        document.getElementById("email").focus();
        return;
    }
    if(obs1==''){
        alert("Debe ingresar una observación..");
        document.getElementById("obs").focus();
        return;
    }
    alert("Registro Ok !!");
}

//inicio de conexion con backend

// Funcion para cargar datos a lña base de datos
function adicionar_elemento(){
    datos = {
         'nombre':document.getElementById('nombre').value,
         'ident':document.getElementById('codigo').value,   
         'cantidad': document.getElementById('cantidad').value,   
         'estado': document.getElementById('estado').value,   
         'ubicacion': document.getElementById('ubicacion').value     
    }
    $.ajax({
        url:'http://localhost:4000/api/cargar',
        method :'POST',
        dataType:'JSON',
        contentType:'application/json; charset=utf-8',
        data:JSON.stringify(datos),
        success:function(respuesta){
            alert(respuesta['mensaje']);
        }
    })
}


//funcion para listar elementos de la base de datos

function listar_elementos(){
    $.ajax({
        url:'http://localhost:4000/api/listar',
        method:'GET',
        dataType:'JSON',
        success:function(respuesta){
            let contenido ='<table>';
            contenido += '<tr>';
            contenido += '<td>NOMBRE DEl PRODUCTO</td><td>CODIGO DEL PRODUCTO</td><td>CANTIDAD DEL PRODUCTO</td><td>ESTADO DEL PRODUCTO</td><td>UBICACIÓN DEL PRODUCTO</td>';
            contenido += '</tr>';
            for(i=0;i<respuesta['resultados'].length;i++){
            contenido += '<tr>';
            contenido += '<td>';
            contenido += respuesta['resultados'][i].nombre;
            contenido += '</td>';
            contenido += '<td>';
            contenido += respuesta['resultados'][i].ident;
            contenido += '</td>';
            contenido += '<td>';
            contenido += respuesta['resultados'][i].cantidad;
            contenido += '</dt>';
            contenido += '<td>';
            contenido += respuesta['resultados'][i].estado;
            contenido += '</td>';
            contenido += '<td>';
            contenido += respuesta['resultados'][i].ubicacion;
            contenido += '</td>';
            contenido += '</tr>'
            }
            contenido += '</table>';
            document.getElementById('listado_actual').innerHTML = contenido;
        }
    })


}
//FUNCION PARA ACTUALIZAR DATOS
function actualizar_elemento(){
    datos = {
         nombre:document.getElementById('nombre').value,
         ident:document.getElementById('codigo').value,   
         cantidad: document.getElementById('cantidad').value,   
         estado: document.getElementById('estado').value,   
         ubicacion: document.getElementById('ubicacion').value     
    }
    $.ajax({
        url:'http://localhost:4000/api/update',
        method :'PUT',
        dataType:'JSON',
        contentType:'application/json; charset=utf-8',
        data:JSON.stringify(datos),
        success:function(respuesta){
            alert(respuesta['mensaje']);
        }
    })
} 

//funcion para eliminar los registros
function eliminar_elemento(){
    datos ={
         ident:document.getElementById('codigo').value
    }
    
     $.ajax({
         url:'http://localhost:4000/api/delete',
         method :'DELETE',
         dataType:'JSON',
         contentType:'application/json; charset=utf-8',
         data:JSON.stringify(datos),
         success:function(x){
             alert(x['mensaje']);
         }
         
     
     })
}  
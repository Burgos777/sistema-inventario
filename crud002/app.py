# -*- coding: utf-8 -*-
"""
Created on Thu Nov 10 19:19:40 2022

@author: ESTUDIANTE
"""
#importar librerias necesarias para trabajar el servicio web
from flask import Flask,request,jsonify
from flask_cors import CORS

from libreria1 import *

#creacion del objeto del servicio web
app = Flask(__name__)

cors =CORS(app)

#creacion de Endpoint
@app.route('/api/cargar',methods=['POST'])
def salida1_endpoint():
    if request.method =='POST':
        ident = request.json['ident']
        nombre = request.json['nombre']
        cantidad = request.json['cantidad']
        estado = request.json['estado']
        ubicacion = request.json['ubicacion']
        estructura={
            'ident':ident,
            'nombre':nombre,
            'cantidad':cantidad,
            'estado':estado,
            'ubicacion':ubicacion
            }
        
        Inventario.append(estructura)
        return jsonify({'mensaje':"Se guardo el registro satisfactoriamente.."})

@app.route('/api/listar', methods=['GET'])
def salida2_endpoint():
    lista1 =[]
    for i in Inventario:
        lista1.append(i)
    return jsonify({'resultados':Inventario})

@app.route('/api/update', methods=['PUT'])
def actualizar_registro():
    if request.method=='PUT':
        ident = request.json['ident']
        nombre = request.json['nombre']
        cantidad = request.json['cantidad']
        estado = request.json['estado']
        ubicacion = request.json['ubicacion']
        estructura={
            'ident':ident,
            'nombre':nombre,
            'cantidad':cantidad,
            'estado':estado,
            'ubicacion':ubicacion
            }
        cont = 0
        for i in Inventario:
            if i['ident']==ident:
                Inventario[cont]=estructura
                break
            cont = cont + 1
        return jsonify({"mensaje":"Registro actualizado.."})
    
@app.route('/api/delete', methods=['DELETE'])
def borrar_regitro():
    if request.method=='DELETE':
        ident = request.json['ident']
        cont = 0
        for i in Inventario:
            if i ['ident']==ident:
                Inventario.pop(cont)
                break
            cont = cont + 1
        return jsonify({"mensaje":"Registro eliminado"})


#puesta en marcha 
if __name__=='__main__':
    
    app.run(debug=True,port=4000)
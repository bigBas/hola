<template>
    <div>
        <b-modal id="session" ref="" hide-footer hide-header>
            <div class="d-block text-center">
                <h3>La sesión ha caducado</h3>
            </div>
            <b-button class="mt-3" variant="primary" block @click="$router.replace('/login')">¡Llévame al login!</b-button>
        </b-modal>

        <div class="container mt-5">
            <div class="justify-content-center d-flex">           
                <h1 class="justify-content-center">Sistema de censo</h1>
            </div>
                
            <button @click="changeView()" class="btn btn-info mt-4">
                <span v-if="pcView">Ver impresoras</span>
                <span v-else>Ver computadoras</span>
            </button>
            
            <div class="row m-0 mt-3 mb-4">
                <div class="row">
                    <div class="col">
                        <input
                        type="text"
                        id="Inventario"
                        v-on:keyup="extraeInventario()"
                        class="form-control input-login-form shadow-none"
                        placeholder="Número de inventario"
                        /> <!-- https://www.tutorialesprogramacionya.com/vueya/detalleconcepto.php?punto=7&codigo=7&inicio=0 -->
                    </div>
                    <div class="col">
                        <select
                            name="tipo"
                            id="tipo"
                            @change="buscaValor()"
                            class="form-control select-login-form shadow-none"
                        >
                            <!-- <option value="0" selected>Todos</option>
                            <option v-for="opcion in tipo" :value="opcion.activoFijo">{{opcion.activoFijo}}</option> -->

                            <option value="Todos" selected>Todos</option>
                                <option v-if="pcView" v-for="opcion in tipo" :value='opcion.activoFijo'>{{opcion.activoFijo}}</option>
                                <option v-else v-for="opcion in tipoPrinters" :value='opcion.tipo'>{{opcion.tipo}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="pcView" class="table-responsive table-fixed text-nowrap justify-content-md-center"
                style="max-height: 350px;">
                <table :class="['table', 'table-sm', 'text-center', { 'table-hover': admin(), 't-hov': admin() }]" style="font-size:14px">
                    <thead class="thead-light text-uppercase">
                        <tr>
                            <th v-for="pcHead in pcHeads" :key="pcHead" class="sticky-top">{{ pcHead }}</th>
                        </tr>
                    </thead>
                    <!-- <tbody class="overflow-auto thov"  v-for="item in respuesta" :key="item.noInventario">
                        <tr @click="watchRow(item.noInventario)">
                            <td class="text-primary">{{ item.noInventario }}</td> -->

                    <!-- <tbody class="overflow-auto thov"  v-for="item in respuesta" :key="item.noInventario">
                        <tr @click="watchRow(item.noInventario)" 
                            v-if="(seleccionado == item.activoFijo || seleccionado == '0')  -->
                    <tbody class="overflow-auto thov"  v-for="item in respuesta">
                        <tr @click="watchRow()" 
                            v-if="(seleccionado == item.activoFijo || seleccionado == 'Todos') 
                                && item.noInventario.indexOf(miNoInventario) != -1"> <!-- https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Useful_string_methods -->
                            <td>{{ item.noInventario }}</td>
                            <td>{{ item.activoFijo }}</td>
                            <td>{{ item.modelo }}</td>
                            <td>{{ item.marca }}</td>
                            <td>{{ item.noSerie }}</td>
                            <td>{{ item.procesador }}</td>
                            <td>{{ item.vProcesador }}</td>
                            <td>{{ item.hdd }}</td>
                            <td>{{ item.memoriasz }}</td>
                            <td>{{ item.memoria }}</td>
                            <td>{{ item.vMemoria }}</td>
                            <td>{{ item.graficos }}</td>
                            <td>{{ item.osname }}</td>
                            <td>{{ item.noResguardo }}</td>
                            <td>{{ item.uResponsable }}</td>
                            <td>{{ item.nombreResponsable }}</td>
                            <td>{{ item.ubicacion }}</td>
                            <td>{{ item.uso }}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div class="text-center">
                    <b-spinner variant="primary" label="Spinning" v-if="loading"></b-spinner>
                </div>
            </div>

            <div v-else class="table-responsive table-fixed text-nowrap justify-content-md-center"
                id="myTableStyle">
                <table :class="['table', 'table-sm', 'text-center', { 't-hov': admin(),  'table-hover': admin()}]">
                    <thead class="thead-light text-uppercase">
                        <tr>
                            <th v-for="printerHead in printerHeads" :key="printerHead" class="sticky-top">{{ printerHead }}</th>
                        </tr>
                    </thead>
                    <!-- <tbody v-for="item in respuesta" :key="item.noInventario">
                        <tr @click="watchRow(item.noInventario)"> -->

                    <!-- <tbody v-for="item in respuesta" :key="item.noInventario">
                        <tr @click="watchRow(item.noInventario)" v-if="seleccionado == item.tipo || seleccionado == '0'"> -->
                            
                    <tbody v-for="item in respuesta">
                        <tr @click="watchRow()" 
                            v-if="(seleccionado == item.tipo || seleccionado == 'Todos')
                            && item.noInventario.indexOf(miNoInventario) != -1"> <!-- https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Useful_string_methods -->
                            <td class="text-primary">{{ item.noInventario }}</td>
                            <td>{{ item.tipo }}</td>
                            <td>{{ item.modelo }}</td>
                            <td>{{ item.marca }}</td>
                            <td>{{ item.noSerie }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>{{ item.noResguardo }}</td>
                            <td>{{ item.uResponsable }}</td>
                            <td>{{ item.nombreResponsable }}</td>
                            <td>{{ item.ubicacion }}</td>
                            <td>{{ item.uso }}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div class="text-center">
                        <b-spinner variant="primary" label="Spinning" v-if="loading"></b-spinner>
                    </div>
            </div>

                <button 
                    v-on:click="onDescarga(respuesta)"
                    class="btn btn-lg btn-success mt-3">Descargar
                </button>
        </div>

        <div
            style="margin-top:200px; left: 0px; position: absolute;"
            class="container-fluid px-0"
        >
            <footer id="footer" style="left: 0px;" class="text-center">
                <div class="separador"></div>
                <div class="contenedor-footer p-3">
                    <div class="text-white mt-3" style="font-size: 11px;">
                        <p>
                            Hecho en México, todos los derechos reservados 2020.
                            <br />
                            Esta página puede ser reproducida con fines no
                            lucrativos, siempre y cuando no se mutile, se cite
                            la fuente
                            <br />
                            completa y su dirección electrónica. De otra forma,
                            requiere permiso previo por escrito de la
                            institución.
                        </p>
                    </div>
                </div>
            </footer>
        </div>

    </div>
    

</template>

<script>
import axios from 'axios';
import config from '../config/config';
import Swal from 'sweetalert2'
/*import strinify from "csv-stringify";
import fs from "file-system";
*/
import MiXLSX from 'xlsx';

export default {
    data() {
        return {
            loading: null,
            pcView: true,
            alternativeView: 'Ver impresoras',
            pcHeads: [
                "Inventario",
                "Tipo",
                "Modelo",
                "Marca",
                "Serie",
                "Procesador",
                "Velocidad de procesador (MHz)",
                "ROM (GB)",
                "RAM (MB)",
                "Tipo de memoria",
                "Velocidad de memoria (MHz)",
                "Gráficos",
                "Sistema operativo",
                "Resguardo",
                "Unidad responsable",
                "Responsable",
                "Ubicación",
                "Uso"
            ],
            printerHeads: [
                "Inventario",
                "Tipo",
                "Modelo",
                "Marca",
                "Serie",
                "Descripción adicional",
                "Resguardo",
                "Unidad Responsable",
                "Responsable",
                "Ubicacion",
                "Uso",
            ],
            respuesta: [],
            datosmios: [],
            tipo: [],
            tipoPrinters: [],
            seleccionado: String,
            miNoInventario: String,
            file: null
        }
    },

    created() {
        this.getComputers();
        this.traetipo();
        this.seleccionado = "Todos";
        this.miNoInventario = "";
    },

    methods: {
        async getComputers() {
            this.loading = true;
            this.respuesta = [];
            const localToken = window.localStorage.token;
            axios.get(`${ config.api }/api/computers`, {
                headers: {
                    token: localToken
                }
            })
            .then(res => {
                this.respuesta = res.data.equipo;
                this.loading = false;
            })
            .catch((error) => {
                if(error.response.status === 409) {
                    localStorage.clear();
                    this.$bvModal.show('session');
                }
            });
        },
        async getPrinters() {
            this.loading = true;
            this.respuesta = [];
            const localToken = window.localStorage.token;
            axios.get(`${ config.api }/api/printers`, {
                headers: {
                    token: localToken
                }
            })
            .then(res => {
                this.respuesta = res.data.printers;
                this.loading = false;
            })
            .catch(error => {
                console.log(error.response);
                if(error.response.status === 409) {
                    localStorage.clear();
                    this.$bvModal.show('session');
                }
            });
        },
        watchRow(noInventario) {
            localStorage.setItem('noInventario', noInventario);
            if(this.pcView)
                this.$router.push('./updateEquip');
            else
                this.$router.push('./updatePrinter');
        },
        async traetipo(){
            console.log("Inicia Consulta");
            const localToken = window.localStorage.token;
            axios.get(`${ config.api }/api/tipo`, {
                headers: {
                    token: localToken
                }
            })
            .then(res => this.tipo = res.data.tipo)
            .catch(err => console.log(err));
            console.log("Termina Consulta" + this.tipo);
        },
        async traetipoImpresora(){
            console.log("Inicia Consulta Impresoras");
            const localToken = window.localStorage.token;
            axios.get(`${ config.api }/api/tipoPrinters`, {
                headers: {
                    token: localToken
                }
            })
            .then(res => this.tipoPrinters = res.data.tipoPrinters)
            .catch(err => console.log(err));
            console.log("Termina Consulta Impresoras " + this.tipoPrinters);
        },
        // watchRow() {
        //     if(JSON.parse(window.localStorage.isAdmin))
        //         this.$router.push('./updateEquip')
        // },
        changeView() {
            this.loading = true;
            if (this.pcView) {
                this.pcView = !this.pcView;
                this.getPrinters();
                this.traetipoImpresora();
                this.seleccionado = "Todos";
                this.miNoInventario = "";
                this.tipo=[' '];
            }
            else{
                this.pcView = !this.pcView;
                this.getComputers();
                this.traetipo();
                this.seleccionado = "Todos";
                this.miNoInventario = "";
            }

        },
        admin() {
            return JSON.parse(window.localStorage.isAdmin);
        },
        onDescarga(datos){
            var miDato;
            const fecha = new Date();
            const anyo = fecha.getFullYear();
            const mes = fecha.getMonth();
            const dia = fecha.getDate();
            const hora = fecha.getHours();
            const min = fecha.getMinutes();
            const seg = fecha.getSeconds();
            var nomArch = this.seleccionado;
            if (dia > 0 && dia < 10){
                nomArch += "0";
            }
            nomArch += dia;
            if (mes > 0 && mes < 10){
                nomArch += "0";
            }
            nomArch += mes;
            nomArch += anyo;
            if (hora >= 0 && hora < 10){
                nomArch += "0";
            }
            nomArch += hora;
            if (min >= 0 && min < 10){
                nomArch += "0";
            }
            nomArch += min;
            if (seg >= 0 && seg < 10){
                nomArch += "0";
            }
            nomArch += seg;
            console.log("Descargar " + nomArch);
            if (this.pcView){
                for (let i = 0, j = 0; i < datos.length; i++){
                    if (this.seleccionado == "Todos" || this.seleccionado == datos[i].activoFijo){
                        this.datosmios[j++] = datos[i];
                    }
                }
                nomArch = "Computadoras" + nomArch;
                miDato = MiXLSX.utils.json_to_sheet([],{ header : this.pcHeads});
            } else {
                for (let i = 0, j = 0; i < datos.length; i++){
                    if (this.seleccionado == "Todos" || this.seleccionado == datos[i].tipo){
                        this.datosmios[j++] = datos[i];
                    }
                }
                miDato = MiXLSX.utils.json_to_sheet([],{header : this.printerHeads});  // https://docs.sheetjs.com
                nomArch = "Impresoras" + nomArch;
            }
            MiXLSX.utils.sheet_add_json(miDato,this.datosmios,{
              skipHeader:true, origin : "A2"});
            const LibroTrabajo = MiXLSX.utils.book_new();
            MiXLSX.utils.book_append_sheet(LibroTrabajo, miDato, this.seleccionado);
            nomArch += ".xlsx";
            MiXLSX.writeFile(LibroTrabajo, nomArch);
            return JSON.parse(localStorage.isAdmin);
        },
        previewFile(event) {
            this.file = event.target.files[0]
            // eslint-disable-next-line
            console.log(this.file.name)
            this.$refs.file.innerText = this.file.name
        },  
        cargaMasiva() {
            Swal.fire({
                title: '¿Está seguro de querer subir nuevos equipos?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then(result => {
                if (result.value) {
                    this.spinner = true
                    let formData = new FormData()
                    formData.append('cargaMasiva', this.file)
                    axios
                        .post(`${config.api}/upload`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                token: window.localStorage.getItem('token'),
                            },
                        })
                        .then(res => {
                            this.spinner = false
                            Swal.fire({
                                title:
                                    'Se cargaron los equipos correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            })
                            // eslint-disable-next-line
                            console.log(res)
                        })
                        .catch(err => {
                            this.spinner = false
                            Swal.fire({
                                title: 'Hubo un error al subir los equipos',
                                icon: 'warning',
                                confirmButtonText: 'Aceptar',
                            })
                            // eslint-disable-next-line
                            console.log(err)
                        })
                }
            })
            MiXLSX.utils.book_append_sheet(LibroTrabajo, miDato, nomArch);
            MiXLSX.writeFile(LibroTrabajo, nomArch + ".xlsx");
            console.log("Terminado");
        },
        buscaValor(){
            this.seleccionado = document.getElementById("tipo").value;
            console.log(this.seleccionado);
        },
        extraeInventario(){
            this.miNoInventario = document.getElementById("Inventario").value;
            console.log(this.miNoInventario);
        },
    },
}
</script>

<style scoped>
.header-f {
    background-color: #bb8800;
}
.t-hov:hover {
    cursor: pointer;
}
#footer {
    bottom: 0px;
    position: absolute;
    width: 100%;
}
.separador {
    width: 100%;
    background: #2e5795;
    height: 1rem;
}

.contenedor-footer {
    width: 100%;
}
.cont-text-foo {
    font-size: 12px;
}
footer {
    background: #1b3d70;
}

#myTableStyle {
    max-height: 350px;
    font-size: 14px;
}

.black {
    background-color: black;
}

.red {
    background-color: red;
}
</style>
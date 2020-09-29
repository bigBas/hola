<template>
  <div class="container mt-5 justify-content-center">
    <b-overlay :show="page"
        variant="transparent"
        opacity="1"
        blur="5px"
        no-wrap
        spinner-variant="primary"
        rounded="lg"
        >
      </b-overlay>

    <b-modal id="session" ref="" hide-footer hide-header>
            <div class="d-block text-center">
                <h3>La sesión ha caducado</h3>
            </div>
            <b-button class="mt-3" variant="primary" block @click="$router.replace('/login')">¡Llévame al login!</b-button>
        </b-modal>

    <div v-if="loading" class="container text-center p-5">
      <b-spinner variant="primary" label="Spinning" class="m-4 p-5"></b-spinner>
    </div>
  
    <div v-else class="d-flex flex-column">       
      
      <h1 class="text-center">Agregar impresora</h1>

      <h4 class="text-left container-fluid mt-4 pt-2 px-0">
            Añadir impresoras desde archivo excel
        </h4>
        <div
            class="d-flex justify-content-start input-group mb-3"
        >
        <b-input-group-append class="py-2 sel-form-add">

          <b-form-file
          v-model="file"
          placeholder="Seleccione un excel a cargar..."
          drop-placeholder="Drop file here..."
          browse-text="Seleccionar"
          >
          </b-form-file>
          <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="inputGroupFileAddon04"
            v-on:click="cargaMasiva"
          >
          Subir
          </button>
          </div>
        </b-input-group-append>
        </div>

      <h3 class="text-left mt-4">Datos generales:</h3>
        
      <form
        class="mb-5 form-add-user pl-0"
        enctype="multipart/form-data"
      >
        <input
        v-model="printer.noInventario"
          type="text"
          class="pb-2 my-4"
          placeholder="Número de inventario:"
        /> 
          
        <input
        v-model="printer.noResguardo"
          type="text"
          class="pb-2 my-4"
          placeholder="Número de resguardo:"
        /> 

        <!-- <input
        v-model=""
          type="text"
          class="pb-2 my-4"
          placeholder="Nombre del responsable:"
        /> -->

        <b-select class="py-2 my-4 sel-form-add"
        v-model="printer.idUnidadResponsable"
        :options="respuesta.unidades"
        value-field="idUnidadResponsable"
        text-field="uResponsable">
          <template v-slot:first>
            <b-select-option :value="null" disabled>Unidad Responsable:</b-select-option>
          </template>
        </b-select>

        <b-select class="py-2 my-4 sel-form-add"
        v-model="printer.idUbicacion"
        :options="respuesta.ubicaciones"
        value-field="idUbicacion"
        text-field="ubicacion"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Ubicación:</b-select-option>
          </template>
        </b-select>

        <b-select class="py-2 my-4 sel-form-add"
        v-model="printer.idUso"
        :options="respuesta.usos"
        value-field="idUso"
        text-field="uso"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Uso:</b-select-option>
          </template>
        </b-select>
      </form>

    <div>
        <h3>Impresora</h3> 

        

      <form
        class="mb-5 form-add-user pl-0"
        enctype="multipart/form-data"
      >

        <b-select class="py-2 my-4 sel-form-add"
        v-model="printer.idTipo"
        :options="respuesta.tipos"
        value-field="idTipo"
        text-field="tipo"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Tipo de impresora:</b-select-option>
          </template>
        </b-select>

        <b-select class="py-2 my-4 sel-form-add"
        v-model="printer.idMarca"
        :options="respuesta.marcas"
        value-field="idMarca"
        text-field="marca"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Marca:</b-select-option>
          </template>
        </b-select>

        <input
        v-model="printer.modelo"
          type="text"
          class="pb-2 my-4"
          placeholder="Modelo:"
        /> 

        <input
        v-model="printer.noSerie"
          type="text"
          class="pb-2 my-4"
          placeholder="Número de serie:"
        />

        <b-textarea
          v-model="printer.descripcion"
          class="pb-2 my-4 sel-form-add"
          placeholder="Descripcion adicional:"
          rows="3"
          no-resize
        ></b-textarea>

      </form>

      </div>
        <div class="">
          <button
            class="btn btn-lg btn-primary mr-4"
            @click="$router.push('./user')"
          >
            Regresar
          </button>
          <button
            class="btn btn-lg btn-success"
            @click.prevent="addEquip()"  
          >
            Añadir
          </button>

        </div>
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
import Swal from 'sweetalert2'
import axios from 'axios';
import config from '../config/config';

export default {
  data() {
    return {
      page: false,
      file: null,
      loading: true,
      printer: {
        noInventario: null,
        noResguardo: null,
        // nombreResponsable: null,
        idUnidadResponsable: null,
        idUbicacion: null,
        idUso: null,
        idTipo: null,
        modelo: null,
        idMarca: null,
        noSerie: null,
        descripcion: null
      },
      respuesta: []
    }
  },
  created() {
    this.getAll();
  },
  methods: {
    addEquip() {
      const data = this.printer;
        Swal.fire({
        title: '¿Está seguro de querer añadir esta impresora?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
      })
      .then((result) => {
        if (result.value) {
          axios
          .post(`${config.api}/api/addPrinter`, data, {
            headers: {
              token: localStorage.token
            }
          })
          .then(() => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Impresora agregada correctamente.',
              icon: 'success'
            })
            Object.keys(this.printer).forEach(key => this.printer[key] = null);
          })
          .catch((error) => {
            if(error.response.status === 409) {
                    localStorage.clear();
                    this.$bvModal.show('session');
                }
            else Swal.fire({
                  title: '¡Error!',
                  text: 'No se pudo agregar la impresora al inventario.',
                  icon: 'error'
                });
          })
        }
      })
    },
    getAll() {
      this.loading = true;
      this.respuesta = [];
      axios
      .get(`${config.api}/api/addPrinter`, {
        headers: {
          token: localStorage.token
        }
      })
      .then((res) => {
        this.respuesta = res.data;
        this.loading = false;
      })
      .catch(error => {
        if(error.response.status === 409) {
            localStorage.clear();
            this.$bvModal.show('session');
        }
      });
    },
    cargaMasiva() {
            if(!this.file)
                return Swal.fire({
                        title: 'Primero seleccione un archivo.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                        });

            Swal.fire({
                title: '¿Está seguro de querer subir nuevas impresoras?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then(result => {
                if (result.value) {
                    this.page = true;
                    let formData = new FormData()
                    formData.append('printers', this.file)
                    axios
                        .post(`${config.api}/upload/printers`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                token: window.localStorage.getItem('token'),
                            },
                        })
                        .then(() => {
                            this.page = false;
                            Swal.fire({
                                title:
                                    'Se cargaron los equipos correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            })
                            // eslint-disable-next-line
                        })
                        .catch(error => {
                            this.page = false;
                            if (error.response) {
                                if(error.response.status === 500)
                                    Swal.fire({
                                        title: 'Hubo un error al subir las impresoras',
                                        icon: 'warning',
                                        confirmButtonText: 'Aceptar',
                                    })
                            }
                            // eslint-disable-next-line
                        })
                }
            })
        },
  },
}
</script>

<style scoped>
select {
    padding: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    display: block;
    margin: 30px 0;
    padding: 10px 50px 10px 10px;
    background: url('../img/select-triangle.png') no-repeat 97% center !important;
    background-color: #5c9cd8 !important;
    cursor: pointer;
    color: #fff;
    border-radius: 2px;
    border: none;
    background-size: 12px !important;
}

.form-add-user input[type='text'],
.form-add-user input[type='email'],
.form-add-user input[type='date'] {
    text-align: left;
    width: 60%;
    border: none;
    border-bottom: 1.5px solid #000;
    background-color: transparent;
}

.form-add-user input[type='text']:focus {
    outline-color: transparent;
}

.sel-form-add {
  width: 60%;
}

#footer {
    bottom: 0px;
    position: absolute;
    width: 100%;
}

.custom-file-input:lang(es) ~ .custom-file-label::after {
  content: 'Buscar';
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
@media (max-width: 577px) {
    .form-add-user input[type='text'],
    .form-add-user input[type='email'],
    .form-add-user input[type='date'],
    .sel-form-add{
        width: 100%;
    }
}

@media (min-width: 578px) and (max-width: 980px) {
    .form-add-user input[type='text'],
    .form-add-user input[type='email'],
    .form-add-user input[type='date'],
    .sel-form-add{
        width: 75%;
    }
}
</style>
<template>
  <div class="container mt-5">
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
      <h1 class="text-center">Agregar equipo</h1>

      <h4 class="text-left container-fluid mt-4 pt-2 px-0">
            Añadir equipos desde archivo excel
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
          v-model.number="equipo.noInventario"
          type="text"
          class="pb-2 my-4"
          placeholder="Número de inventario:"
        />

        <input
        v-model="equipo.noResguardo"
          type="text"
          class="pb-2 my-4"
          placeholder="Número de resguardo:"
        />

        <b-select class="py-2 my-4 sel-form-add"
        v-model="equipo.idUnidadResponsable"
        :options="respuesta.unidades"
        value-field="idUnidadResponsable"
        text-field="uResponsable">
          <template v-slot:first>
            <b-select-option :value="null" disabled>Unidad Responsable:</b-select-option>
          </template>
        </b-select>

        <b-select class="py-2 my-4 sel-form-add"
        v-model="equipo.idUbicacion"
        :options="respuesta.ubicaciones"
        value-field="idUbicacion"
        text-field="ubicacion"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Ubicación:</b-select-option>
          </template>
        </b-select>

        <b-select class="py-2 my-4 sel-form-add"
        v-model="equipo.idUso"
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
        <h3>Computadora</h3>

      <form
        class="mb-5 form-add-user pl-0"
        enctype="multipart/form-data"
      >

        <b-select class="py-2 my-4 sel-form-add"
        v-model="equipo.idActivoFijo"
        :options="respuesta.activosFijos"
        value-field="idActivoFijo"
        text-field="activoFijo"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Tipo de equipo:</b-select-option>
          </template>
        </b-select>

        <input
        v-model="equipo.modelo"
          type="text"
          class="pb-2 my-4"
          placeholder="Modelo:"
        />
        <b-select class="py-2 my-4 sel-form-add"
        v-model="equipo.idMarca"
        :options="respuesta.marcas"
        value-field="idMarca"
        text-field="marca"        
        >
          <template v-slot:first>
            <b-select-option :value="null" disable>Marca:</b-select-option>
          </template>
        </b-select>
        <input
        v-model="equipo.noSerie"
          type="text"
          class="pb-2 my-4"
          placeholder="Número de serie:"
        />
        <input
        v-model="equipo.procesador"
          type="text"
          class="pb-2 my-4"
          placeholder="Procesador:"
        />
        <input
        v-model="equipo.vProcesador"
          type="text"
          class="pb-2 my-4"
          placeholder="Velocidad del procesador en MHz:"
        />
        <input
        v-model="equipo.hdd"
          type="text"
          class="pb-2 my-4"
          placeholder="Memoria ROM en GB:"
        />
        <input
        v-model="equipo.memoriasz"
          type="text"
          class="pb-2 my-4"
          placeholder="Memoria RAM en MB:"
        />
        <input
        v-model="equipo.memoria"
          type="text"
          class="pb-2 my-4"
          placeholder="Tipo de memoria:"
        />
        <input
        v-model="equipo.vMemoria"
          type="text"
          class="pb-2 my-4"
          placeholder="Velocidad de memoria en MHz:"
        />
        <input
          v-model="equipo.graficos"
          type="text"
          class="pb-2 my-4"
          placeholder="Gráficos:"
        />
        <b-select class="py-2 my-4 sel-form-add"
        v-model="equipo.idOS"
        :options="respuesta.distros"
        value-field="idOS"
        text-field="osname"
        >
          <template v-slot:first>
            <b-select-option :value="null" disabled>Sistema Operativo:</b-select-option>
          </template>
        </b-select>
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
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config/config';

export default {
  data() {
    return {
      loading: null,
      file: null,
      page: false,
      equipo: {
        noInventario: null,
        noResguardo: null,
        // nombreResponsable: null,
        idUnidadResponsable: null,
        idUbicacion: null,
        idUso: null,
        idActivoFijo: null,
        modelo: null,
        idMarca: null,
        noSerie: null,
        procesador: null,
        vProcesador: null,
        hdd: null,
        idOS: null,
        memoriasz: null,
        memoria: null,
        vMemoria: null,
        graficos: null
      },
      respuesta: []
    }
  },
  created() {
    this.getAll();
  },
  methods: {
    addEquip() {
      const data = this.equipo;
        Swal.fire({
        title: '¿Está seguro de querer añadir este equipo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          axios
          .post(`${config.api}/api/AddEquip`, data, {
            headers: {
              token: localStorage.token
            }
          })
          .then(() => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Equipo agregado correctamente.',
              icon: 'success'
            })
          Object.keys(this.equipo).forEach(key => this.equipo[key] = null);
          })
          .catch((error) => {
            if(error.response.status === 409) {
                    localStorage.clear();
                    this.$bvModal.show('session');
                }
            else Swal.fire({
                  title: '¡Error!',
                  text: 'No se pudo agregar el equipo al inventario.',
                  icon: 'error'
                });
          })
        }
      })
    },

    getAll() {
      this.loading = true;
      axios
      .get(`${config.api}/api/addEquip`, {
        headers: {
          token: localStorage.token
        }
      })
      .then((res) => {
        // console.log();
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

    // previewFile(event) {
    //         this.file = event.target.files[0]
    //         // eslint-disable-next-line
    //         this.$refs.file.innerText = this.file.name
    //     },  
        cargaMasiva() {
            if(!this.file)
                return Swal.fire({
                        title: 'Primero seleccione un archivo.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                        });

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
                    this.page = true;
                    let formData = new FormData()
                    formData.append('equipos', this.file)
                    axios
                        .post(`${config.api}/upload/equips`, formData, {
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
                                        title: 'Hubo un error al subir los equipos',
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
.custom-file-input:lang(es) ~ .custom-file-label::after {
  content: 'Buscar';
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
<template>
  <div class="container mt-5">

    <b-modal id="session" ref="" hide-footer hide-header>
            <div class="d-block text-center">
                <h3>La sesión ha caducado</h3>
            </div>
            <b-button class="mt-3" variant="primary" block @click="$router.replace('/login')">¡Llévame al login!</b-button>
        </b-modal>
    
    <b-modal id="status" ref="" hide-footer hide-header>
            <div class="d-block text-center">
                <h3>Error.</h3>
                <br>
                <h6>Regrese y seleccione una fila para editar los campos.</h6>
            </div>
            <b-button class="mt-3" variant="primary" block @click="$router.replace('/user')">Regresar al inicio.</b-button>
        </b-modal>

    <div v-if="loading" class="container text-center p-5">
      <b-spinner variant="primary" label="Spinning" class="m-4 p-5"></b-spinner>
    </div>
  
    <div v-else class="d-flex flex-column">           
        <h1 class="text-center">Editar información la impresora</h1>

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
        v-model="equipo."
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
                    class="btn btn-lg btn-primary"
                    @click="$router.push('./user')"
                >
                  Regresar
                </button>
                <button
                  class="btn btn-lg btn-danger mx-3"
                  @click.prevent="deletePrinter(printer.noInventario)"  
                >
                  Eliminar
                </button>
                <button
                  class="btn btn-lg btn-success mt-3 mt-sm-0"
                  @click.prevent="saveChanges()"  
                >
                  Guardar cambios
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
import axios from 'axios'
import config from '../config/config'

export default {
  data() {
    return {
      loading: true,
      status: null,
      printer: {},
      respuesta: {}
    }
  },
  created() {
    this.getPrinter();
  },
  methods: {
    getPrinter(){
      const params = { noInventario: localStorage.noInventario };
      this.loading = true;
      axios
      .get(`${config.api}/api/updatePrinter`, {
        params,
        headers: {
          token: localStorage.token
        }
      })
      .then( res => {
        this.printer = res.data.printer[0];
        this.getAll();
        this.loading = false;
      })
      .catch(error => {
        if(error.response.status === 409) {
          localStorage.clear();
          this.$bvModal.show('session');
        }
        if(error.response.status === 500)
          this.$bvModal.show('status');
      });
    },
    getAll() {
      this.loading = true;
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
    saveChanges() {
        Swal.fire({
        title: '¿Está seguro de querer guardar los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          axios
          .put(`${ config.api }/api/updatePrinter`, this.printer, {
            headers: {
              token: localStorage.token
            }
          })
          .then(() => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Impresora actualizada con éxito.',
              icon: 'success'
            })
          })
          .catch(error => {
            if(error.response.status === 409) {
                    localStorage.clear();
                    this.$bvModal.show('session');
                }
            else Swal.fire({
                  title: '¡Error!',
                  text: 'No se pudo actualizar la impresora en el inventario.',
                  icon: 'error'
                });
                console.log(error);
          })
        }
      })
    },
    deletePrinter(noInventario) {
        Swal.fire({
        title: '¿Está seguro de querer eliminar esta impresora?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          axios
          .delete(`${ config.api }/api/updatePrinter`, {
            data: {
              noInventario
            }
          }, {
            headers: {
              token: localStorage.token
            }
          })
          .then(() => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Impresora eliminada con éxito.',
              icon: 'success'
            })
            localStorage.removeItem('noInventario');
            this.$router.replace('/user');
          })
          .catch(error => {
            if(error.response.status === 409) {
                    localStorage.clear();
                    this.$bvModal.show('session');
                }
            else Swal.fire({
                  title: '¡Error!',
                  text: 'No se pudo actualizar la impresora en el inventario.',
                  icon: 'error'
                });
          })
        }
      })
    }
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
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
        <h1 class="text-center">Editar información del equipo</h1>

        <h3 class="text-left mt-4">Datos generales:</h3>
                
      <form
        class="mb-5 form-add-user pl-0"
        enctype="multipart/form-data"
      >
        <input
        v-model="equipo.noInventario"
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

        <!-- <input
        v-model="equipo."
          type="text"
          class="pb-2 my-4"
          placeholder="Nombre del responsable:"
        /> -->

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
                    class="btn btn-lg btn-primary"
                    @click="$router.push('./user')"
                >
                  Regresar
                </button>
                <button
                  class="btn btn-lg btn-danger mx-3"
                  @click.prevent="deleteEquip(equipo.noInventario)"  
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
      equipo: {},
      respuesta: {}
    }
  },
  created() {
    this.getEquipo();
  },
  methods: {
    getEquipo(){
      const params = { noInventario: localStorage.noInventario };
      this.loading = true;
      axios
      .get(`${config.api}/api/updateEquip`, {
        params,
        headers: {
          token: localStorage.token
        }
      })
      .then( res => {
        this.equipo = res.data.equipo[0];
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
      .get(`${config.api}/api/addEquip`, {
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
          .put(`${ config.api }/api/updateEquip`, this.equipo, {
            headers: {
              token: localStorage.token
            }
          })
          .then(() => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Equipo actualizado con éxito.',
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
                  text: 'No se pudo actualizar el equipo en el inventario.',
                  icon: 'error'
                });
          })
        }
      })
    },
    deleteEquip(noInventario) {
        Swal.fire({
        title: '¿Está seguro de querer eliminar este equipo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          axios
          .delete(`${ config.api }/api/updateEquip`, {
            headers: {
              token: localStorage.token
            },
            data: {
              noInventario
            }
          })
          .then(() => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Equipo eliminado con éxito.',
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
                  text: 'No se pudo actualizar el equipo en el inventario.',
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
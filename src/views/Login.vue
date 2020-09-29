<template>
    <div class="container cont-log-things">
        <h1 class="serv-title text-center">Sistema de censo</h1>

        <div
            class="input-group mb-3 col-12 col-sm-9 col-md-8 col-lg-5 my-4 mx-auto"
        >
            <div class="input-group-prepend px-auto gp-inp">
                <span class="input-group-text icon-login-form pl-3 pr-0">
                    <font-awesome-icon icon="user" class="user-icon-input" />
                </span>
            </div>
            <input
                type="email"
                v-on:keyup.enter="onLogin()"
                v-model="name"
                class="form-control input-login-form shadow-none py-4"
                placeholder="Usuario"
            />
        </div>

        <div class="input-group mb-3 col-12 col-sm-9 col-md-8 col-lg-5 my-auto mx-auto">
            
            <div class="input-group-prepend px-auto gp-inp">
                <span class="input-group-text icon-login-form pl-3 pr-0">
                    <font-awesome-icon icon="lock" class="user-icon-input" />
                </span>
            </div>
            
            <input
                type="password"
                v-on:keyup.enter="onLogin()"
                v-model="password"
                class="form-control input-login-form shadow-none py-4"
                placeholder="Contraseña"
            />
        
        </div>

        <div class="d-flex justify-content-center">
            <button
                v-on:click="onLogin()"
                class="btn btn-success btn-login mt-4"
            >
                Iniciar Sesión
            </button>
        </div>

        <div
            class="alert alert-danger mt-4 mx-auto text-center"
            style="display: none; width:80%"
            id="alertErr"
            role="alert"
        >
            Usuario o contraseña incorrectos.
        </div>
    </div>
</template>

<script>
import config from "../config/config";
import axios from "axios";

 export default {
   data() {
     return {
        name: '',
        password: '',
     };
   },
   methods: {
     onLogin() {
            /* eslint-disable no-console */

            const data = {
                name: this.name,
                password: this.password,
            }

            axios
                .post(`${config.api}/login`, data)
                .then(res => {
                    if (res.status == 200) {
                        
                            localStorage.setItem('isAdmin', (res.data.user.isAdmin));
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('user', res.data.user.userName);
                            localStorage.setItem(
                                'idAdmin',
                                res.data.user.idAdmin
                            );
                            this.$router.replace('/user');
                        
                    }
                })
                .catch(function(err) {
                    var alertErr = document.getElementById('alertErr')
                    alertErr.style.display = 'block'
                })
        },
   },
 };


</script>

<style scoped>
.btn-login {
    width: 170px;
    height: 45px;
}
.input-login-form {
    border: 0;
    border-top: 1px solid #bdbdbd;
    border-right: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    height: 40px;
    padding-left: 10px;
    outline: 0;
}

.icon-login-form {
    border: 0;
    border-top: 1px solid #bdbdbd;
    border-left: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    width: 40px;
    background-color: #fff;
    color: #bdbdbd;
}

.cont-log-things {
    padding: 30px;
    margin-top: 15px;
}
@media (max-width: 350px) {
    .serv-title text-center {
        font-size: 25px;
    }
}
</style>

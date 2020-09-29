<template>
    <header id="iniLetter">
        <div class="container-fluid header-h">
            <div class="col-4 offset-1 d-inline-flex p-0 align-items-center">
                <a href="https://www.unam.mx/"
                    ><img
                        src="../img/Logo-UNAM.png"
                        class="img-fluid"
                        alt="Logo UNAM"
                /></a>
            </div>
            <div
                class="col-4  offset-2 d-inline-flex justify-content-end p-0 align-items-center"
            >
                <a href="http://www.acatlan.unam.mx/">
                    <img
                        src="../img/logo_fesa.png"
                        class="img-fluid"
                        alt="Logo Fes Acatlán"
                    />
                </a>
            </div>
        </div>
        
        <div
            class="header-f"
            v-if="!['login'].includes($route.name)"
        >
        
            <div class="container d-flex justify-content-between py-0 my-2">
                
                <div class="d-flex">
                    <font-awesome-icon v-if="!['login'].includes($route.name)" icon="home" class="my-auto text-white" style="cursor:pointer" @click="$router.push('user')"/>
                    
                    <div class="d-flex align-items-center mx-4">
                        <font-awesome-icon icon="user" v-if="!!setCurrentUser()" class="my-auto mr-2 text-white" />
                        <span class="text-white my-auto" v-text="setCurrentUser()">
                        </span>
                    </div>
                    <div v-if="isAdmin()"> 
                        <!-- <router-link to="login" class="text-white align-middle">Añadir equipo</router-link> -->
                        <b-dropdown id="dropdown-left" text="Añadir " variant="info" class="">
                            <b-dropdown-item @click="$router.push('addEquip')">Equipo</b-dropdown-item>
                            <b-dropdown-item @click="$router.push('addPrinter')">Impresora</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                <div class="my-auto">
                    <span
                        class="btn btn-danger" style="font-family: Arial:none;"
                        v-on:click="logout()"
                    >
                        Cerrar sesión
                    </span>
                </div>
            </div>

        </div>

    </header>
</template>

<script>

export default {
    data() {
        return {
            user: null
        }
    },
    methods: {
        setCurrentUser(){
            return window.localStorage.user;
        },
        logout: function() {
            localStorage.clear();
            this.$router.replace('/login')
        },
        isAdmin: function()  {
            return JSON.parse(localStorage.getItem('isAdmin'));
        }
    }
}

</script>
<style scoped>
.header-h {
    /* background: #1b3d70; */
    background: #1b3d70;
    padding: 1rem 0;
}

.contenedor-header {
    padding: 1rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.contenedor-img {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.contenedor-img img {
    max-width: 100%;
}

.header-f {
    padding: 0.1rem 0;
    background-color: #bb8800;

}
#info {
    color: white;
}
.sesion {
    margin: 0.5rem;
    line-height: 0.5rem !important;
}
</style>

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './views/Login.vue'
import User from './views/User.vue'
import AddEquip from './views/AddEquip.vue'
import AddPrinter from './views/AddPrinter.vue'
import UpdateEquip from './views/UpdateEquip.vue'
import UpdatePrinter from './views/UpdatePrinter.vue'


const routes = [{
        path: '*',
        redirect: 'login'
    },
    {
        path: '/',
        name: 'root',
        redirect: 'login'
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: { isPublic: true },
        beforeEnter: (to, from, next) => {
            if (isAuthenticated())
                next('/user');
            else
                next();
        }
    },
    {
        path: '/user',
        component: User,
        name: 'user',
        meta: { isPublic: true },
        beforeEnter: (to, from, next) => {
            if (isAuthenticated())
                next(true);
            else
                next(false);
        }
    },
    {
        path: '/addEquip',
        component: AddEquip,
        name: 'addEquip',
        meta: { perm: true },
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated())
                next('/login');
            else if (isAuthenticated() && !isAdmin())
                next(false)
            else
                next(true);
        }
    },
    {
        path: '/addPrinter',
        component: AddPrinter,
        name: 'addPrinter',
        meta: { perm: true },
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated())
                next('/login');
            else if (isAuthenticated() && !isAdmin())
                next(false)
            else
                next(true);
        }
    },
    {
        path: '/updateEquip',
        component: UpdateEquip,
        name: 'updateEquip',
        meta: { perm: true },
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated())
                next('/login');
            else if (isAuthenticated() && !isAdmin())
                next(false)
            else
                next(true);
        }
    },
    {
        path: '/updatePrinter',
        component: UpdatePrinter,
        name: 'updatePrinter',
        meta: { perm: true },
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated())
                next('/login');
            else if (isAuthenticated() && !isAdmin())
                next(false)
            else
                next(true);
        }
    },
]

Vue.use(VueRouter)
    /* Produccción */
    // const router = new VueRouter({mode: 'history', routes})
    /* Pruebas */
const router = new VueRouter({ routes })

const isAuthenticated = function() {
    return !!window.localStorage.token
}

const isAdmin = function() {
    return JSON.parse(window.localStorage.isAdmin)
}

//const isAdmon = window.localStorage.getItem('rol') ? true : false

/*router.beforeEach((to, from, next) => {

    if (to.path !== '/login' && !isAuthenticated()) {
        // eslint-disable-next-line no-console
        //console.log("Entrando");
        return next({ name: 'login' })
    }

    // eslint-disable-next-line no-console

    if (isAuthenticated() && isAdmin() === false && to.path !== '/user') {
        return next({ name: 'user' })
    }

    return next()
})*/

export default router;
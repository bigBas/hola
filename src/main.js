import Vue from 'vue'
import App from './App.vue'
import router from './routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faUser,
    faLock,
    faGraduationCap,
    faExternalLinkAlt,
    faKey,
    faExclamationCircle,
    faEnvelope,
    faHome
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faUser)
library.add(faLock)
library.add(faExternalLinkAlt)
library.add(faGraduationCap)
library.add(faExclamationCircle)
library.add(faKey)
library.add(faEnvelope)
library.add(faHome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// el: '#app',
new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
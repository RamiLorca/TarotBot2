import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { VueSpinners } from '@saeris/vue-spinners';

Vue.use(Vuetify);
Vue.use(VueSpinners);

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    }
});
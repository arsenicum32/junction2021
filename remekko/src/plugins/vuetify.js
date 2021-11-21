import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      closet: {component: require('../assets/icons/chat.svg?inline')},
    },
  },
});

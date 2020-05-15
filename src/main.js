import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false

// firebase.initializeApp({
//     apiKey: "AIzaSyC2fgMCIX3aVm60Et3iQpmhOE-sPyYT9Gw",
//     authDomain: "ifl-online-examination.firebaseapp.com",
//     databaseURL: "https://ifl-online-examination.firebaseio.com",
//     projectId: "ifl-online-examination",
//     storageBucket: "ifl-online-examination.appspot.com",
//     messagingSenderId: "691349599037",
//     appId: "1:691349599037:web:4c039d0070c0b9b9760b54"
// })

// export const db = firebase.firestore();
Vue.use(firestorePlugin);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

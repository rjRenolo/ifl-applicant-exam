<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list dense class="text-center">
        <v-list-item-content>
          <v-list-item-title class="title white--text">HR Dashboard</v-list-item-title>
          <v-list-item-subtitle class="white--text">Hi 👋 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list>
      <v-list style="background:#1976d2 !important" shaped>
        <!-- <v-subheader class="white--text">HR Dashboard</v-subheader> -->
        <v-list-item-group >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="white--text"
            router
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon class="white--text">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text" @click="logMeOut()">Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon v-if="isAuth" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        
        
      </div>
     

        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <h1 class="font-weight-light" style="font-size:1.4em">iFormatLogic I.T. Solutions</h1>

      <v-spacer></v-spacer>

       
      
    </v-app-bar>

    

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    isAuthenticated: true,
    items: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', route: '/dashboard' },
        { text: 'Exam Settings', icon: 'mdi-file-document-edit-outline', route: '/exam-settings'},
        // { text: 'Conversions', icon: 'mdi-flag' },
      ],
  }),
  methods : {
    logMeOut() {
      this.$store.commit('SET_LOGGED_IN', false)
      this.$router.push({name:'Home'})
    }
  },
  computed: {
    // get the getters 
    isAuth() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

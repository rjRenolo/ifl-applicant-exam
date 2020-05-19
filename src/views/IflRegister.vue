<template>
  <v-container>
    <v-row dense justify="center" align="center">
      <v-col style="display:flex; flex-flow:column; justify-content:center; align-items:center">
        <v-row>
        <img alt="Vue logo" src="../assets/logo.png">
        </v-row>
        <v-row>
          <span class="display-2 blue--text mb-8">Hello, 👋</span>
        </v-row>
        <v-row>
        <v-card style="display:flex; align-items:center; justify-content:center; flex-flow:column; padding: 24px 64px; width:600px">
          <v-form ref="form" v-model="valid">
            <v-row dense>
            <v-col cols="12">
              <v-text-field type="email" v-model="form.email" 
              :rules="emailRules" 
              label="Email" required></v-text-field>
            </v-col>
            <v-col cols="12">
            <v-text-field v-model="form.password" 
                :rules="[() => !!form.password || 'Password is required.']"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                label="Passowrd"
                required
            ></v-text-field>
             </v-col>
            <v-col cols="12">
            <v-text-field v-model="Cpassword" 
                :rules="[() => !!Cpassword || 'Password is required.',
                  () => Cpassword === form.password || 'Password didn\'t match'
                ]"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                label="Passowrd"
                required
            ></v-text-field>
             </v-col>
            </v-row>
          </v-form>
          <v-btn color="primary" :disabled="!valid" @click="submit()">
            Register
            <v-progress-circular v-if="loading"
              indeterminate
              color="green"
            ></v-progress-circular>
            </v-btn>
        </v-card>
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>


<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name:'IflRegister',
  data() {
    return {
      valid:false,
      loading:false,
      Cpassword:"",
      showPass:false,
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      this.loading = true
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              // store.dispatch("fetchUser", user);
              this.$store.commit('SET_LOGGED_IN', true)
              this.$router.push({name: 'Dashboard'})
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
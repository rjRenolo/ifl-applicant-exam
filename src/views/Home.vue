<template>
  <v-container>
    <v-row dense justify="center" align="center">
      <v-col style="display:flex; flex-flow:column; justify-content:center; align-items:center">
        <v-row>
          <img alt="Vue logo" src="../assets/logo.png" />
        </v-row>
        <v-row>
          <span class="display-2 blue--text mb-8">Hello, 👋</span>
        </v-row>
        <v-row>
          <v-card
            style="display:flex; align-items:center; justify-content:center; flex-flow:column; padding: 24px 64px"
          >
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="examId"
                :rules="[() => !!examId || 'This field is required.']"
                label="Enter Your Exam ID"
                required
              ></v-text-field>
            </v-form>
            <v-btn color="primary" :disabled="!valid" @click="accessExam()">
              Access Exam
              <v-progress-circular v-if="loading" indeterminate color="white"></v-progress-circular>
            </v-btn>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="error" :timeout="timeout">
      Something went wrong.
      <br />Make sure your Exam ID is correct.
      <v-btn color="white" text @click="snackbar = false">Or try reloading this Page.</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { db } from "../db";

export default {
  name: "Home",
  data() {
    return {
      examId: null,
      valid: false,
      loading: false,
      snackbar: false,
      timeout: 5000
    };
  },
  methods: {
    refreshPage() {
      location.reload();
    },
    accessExam() {
      console.log("submit");
      this.loading = true;
      const id = this.examId;
      db.collection("applicants")
        .doc(id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          if (!snapshot.data()) {
            // error please try again
            console.log("error");
            this.snackbar = true;
            this.loading = false;
          } else {
            this.$store.commit("SET_APPLICANT_INFO", snapshot.data());

            this.$store.commit("SET_APPLICANT_ID", snapshot.id);
            console.log("submit", snapshot.data());
            this.loading = false;
            this.$router.replace({ name: "Exam" });
          }
        })
        .catch(error => {
          this.snackbar = true;
          this.loading = false;
          console.log(error);
        });
    }
  },
  created() {
    // console.log(this.$store.getters.getApplicantInfo);
    if (this.$store.getters.getApplicantInfo) {
      this.$router.replace({ name: "Exam" });
    }
  }
};
</script>

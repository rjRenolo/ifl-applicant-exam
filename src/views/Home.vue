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
        <v-card style="display:flex; align-items:center; justify-content:center; flex-flow:column; padding: 24px 64px">
          <v-form ref="form">
            <v-text-field v-model="examId" 
            :rules="[() => !!examId || 'This field is required.']" 
            label="Enter Your Exam ID" required></v-text-field>
          </v-form>
          <v-btn color="primary">Access Exam</v-btn>
        </v-card>
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return{
      examId :null
    }
  }
}
</script>

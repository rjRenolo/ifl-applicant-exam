<template>
  <v-container>
      Enlish
  </v-container>
</template>

<script>
import {db} from '../db';
export default {
    name:'English',
    data() {
      return {
        questions : null
      }
    },
    firestore(){
      return {
        questions : db.collection("exam").doc('english')
      }
    }
}
</script>

<style>

</style>
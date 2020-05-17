<template>
  <v-container>
      <v-form ref="form" v-model="valid"  >
      <v-text-field v-model="addQuestion" 
        :rules="[() => !!addQuestion || 'Question is required.']" 
        label="Add Question" required></v-text-field>
      <v-row>
        <v-col cols="3" v-for="(choice, i) in addChoices" :key="i">
          <v-text-field v-model="addChoices[i]" 
          :rules="[() => !!addChoices[i] || 'Choices is required.']" 
          label="Add Choice" required></v-text-field>
        </v-col>
      </v-row>

        <v-text-field v-model="addCorrect" 
        :counter="1"
        :rules="correctAnswerRules" 
        label="Add Correct Answer" required></v-text-field>
 

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
      >
        Add Question
      </v-btn>

    </v-form>

<hr class="mt-8">

      <h3 class="display-1">Question List</h3>
    <v-row>
      <v-list>
        <v-list-group
          v-for="(question, i) in questions.questions"
          :key="question.title"
          v-model="question.active"
          :prepend-icon="question.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{i+1}}. {{question.question}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(subItem, i) in question.choices"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Correct Answer : {{question.correct === 0 ? 'A' : question.correct === 1 ? 'B' : question.correct === 2 ? 'C' : question.correct === 3 ? 'D' : null}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- <p v-for="(question, i) in questions.questions" :key="i">{{question}}asdasdasdasd<br></p> -->
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>

  </v-container>
</template>

<script>
import {db} from '../../db';
export default {
    name:'SettingsEnglish',
    data() {
      return {
        valid:false,
        addQuestion: null,
        addChoices : ["a. ", "b. ", "c. ", "d. "],
        addCorrect : '',
        questions : {},
        correctAnswerRules: [
        v => !!v || 'Correct Answer is required',
        v => v.length <= 1 || 'Correct Answer is required',
        v => (v.includes('a') || v.includes('b') || v.includes('c') || v.includes('d')) || 'Correct Answer is required',
        ],
        snackbar: false,
        text: 'Question Added Succesfully',
        timeout: 2000,
      }
    },
    firestore(){
      return{
        questions : db.collection('exam').doc('english')
      }
    },
    methods :{
      submitQuestion(){
        const ans = this.addCorrect === 'a' ? 0 :this.addCorrect === 'b' ? 1 :this.addCorrect === 'c' ? 2 :this.addCorrect === 'd' ? 3 : null;
        const pushMe = {
          question : this.addQuestion,
          choices : this.addChoices,
          correct : ans
        }
        // console.log(pushMe)
        // console.log(this.questions.questions)
        this.questions.questions.push(pushMe)
        // console.log(this.questions)
        db.collection('exam').doc('english').update({...this.questions})
          .then(() => {
            // console.log('updated')
            this.addQuestion = null
            this.addChoices = ["a. ", "b. ", "c. ", "d. "]
            this.addCorrect = ''
            this.snackbar = true
            this.$refs.form.resetValidation()
          })
          .catch(err => console.log(err))
      }
    }
}
</script>

<style>

</style>
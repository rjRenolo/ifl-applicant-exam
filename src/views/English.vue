<template>
  <div>
    <v-progress-linear v-if="!questions" indeterminate color="cyan"></v-progress-linear>
    <v-container v-else-if="!this.englishDone">
      <!-- <span>
        item : {{this.$store.getters.getAnsweredEnglish.length}}
        <br />out of: 20
      </span>-->

      <span>
        item : {{this.$store.getters.getAnsweredEnglish.length}}
        <br />out of: 20
      </span>
      <span v-if="this.englishDone">DONE</span>
      <!-- <v-row>{{this.questions.questions[0]}}</v-row> -->
      <v-row justify="center">
        <!-- <span class="title" style="text-align:center">{{this.questions.questions[0].question}}</span> -->
        <span class="title" style="text-align:center">{{this.currentQuestion.question}}</span>
      </v-row>
      <v-row justify="center">
        <span class="subtitle-2">Your answer is : {{this.answer}}</span>
      </v-row>
      <v-row justify="center">
        <v-col cols="8" sm="6" md="3" style="display:flex; justify-content:center;">
          <v-btn color="primary" outlined @click="myAnswerIs('a')">
            <span style="color:black !important">{{this.currentQuestion.choices[0]}}</span>
          </v-btn>
        </v-col>
        <v-col cols="8" sm="6" md="3" style="display:flex; justify-content:center;">
          <v-btn color="primary" outlined @click="myAnswerIs('b')">
            <span style="color:black !important">{{this.currentQuestion.choices[1]}}</span>
          </v-btn>
        </v-col>
        <v-col cols="8" sm="6" md="3" style="display:flex; justify-content:center;">
          <v-btn color="primary" outlined @click="myAnswerIs('c')">
            <span style="color:black !important">{{this.currentQuestion.choices[2]}}</span>
          </v-btn>
        </v-col>
        <v-col cols="8" sm="6" md="3" style="display:flex; justify-content:center;">
          <v-btn color="primary" outlined @click="myAnswerIs('d')">
            <span style="color:black !important">{{this.currentQuestion.choices[3]}}</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="primary" :disabled="!answer" @click="answerSubmitted()">Submit Answer</v-btn>
      </v-row>
    </v-container>
    <v-container v-else>
      <span>DONE</span>
    </v-container>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  name: "English",
  data() {
    return {
      loading: false,
      questions: null,
      answer: null,
      currentQuestionIndex: null,
      currentQuestion: {},
      englishDone: false
    };
  },
  firestore() {
    return {
      questions: db.collection("exam").doc("english")
    };
  },
  methods: {
    testMe() {
      console.log(this.questions);
    },
    myAnswerIs(letter) {
      this.answer = letter;
    },
    answerSubmitted() {
      // 0 -> 10
      // check answer
      const checkingAns =
        this.answer === "a"
          ? 0
          : this.answer === "b"
          ? 1
          : this.answer === "c"
          ? 2
          : this.answer === "d"
          ? 3
          : this.answer === "e"
          ? 4
          : null;
      // correct answer
      if (checkingAns === this.currentQuestion.correct) {
        // increment the result in db
        this.$store.commit("CORRECT_ANSWER_INCREMENT");
        db.collection("applicants")
          .doc(this.$store.getters.getApplicantId)
          .update({ resultEnglish: this.$store.getters.getResultEnglish })
          .then(() => {
            this.$store.commit(
              "PUSH_ANSWERED_QUESTION",
              this.currentQuestionIndex
            );
            var flag = true;
            if (this.$store.getters.getAnsweredEnglish.length < 20) {
              while (flag) {
                let randomize = Math.floor(Math.random() * 20);
                if (
                  !this.$store.getters.getAnsweredEnglish.includes(randomize)
                ) {
                  flag = false;
                  this.currentQuestionIndex = randomize;
                  this.currentQuestion = this.questions.questions[
                    this.currentQuestionIndex
                  ];
                }
              }
            } else {
              this.englishDone = true;
            }
            db.collection("applicants")
              .doc(this.$store.getters.getApplicantId)
              .update({
                answeredEnglish: this.$store.getters.getAnsweredEnglish
              });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // nope answer
        this.$store.commit("PUSH_ANSWERED_QUESTION", this.currentQuestionIndex);
        db.collection("applicants")
          .doc(this.$store.getters.getApplicantId)
          .update({ answeredEnglish: this.$store.getters.getAnsweredEnglish });
        var flag = true;
        if (this.$store.getters.getAnsweredEnglish.length < 20) {
          while (flag) {
            let randomize = Math.floor(Math.random() * 20);
            if (!this.$store.getters.getAnsweredEnglish.includes(randomize)) {
              flag = false;
              this.currentQuestionIndex = randomize;
              this.currentQuestion = this.questions.questions[
                this.currentQuestionIndex
              ];
            }
          }
        } else {
          this.englishDone = true;
        }
      }
    }
  },
  created() {},
  watch: {
    questions: function() {
      if (
        !this.currentQuestionIndex &&
        this.$store.getters.getAnsweredEnglish.length < 20
      ) {
        this.currentQuestionIndex = 0;
        if (
          this.$store.getters.getAnsweredEnglish.includes(
            this.currentQuestionIndex
          )
        ) {
          var flag = true;
          while (flag && this.$store.getters.getAnsweredEnglish.length < 20) {
            let randomize = Math.floor(Math.random() * 20);
            if (!this.$store.getters.getAnsweredEnglish.includes(randomize)) {
              flag = false;
              this.currentQuestionIndex = randomize;
              this.currentQuestion = this.questions.questions[
                this.currentQuestionIndex
              ];
              // this.$store.commit("PUSH_ANSWERED_QUESTION", randomize);
            }
          }
        } else {
          this.currentQuestion = this.questions.questions[
            this.currentQuestionIndex
          ];
          // this.$store.commit(
          //   "PUSH_ANSWERED_QUESTION",
          //   this.currentQuestionIndex
          // );
        }
      } else {
        this.englishDone = true;
      }
      // else {
      //   this.currentQuestionIndex = 0;
      //   this.currentQuestion = this.questions.questions[
      //     this.currentQuestionIndex
      //   ];
      //   this.$store.commit("PUSH_ANSWERED_QUESTION", this.currentQuestionIndex);
      // }
    }
  }
};
</script>

<style>
</style>
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    applicant: null,
    applicantId: null,
    reloadFlag:true,
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return state.user.loggedIn;
    },
    getApplicantInfo(state) {
      return state.applicant;
    },
    getApplicantId(state) {
      return state.applicantId;
    },
    getReloadFlag(state){
      return state.reloadFlag
    },
    getExamTimer(state) {
      if(state.applicant) {
        return state.applicant.examTimer;
      }else{
        // console.log('nulled')
      }
    },
    getAnsweredEnglish(state) {
      return state.applicant.answeredEnglish;
    },
    getResultEnglish(state) {
      return state.applicant.resultEnglish;
    },
    getAnsweredMath(state) {
      return state.applicant.answeredMath;
    },
    getResultMath(state) {
      return state.applicant.resultMath;
    }
  },
  mutations: {
    SET_RELOAD_FLAG(state, value){
      state.reloadFlag = value
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    LOG_OUT(state, value) {
      state.user.loggedIn = value;
    },
    SET_APPLICANT_INFO(state, value) {
      state.applicant = value;
    },
    SET_APPLICANT_ID(state, value) {
      state.applicantId = value;
    },
    PUSH_ANSWERED_QUESTION(state, value) {
      state.applicant.answeredEnglish.push(value);
    },
    CORRECT_ANSWER_INCREMENT(state) {
      state.applicant.resultEnglish++;
    },
    PUSH_ANSWERED_QUESTION_MATH(state, value) {
      state.applicant.answeredMath.push(value);
    },
    CORRECT_ANSWER_INCREMENT_MATH(state) {
      state.applicant.resultMath++;
    },
  },
  actions: {
    // fetchUser() {
    //   // commit("SET_LOGGED_IN", user !== null);
    //   // if (user) {
    //   //   commit("SET_USER", {
    //   //     displayName: user.displayName,
    //   //     email: user.email
    //   //   });
    //   // } else {
    //   //   commit("SET_USER", null);
    //   // }
    // }
  },
  modules: {}
});

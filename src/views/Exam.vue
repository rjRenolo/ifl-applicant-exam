<template>
  <v-tabs
    v-model="tab"
    class="elevation-2"
    dark
    :centered="centered"
    grow
    :vertical="vertical"
    :right="right"
    :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
    :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
    :icons-and-text="icons"
  >
    <v-tabs-slider></v-tabs-slider>

    <!-- <v-tab
        v-for="i in tabs"
        :key="i"
        :href="`#tab-${i}`"
        
      >
        Tab {{ i }}
        <v-icon v-if="icons">mdi-phone</v-icon>
    </v-tab>-->
    <v-tab href="#tab-1">
      English
      <v-icon v-if="icons">mdi-phone</v-icon>
    </v-tab>
    <v-tab href="#tab-2">
      Logic / Inductive Reasoning
      <v-icon v-if="icons">mdi-phone</v-icon>
    </v-tab>
    <v-tab href="#tab-3">
      Math
      <v-icon v-if="icons">mdi-phone</v-icon>
    </v-tab>

    <v-tab-item value="tab-1">
      <v-card flat tile>
        <English />
      </v-card>
    </v-tab-item>
    <v-tab-item value="tab-2">
      <v-card flat tile>
        <Logic />
      </v-card>
    </v-tab-item>
    <v-tab-item value="tab-3">
      <v-card flat tile>
        <Mathematics />
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import English from "./English";
import Logic from "./Logic";
import Mathematics from "./Mathematics";
// import { db } from "../db";

export default {
  name: "Exam",
  components: {
    English,
    Logic,
    Mathematics
  },
  data() {
    return {
      test: "asdasdasdasd",
      tab: null,
      icons: false,
      centered: false,
      grow: false,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      right: false,
      tabs: 3
    };
  },
  firestore: {},
  created() {
    if (!this.$store.getters.getApplicantInfo) {
      this.$router.replace({ name: "Home" });
    }
    // if (!this.$store.getters.getApplicantInfo) {
    //   this.$router.replace({ name: "Home" });
    // }
  }
};
</script>

<style>
</style>
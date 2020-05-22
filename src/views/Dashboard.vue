<template>
  <v-container>
    <v-card>
      <v-card-title>
        iFormat Logic I.T. Solutions Applicants
        <!-- dialog -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary ml-8" dark v-on="on">Add Applicant</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Applicant Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="First Name*"
                        v-model="firstName"
                        :rules="[() => !!firstName || 'First Name is required.']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Middle Name" v-model="middleName"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Last Name*"
                        v-model="lastName"
                        :rules="[() => !!lastName || 'Last Name is required.']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field label="Email*" v-model="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        label="Phone Number*"
                        v-model="phoneNumber"
                        :rules="[() => !!phoneNumber || 'Phone Number is required.']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Address*"
                        v-model="address"
                        :rules="[() => !!address || 'Address is required.']"
                        type="text"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Age*"
                        type="number"
                        v-model="age"
                        :rules="[() => !!age || 'Age is required.']"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error darken-1"
                text
                v-on:click="resetForm()"
                @click="dialog = false"
              >Close</v-btn>
              <v-btn color="blue darken-1" outlined :disabled="!valid" v-on:click="addApplicant()">
                Save
                <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- end dialog -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="applicants"
        :search="search"
        :single-expand="true"
        :expanded.sync="expanded"
        show-expand
        class="elevation-1"
        item-key="fullName"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.fullName }}</td>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <span class="headline">More Info</span>
            <hr />
            <v-container>
              <v-row>
                <p>
                  Exam Unique ID :
                  <span class="title">{{item.id}}</span>
                </p>
              </v-row>
              <v-row>
                <p>
                  Phone Number :
                  <span class="title">{{item.info.phoneNumber}}</span>
                </p>
              </v-row>
              <v-row>
                <p>
                  Email Address :
                  <span class="title">{{item.info.email}}</span>
                </p>
              </v-row>
              <v-row>
                <p>
                  Address :
                  <span class="title">{{item.info.address}}</span>
                </p>
              </v-row>
              <v-row>
                <p>
                  Age :
                  <span class="title">{{item.info.age}}</span>
                </p>
              </v-row>
            </v-container>
          </td>
        </template>
        <template v-slot:item.resultEnglish="{item}">
          <span>{{item.resultEnglish}} / 20</span>
        </template>
        <template v-slot:item.resultMath="{item}">
          <span>{{item.resultMath}} / 20</span>
        </template>
        <template v-slot:item.resultLogic="{item}">
          <span>{{item.resultLogic}} / 15</span>
        </template>
        <template v-slot:item.examTimer="{item}">
          <span>{{secondsToTime(item.examTimer)}}</span>
        </template>
        <template v-slot:item.dateAdded="{ item }">
          <span>{{ ((item.dateAdded.toDate().getMonth() > 8) ? (item.dateAdded.toDate().getMonth() + 1) : ('0' + (item.dateAdded.toDate().getMonth() + 1))) + '/' + ((item.dateAdded.toDate().getDate() > 9) ? item.dateAdded.toDate().getDate() : ('0' + item.dateAdded.toDate().getDate())) + '/' + item.dateAdded.toDate().getFullYear() }}</span>
        </template>
      </v-data-table>
      <!-- <v-data-table
        :headers="headers"
        :items="desserts"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>-->
    </v-card>
  </v-container>
</template>

<script>
import { db } from "../db";
export default {
  name: "Dashboard",
  data() {
    return {
      dialog: false,
      valid: false,

      loading: false,

      //applicant info
      firstName: null,
      middleName: "",
      lastName: null,
      email: "",
      phoneNumber: null,
      address: null,
      age: null,

      // exam result
      resultEnglish: 0,
      resultLogic: 0,
      resultMath: 0,
      answeredEnglish: [],
      answeredLogic: [],
      answeredMath: [],

      examTimer: 3599999,

      search: "",
      singleExpand: false,
      expanded: [],
      headers: [
        {
          text: "Applicant Name",
          align: "start",
          sortable: false,
          value: "fullName"
        },
        { text: "English", sortable: false, value: "resultEnglish" },
        { text: "Logic", sortable: false, value: "resultLogic" },
        { text: "Math", sortable: false, value: "resultMath" },
        { text: "Exam Timer", value: "examTimer" },
        { text: "Date Added", sortable: false, value: "dateAdded" },
        { text: "", value: "data-table-expand" }
      ],

      applicants: null,

      desserts: [
        {
          name: "Frozen Yogurt",
          resultEnglish: 159,
          logic: 6.0,
          math: 24,
          examTimer: 4.0,
          dateAdded: "1%"
        },
        {
          name: "Ice cream sandwich",
          resultEnglish: 237,
          logic: 9.0,
          math: 37,
          examTimer: 4.3,
          dateAdded: "1%"
        },
        {
          name: "Eclair",
          resultEnglish: 262,
          logic: 16.0,
          math: 23,
          examTimer: 6.0,
          dateAdded: "7%"
        },
        {
          name: "Cupcake",
          resultEnglish: 305,
          logic: 3.7,
          math: 67,
          examTimer: 4.3,
          dateAdded: "8%"
        },
        {
          name: "Gingerbread",
          resultEnglish: 356,
          logic: 16.0,
          math: 49,
          examTimer: 3.9,
          dateAdded: "16%"
        },
        {
          name: "Jelly bean",
          resultEnglish: 375,
          logic: 0.0,
          math: 94,
          examTimer: 0.0,
          dateAdded: "0%"
        },
        {
          name: "Lollipop",
          resultEnglish: 392,
          logic: 0.2,
          math: 98,
          examTimer: 0,
          dateAdded: "2%"
        },
        {
          name: "Honeycomb",
          resultEnglish: 408,
          logic: 3.2,
          math: 87,
          examTimer: 6.5,
          dateAdded: "45%"
        },
        {
          name: "Donut",
          resultEnglish: 452,
          logic: 25.0,
          math: 51,
          examTimer: 4.9,
          dateAdded: "22%"
        },
        {
          name: "KitKat",
          resultEnglish: 518,
          logic: 26.0,
          math: 65,
          examTimer: 7,
          dateAdded: "6%"
        }
      ]
    };
  },
  firestore() {
    return {
      applicants: db.collection("applicants").orderBy("dateAdded", "asc")
    };
  },
  methods: {
    secondsToTime(s) {
      var seconds = s / 1000;
      //  var hours = parseInt( seconds / 3600 );
      seconds = seconds % 3600;
      var minutes = parseInt(seconds / 60);
      seconds = seconds % 60;
      return minutes + ":" + seconds.toFixed(0);
    },
    resetForm() {
      this.$refs.form.reset();
    },
    addApplicant() {
      this.loading = true;
      const dbObject = {
        fullName: `${this.lastName}, ${this.firstName} ${this.middleName}`,
        info: {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address: this.address,
          age: this.age
        },
        resultEnglish: this.resultEnglish,
        resultLogic: this.resultLogic,
        resultMath: this.resultMath,
        answeredEnglish: this.answeredEnglish,
        answeredLogic: this.answeredLogic,
        answeredMath: this.answeredMath,
        examTimer: this.examTimer,
        dateAdded: new Date()
      };
      // console.log(dbObject);
      db.collection("applicants")
        .add(dbObject)
        .then(() => {
          this.loading = false;
          this.dialog = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
        this.$refs.form.reset();
    }
  }
};
</script>

<style>
</style>
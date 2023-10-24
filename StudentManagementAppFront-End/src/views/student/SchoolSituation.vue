<script>
  import {defineComponent} from "vue";

  export default defineComponent({
    name: 'SchoolSituationView'
  })
</script>

<script setup>
import axios from "axios";
import tokens from "@/token/token";
import {onMounted, ref} from "vue";
import router from "@/router";
import {API_BASE_URL} from "@/config";

const faculties = ref([]);
function getFaculties() {
  axios.get(API_BASE_URL + '/faculty/whatFacultiesAStudentAttends', {
    headers: {
      "Authorization": "bearer " + tokens.value
    }
  })
      .then(response => {
        faculties.value = response.data;
      })
      .catch(error => {
        console.log(error);
      });
}

const goToFacultyPage = (id) => {
  router.push({ name: 'SchoolSituationDetailView', params: { id } })
}

onMounted(() => {
  getFaculties();
})

</script>

<template>

  <ul>
    <li v-for="faculty in faculties" :key="faculty.id">
      <a @click="goToFacultyPage(faculty.id)">{{faculty.name}}</a>
    </li>
  </ul>
</template>

<style scoped>

</style>

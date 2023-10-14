<script>
  import {defineComponent} from "vue";

  export default defineComponent({
    name: 'SchoolSituationView'
  })
</script>

<script setup>
import axios from "axios";
import tokens from "@/Scripts/tokens";
import {onMounted, ref} from "vue";
import router from "@/router";

const faculties = ref([]);
function getFaculties() {
  axios.get('http://localhost:5196/api/faculty/studentFaculties', {
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

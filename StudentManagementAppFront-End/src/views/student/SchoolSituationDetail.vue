<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'SchoolSituationDetailView'
})


</script>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios from 'axios'
import tokens from "@/token/token";
import {useRoute} from "vue-router";
import {API_BASE_URL} from "@/config";

const route = useRoute();

const CourseType = {
  '0': 'Compulsory',
  '1': 'Optional',
  '2': 'Optional'
};
const semester = ref('0');
const year = ref('1');

const coursesAndGrades = ref([]);

const fetchCoursesAndGrades = () => {
  axios.get(API_BASE_URL + '/coursesAndGrades/' + route.params.id + '/' + year.value, {
    headers: {
      "Authorization": "bearer " + tokens.value
    }
  })
      .then(async response => {
        coursesAndGrades.value = await response.data.coursesAndGrades;
      })
      .catch(error => {
        console.log(error);
      });
};

const filteredCoursesAndGrades = computed(() => {
  if (semester.value === '0')
    return coursesAndGrades.value
  else if (semester.value === '1')
    return coursesAndGrades.value.filter(c => c.key.semester === 1)
  return coursesAndGrades.value.filter(c => c.key.semester === 2)
});


onMounted(() => {
  fetchCoursesAndGrades();
})
</script>

<template>

  <div>
    <a @click="year = '1'; fetchCoursesAndGrades()">Year 1</a> |
    <a @click="year = '2'; fetchCoursesAndGrades()"> Year 2</a> |
    <a @click="year = '3'; fetchCoursesAndGrades()"> Year 3</a>
    <br/>
    <a @click="semester = '1'">Semester 1</a> |
    <a @click="semester = '2'">Semester 2</a> |
    <a @click="semester = '0'">All</a>


    <table>
      <tr>
        <th colspan="2" rowspan="2">Code</th>
        <th colspan="2" rowspan="2">Name</th>
        <th colspan="2" rowspan="2">Course Type</th>
        <th colspan="2" rowspan="2">Semester</th>

        <th colspan="2" rowspan="1">Total Hours</th>
        <th colspan="2" rowspan="1">Grades</th>
        <th colspan="2" rowspan="1"> Credits</th>
      </tr>

      <tr>
        <td colspan="1" rowspan="1"> Course Hours</td>
        <td colspan="1" rowspan="1"> Other Hours</td>
        <td colspan="1" rowspan="1">Sem. 1</td>
        <td colspan="1" rowspan="1">Sem. 2</td>
        <td colspan="1" rowspan="1"> Sem. 1</td>
        <td colspan="1" rowspan="1"> Sem. 2</td>
      </tr>

      <tr
          v-for="c in filteredCoursesAndGrades"
      >
        <td colspan="2">{{ c.key.code }}</td>
        <td colspan="2">{{ c.key.name }}</td>
        <td colspan="2">{{ CourseType[c.key.courseType] }}</td>
        <td colspan="2">{{ c.key.semester }}</td>
        <td colspan="1">{{ c.key.courseHours * 14 }}</td>
        <td colspan="1">{{ (c.key.seminarHours + c.key.laboratoryHours + c.key.practiceHours) * 14 }}</td>
        <td colspan="1">{{ (c.key.semester === 1 ? c.value.value : '-') }}</td>
        <td colspan="1">{{ (c.key.semester === 2 ? c.value.value : '-') }}</td>
        <td colspan="1">{{ (c.key.semester === 1 ? c.key.credits : '-') }}</td>
        <td colspan="1">{{ (c.key.semester === 2 ? c.key.credits : '-') }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table, th, td {
  border: 1px #7E7E7E solid;
  border-collapse: collapse;
  padding: 5px;
  text-align: center;
}
</style>

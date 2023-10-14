<script>
import {defineComponent} from "vue";
import axios from "axios";
export default defineComponent({
  name: 'SchoolSituationDetailView'
})


</script>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios from 'axios'
import tokens from "@/Scripts/tokens";
import {useRoute} from "vue-router";
class Course {
  id;
  faculty;
  code;
  name;
  courseType;
  year;
  semester;
  courseHours;
  seminarHours;
  laboratoryHours;
  projectHours;
  practiceHours;
  examinationType;
  credits;
  grade;
  constructor(id, faculty, code, name, courseType, year, semester, courseHours, seminarHours, laboratoryHours, projectHours, practiceHours, examinationType, credits) {
    this.id = id;
    this.faculty = faculty;
    this.code = code;
    this.name = name;
    this.courseType = courseType;
    this.year = year;
    this.semester = semester;
    this.courseHours = courseHours;
    this.seminarHours = seminarHours;
    this.laboratoryHours = laboratoryHours;
    this.projectHours = projectHours;
    this.practiceHours = practiceHours;
    this.examinationType = examinationType;
    this.credits = credits;
  }
  setGrade(grade) {
    this.grade = grade;
  }
}
const CourseType = {
  '0': 'Compulsory',
  '1': 'Optional',
  '2': 'Optional'
};
const courses = ref([]);
const route = useRoute();
const year = ref('1')

function fetchCourses() {
  console.log('fetch')
  axios.get('http://localhost:5196/api/course/' + route.params.id + '/' +  year.value, {
    headers: {
      "Authorization": "bearer " + tokens.value
    }
  })
      .then(response => {
        courses.value = response.data;
        courses.value.forEach(course => {
          let grade = fetchGrade(course.id);
          if (grade != null)
            course.grade = grade;
          else
            course.grade = 0
        })
      })
      .catch(error => {
        console.log(error);
      });
}

function fetchGrade(courseId) {
  const grade = ref(null)
  axios.get('http://localhost:5196/api/grade/studentGrade/' + courseId, {
    headers: {
      "Authorization": "bearer " + tokens.value
    }
  })
      .then(response => {
        grade.value = response.data
      })
      .catch(error => {
        grade.value = '0'
      });
  return grade;
}

const semester = ref('0')
const filteredCourses = computed(() => {
  console.log('hey')
  if (semester.value === '0')
    return courses.value
  else if (semester.value === '1')
    return courses.value.filter(c => c.semester === 1)
  return courses.value.filter(c => c.semester === 2)
})



onMounted(() => {
  fetchCourses();
})
</script>

<template>

<div>
  <a @click="year = '1'; fetchCourses()">Year 1</a> |
  <a @click="year = '2'; fetchCourses()"> Year 2</a> |
  <a @click="year = '3'; fetchCourses()"> Year 3</a>
  <br/>
  <a @click="semester = '1'">Semester 1</a> |
  <a @click="semester = '2'">Semester 2</a> |
  <a @click="semester = '0'">All</a>


  <table>
    <tr>
      <th>Code</th>
      <th>Name</th>
      <th>courseType</th>
      <th>semester</th>

      <th colspan="2">
        Course Hours
        <table>
          <tr>
            <th>courseHours</th>
            <th>Other hours</th>
          </tr>
        </table>
      </th>


      <th colspan="2">
        Grades
        <table>
                <tr>
                  <th>Sem 1</th>
                  <th>Sem 2</th>
                </tr>
        </table>
      </th>

      <th colspan="2">
        Credits
        <table>
          <tr>
            <th>Sem 1</th>
            <th>Sem 2</th>
          </tr>
        </table>
      </th>

    </tr>
    <tr
        v-for="c in filteredCourses"
        :key="c.id"
    >
      <th>{{c.code}}</th>
      <th>{{c.name}}</th>
      <th>{{CourseType[c.courseType]}}</th>
      <th>{{c.semester}}</th>
      <th>{{c.courseHours * 14}}</th>
      <th>{{(c.seminarHours + c.laboratoryHours + c.practiceHours) * 14}}</th>
      <th>{{(c.semester === 1 ? c.grade : '-')}}</th>
      <th>{{(c.semester === 2 ? c.grade : '-')}}</th>
      <th>{{(c.semester === 1 ? c.credits : '-')}}</th>
      <th>{{(c.semester === 2 ? c.credits : '-')}}</th>
    </tr>
  </table>
</div>
</template>

<style scoped>
table, th, td {
  border: 1px #7E7E7E solid;
  border-collapse: collapse;
  padding: 5px;
}
</style>

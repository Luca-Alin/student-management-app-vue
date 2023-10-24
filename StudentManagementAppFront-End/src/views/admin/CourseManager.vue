<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'CourseManagerView'
})
</script>

<script setup>
import {studentsController} from "@/controllers/students";
import {facultyController} from "@/controllers/faculties";
import {coursesController} from "@/controllers/courses";
import {gradesController} from "@/controllers/grades";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import token from "@/token/token";
import {API_BASE_URL} from "@/config";

const SC = studentsController();
const FC = facultyController();
const CC = coursesController();
const GC = gradesController();

const year = ref(null);
const selectedFacultyId = ref(null);
const selectCourseId = ref(null);
const studentAndGrade = ref([]);

const showCourseCreator = ref(false);

const getCourses = () => {
  if (year.value == null ||
      selectedFacultyId.value == null) return;

  console.log(CC.courses);

  CC.facultyId = selectedFacultyId.value;
  CC.year = year.value;
  CC.fetchCoursesByFacultyAndYear();
}

const newCourseCode = ref('');
const newCourseName = ref('');
const newCourseType = ref('');
const courseTypeEnum = reactive([
  {name: 'Compulsory', id: 0},
  {name: 'Optional', id: 1},
  {name: 'Complementary', id: 2}
]);
const newCourseYear = ref(0);
const newCourseSemester = ref(0);
const newCourseHours = ref(0);
const newCourseSeminarHours = ref(0);
const newCourseLaboratoryHours = ref(0);
const newCourseProjectHours = ref(0);
const newCoursePracticeHours = ref(0);
const newCourseExaminationType = ref(0);
const examinationTypeEnum = reactive([
  {name: 'Exam', id: 0},
  {name: 'Colloquy', id: 1},
  {name: 'AdmittedOrRejected', id: 2}
]);
const newCourseCredits = ref('');
const newCourseFaculty = ref(null)


async function addCourse() {

  let currentCourseType = courseTypeEnum.filter(e => e.name === newCourseType.value)[0].id;
  let currentExamType = examinationTypeEnum.filter(e => e.name === newCourseExaminationType.value)[0].id;

  let currentFacultyId = JSON.parse(selectedFacultyId.value).id;
  let currentFacultyName = JSON.parse(selectedFacultyId.value).name;

  // axios.post(API_BASE_URL + '/course/add', {
  //   faculty: {
  //     id: currentFacultyId,
  //     name: currentFacultyName
  //   },
  //   code: newCourseCode.value,
  //   name: newCourseName.value,
  //   courseType: currentCourseType,
  //   year: newCourseYear.value,
  //   semester: newCourseSemester.value,
  //   courseHours: newCourseHours.value,
  //   seminarHours: newCourseSeminarHours.value,
  //   laboratoryHours: newCourseLaboratoryHours.value,
  //   projectHours: newCourseProjectHours.value,
  //   practiceHours: newCoursePracticeHours.value,
  //   examinationType: currentExamType,
  //   credits: newCourseCredits.value
  // }, {
  //   headers: {
  //     "Authorization": "bearer " + token.value
  //   },
  // },)
  //     .then(async response => {
  //       await SC.fetchAllStudents()
  //       alert(response.data)
  //       clearForm();
  //     })
  //     .catch(error => {
  //       alert(error)
  //     });
}

const clearForm =  () => {
  newCourseCode.value = '';
  newCourseName.value = '';
  newCourseType.value = '';
  newCourseYear.value = '';
  newCourseSemester.value = '';
  newCourseHours.value = '';
  newCourseSeminarHours.value = '';
  newCourseLaboratoryHours.value = '';
  newCourseProjectHours.value = '';
  newCoursePracticeHours.value = '';
  newCourseExaminationType.value = '';
  newCourseCredits.value = '';
  newCourseFaculty.value = null;

}

onMounted(() => {
  FC.fetchAllFaculties();
})
</script>

<template>
  <h1>Course Manager View!</h1>

  <button @click="showCourseCreator = !showCourseCreator">
    {{ !showCourseCreator ? 'Add Course' : 'Stop Adding Courses' }}
  </button>
  <div v-if="showCourseCreator">
    <h3>Course Creator</h3>
    <form @submit.prevent="addCourse">
      <table>

        <tr>
          <td>code:</td>
          <td><input v-model="newCourseCode" type="text"></td>
        </tr>

        <tr>
          <td>name:</td>
          <td><input v-model="newCourseName" type="text"></td>
        </tr>

        <tr>
          <td>Course Type:</td>
          <td>
            <select v-model="newCourseType">
              <option v-for="c in courseTypeEnum">{{c.name}}</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>courseYear:</td>
          <td><input v-model="newCourseYear" type="number" min="1" max="10"></td>
        </tr>

        <tr>
          <td>semester:</td>
          <td><input v-model="newCourseSemester" type="number" min="1" max="2"></td>
        </tr>

        <tr>
          <td>courseHours:</td>
          <td><input v-model="newCourseHours" type="number" min="0"></td>
        </tr>

        <tr>
          <td>seminarHours:</td>
          <td><input v-model="newCourseSeminarHours" type="number" min="0"></td>
        </tr>

        <tr>
          <td>laboratoryHours:</td>
          <td><input v-model="newCourseLaboratoryHours" type="number" min="0"></td>
        </tr>

        <tr>
          <td>practiceHours:</td>
          <td><input v-model="newCoursePracticeHours" type="number" min="0"></td>
        </tr>

        <tr>
          <td>projectHours:</td>
          <td><input v-model="newCourseProjectHours" type="number" min="0"></td>
        </tr>

        <tr>
          <td>examinationType:</td>
          <td>
            <select v-model="newCourseExaminationType">
              <option v-for="e in examinationTypeEnum"> {{ e.name }}</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>credits:</td>
          <td><input v-model="newCourseCredits" type="number" min="0"></td>
        </tr>

        <tr>
          <select v-model="selectedFacultyId">
            <option
                v-for="faculty in FC.faculties.value"
            >
              {{ faculty }}
            </option>
          </select>
        </tr>


      </table>
      <input type="submit">
    </form>
  </div>

  <br>
  <br>
  <br>


  <div>
    <select v-model="selectedFacultyId" @change="getCourses">
      <option
          v-for="faculty in FC.faculties.value"
          :key="faculty.id"
          :value="faculty.id"
      >
        {{ faculty.name }}
      </option>
    </select> |

    <select v-model="year" @change="getCourses">
      <option
          v-for="i in [1,2,3,4,5,6,7]"
      >
        {{ i }}
      </option>
    </select>
  </div>


  <ul>
    <li v-for="course in CC.courses.value" :key="course.id">
      <table>
        <tr>
          <td>Course ID:</td>
          <td>{{ course.id }}</td>
        </tr>
        <tr>
          <td>Faculty ID:</td>
          <td>{{ course.faculty.id }}</td>
        </tr>
        <tr>
          <td>Faculty Name:</td>
          <td>{{ course.faculty.name }}</td>
        </tr>
        <tr>
          <td>Code:</td>
          <td>{{ course.code }}</td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>{{ course.name }}</td>
        </tr>
        <tr>
          <td>Course Type:</td>
          <td>{{ courseTypeEnum.filter(e => e.id === course.courseType).findLast(e => e.id === course.courseType).name }}</td>
        </tr>
        <tr>
          <td>Year:</td>
          <td>{{ course.year }}</td>
        </tr>
        <tr>
          <td>Semester:</td>
          <td>{{ course.semester }}</td>
        </tr>
        <tr>
          <td>Course Hours:</td>
          <td>{{ course.courseHours }}</td>
        </tr>
        <tr>
          <td>Seminar Hours:</td>
          <td>{{ course.seminarHours }}</td>
        </tr>
        <tr>
          <td>Laboratory Hours:</td>
          <td>{{ course.laboratoryHours }}</td>
        </tr>
        <tr>
          <td>Project Hours:</td>
          <td>{{ course.projectHours }}</td>
        </tr>
        <tr>
          <td>Practice Hours:</td>
          <td>{{ course.practiceHours }}</td>
        </tr>
        <tr>
          <td>Examination Type:</td>
          <td>{{ examinationTypeEnum.filter(e => e.id === course.examinationType).findLast(e => e.id === course.examinationType).name }}</td>
        </tr>
        <tr>
          <td>Credits:</td>
          <td>{{ course.credits }}</td>
        </tr>
      </table>
      <br/>
    </li>
  </ul>

</template>

<style scoped>

</style>
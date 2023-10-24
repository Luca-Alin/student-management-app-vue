<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'FacultyManagerView'
})
</script>

<script setup>
import {onMounted, ref} from "vue";
import {studentsController} from "@/controllers/students";
import token from "@/token/token";
import axios from "axios";
import {facultyController} from "@/controllers/faculties";
import {API_BASE_URL} from "@/config";

const FC = facultyController();
const SC = studentsController();

const studentPassword = ref('');
const studentFirstName = ref('');
const studentLastName = ref('');
const studentDateOfBirth = ref(null);
const studentPhoneNumber = ref('');
const studentEmail = ref('');

const studentAddressCountry = ref('');
const studentAddressCity = ref('');
const studentAddressStreet = ref('');
const studentAddressNumber = ref('');

const selectFaculty = ref(null);
const studentFaculties = ref([])

const showStudentCreatorForm = ref(false);
const showStudentUpdateForm = ref(false);

const clearForm = () => {
  studentEmail.value = '';
  studentPassword.value = '';
  studentFirstName.value = '';
  studentLastName.value = '';
  studentDateOfBirth.value = null;
  studentPhoneNumber.value = '';
  studentAddressCountry.value = '';
  studentAddressCity.value = '';
  studentAddressStreet.value = '';
  studentAddressNumber.value = '';
  studentFaculties.value = [];
}

async function addStudent() {
  let currentFaculties = [];
  new Set(studentFaculties.value).forEach(faculty => {
    let i = JSON.parse(faculty);
    if (i != null)
      currentFaculties.push({
        id: i.id, name: i.name
      })
  });

  axios.post(API_BASE_URL + '/student/add', {
    password: studentPassword.value,
    firstName: studentFirstName.value,
    lastName: studentLastName.value,
    dateOfBirth: studentDateOfBirth.value,
    phoneNumber: studentPhoneNumber.value,
    email: studentEmail.value,
    address: {
      country: studentAddressCountry.value,
      city: studentAddressCity.value,
      street: studentAddressStreet.value,
      number: studentAddressNumber.value,
    },
    faculties: currentFaculties
  }, {
    headers: {
      "Authorization": "bearer " + token.value
    }
  })
      .then(async response => {
        await SC.fetchAllStudents();
        alert(response.data);
        clearForm();
      })
      .catch(error => {
        console.log(error);
        alert("Student not created");
      });
}

const studentId = ref(null);
const loadStudentUpdateForm = (student) => {
  console.log(student);

  studentId.value = student.id;
  studentEmail.value = student.email;
  studentPassword.value = student.password;
  studentFirstName.value = student.firstName;
  studentLastName.value = student.lastName;
  studentDateOfBirth.value = student.dateOfBirth.slice(0, 10);
  studentPhoneNumber.value = student.phoneNumber;
  studentAddressCountry.value = student.address.country;
  studentAddressCity.value = student.address.city;
  studentAddressStreet.value = student.address.street;
  studentAddressNumber.value = student.address.number;
  studentFaculties.value = [];
  for (let i = 0; i < student.faculties.length; i++) {
    studentFaculties.value.push({id: student.faculties[i].id, name: student.faculties[i].name});
  }
}

const updateStudent = async () => {
  let currentFaculties = [];
  new Set(studentFaculties.value).forEach(faculty => {
    console.log(faculty);
    let i = JSON.parse(faculty);
    if (i != null)
      currentFaculties.push({
        id: i.id, name: i.name
      })
  });

  await axios.put(API_BASE_URL + '/student/update', {
    id: studentId.value,
    password: studentPassword.value,
    firstName: studentFirstName.value,
    lastName: studentLastName.value,
    dateOfBirth: studentDateOfBirth.value,
    phoneNumber: studentPhoneNumber.value,
    email: studentEmail.value,
    address: {
      country: studentAddressCountry.value,
      city: studentAddressCity.value,
      street: studentAddressStreet.value,
      number: studentAddressNumber.value,
    },
    faculties: currentFaculties
  }, {
    headers: {
      "Authorization": "bearer " + token.value
    }
  })
      .then(async response => {
        await SC.fetchAllStudents();
        alert(response.data);
        clearForm();
      })
      .catch(error => {
        console.log(error);
        alert("Student not updated")
      });
};

const currentFaculty = ref(null);
const fetchByFaculty = async () => {
  let n = currentFaculty.value;
  await SC.setFacultyId(n);
  await SC.fetchStudentsByFaculty();
}

const removeStudent = async (student) => {
  let remove = confirm(`Are you sure you want to remove ${student.firstName} ${student.lastName}?`);
  if (!remove) return;

  let confirmation = prompt(`Enter "${student.firstName} ${student.lastName}" to confirm removal`);
  if (confirmation !== `${student.firstName} ${student.lastName}`) {
    alert("Removal not confirmed");
    return;
  }

  SC.setStudentToRemoveId(student.id);
  await SC.removeStudentById();
  await SC.fetchStudentsByFaculty();
}

onMounted(async () => {
  await SC.fetchAllStudents();
  await FC.fetchAllFaculties();
})
</script>

<template>
  <br>
  <button
      v-if="!showStudentUpdateForm"
      @click="showStudentCreatorForm = !showStudentCreatorForm">
    {{ !showStudentCreatorForm ? 'Add Students' : 'Stop adding students' }}
  </button>

  <div v-if="showStudentCreatorForm">
    <h3>Student Creator</h3>
    <form @submit.prevent="addStudent">
      <table>
        <tr>
          <td>Email:</td>
          <td><input v-model="studentEmail" type="email"></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input v-model="studentPassword" type="text"></td>
        </tr>
        <tr>
          <td>First Name:</td>
          <td><input v-model="studentFirstName" type="text"></td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td><input v-model="studentLastName" type="text"></td>
        </tr>
        <tr>
          <td>Phone Number:</td>
          <td><input v-model="studentPhoneNumber" type="text"></td>
        </tr>
        <tr>
          <td>Date of Birth:</td>
          <td><input v-model="studentDateOfBirth" type="date"></td>
        </tr>
        <tr>
          <td>Address:</td>
          <td></td>
        </tr>
        <tr>
          <td>Country:</td>
          <td><input v-model="studentAddressCountry" type="text"></td>
        </tr>
        <tr>
          <td>City:</td>
          <td><input v-model="studentAddressCity" type="text"></td>
        </tr>
        <tr>
          <td>Street:</td>
          <td><input v-model="studentAddressStreet" type="text"></td>
        </tr>
        <tr>
          <td>Number:</td>
          <td><input v-model="studentAddressNumber" type="text"></td>
        </tr>
        <tr>
        </tr>
        <tr v-for="faculty in studentFaculties">
          <td>
            {{ faculty || ''}}
          </td>
          <td>
            <button @click.prevent="() => studentFaculties = studentFaculties.filter(f => f !== faculty)">Remove</button>
          </td>
        </tr>
        <tr>
          <select v-model="selectFaculty" @change="studentFaculties.push(selectFaculty); selectFaculty = null;">
            <option
                v-for="faculty in FC.faculties.value"
            >
              {{ faculty }}
            </option>
          </select>
        </tr>
        <tr>
          <td colspan="2">
            <button @click.prevent="() => {if (studentFaculties.length > 1) studentFaculties.pop();}">Add Less Faculties</button>
          </td>
        </tr>
      </table>
      <input type="submit">
    </form>
  </div>

  <div v-if="showStudentUpdateForm">
    <h3>Student Update</h3>
    <form @submit.prevent="addStudent">
      <table>
        <tr>
          <td>Email:</td>
          <td><input v-model="studentEmail" type="email"></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input v-model="studentPassword" type="text"></td>
        </tr>
        <tr>
          <td>First Name:</td>
          <td><input v-model="studentFirstName" type="text"></td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td><input v-model="studentLastName" type="text"></td>
        </tr>
        <tr>
          <td>Phone Number:</td>
          <td><input v-model="studentPhoneNumber" type="text"></td>
        </tr>
        <tr>
          <td>Date of Birth:</td>
          <td><input v-model="studentDateOfBirth" type="date"></td>
        </tr>
        <tr>
          <td>Address:</td>
          <td></td>
        </tr>
        <tr>
          <td>Country:</td>
          <td><input v-model="studentAddressCountry" type="text"></td>
        </tr>
        <tr>
          <td>City:</td>
          <td><input v-model="studentAddressCity" type="text"></td>
        </tr>
        <tr>
          <td>Street:</td>
          <td><input v-model="studentAddressStreet" type="text"></td>
        </tr>
        <tr>
          <td>Number:</td>
          <td><input v-model="studentAddressNumber" type="text"></td>
        </tr>
        <tr>
        </tr>
        <tr v-for="faculty in studentFaculties">
          <td>
            {{ faculty || ''}}
          </td>
          <td>
            <button @click.prevent="() => studentFaculties = studentFaculties.filter(f => f !== faculty)">Remove</button>
          </td>
        </tr>
        <tr>
          <select v-model="selectFaculty" @change="studentFaculties.push(selectFaculty); selectFaculty = null;">
            <option
                v-for="faculty in FC.faculties.value"
            >
              {{ faculty }}
            </option>
          </select>
        </tr>
        <tr>
          <td colspan="2">
            <button @click.prevent="() => {if (studentFaculties.length > 1) studentFaculties.pop();}">Add Less Faculties</button>
          </td>
        </tr>
      </table>
      <input type="submit" @click.prevent="updateStudent()">
    </form>
    <button @click="clearForm(); showStudentUpdateForm = false;">Cancel</button>
  </div>


  <br/>
  <br/>
  Sort
  <br/>
  <select v-model="currentFaculty"
          @change="fetchByFaculty"
  >
    <option
        v-for="faculty in FC.faculties.value"
        :key="faculty.id"
        :value="faculty.id"
    >{{ faculty.name }}
    </option>
  </select>
  <br/>
  <br/>

  <ol>
    <li
        v-for="s in SC.students"
    >
      <table>
        <tr>
          <td>Id:</td>
          <td>{{ s.id }}</td>
        </tr>
        <tr>
          <td>First Name:</td>
          <td>{{ s.firstName }}</td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td>{{ s.lastName }}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{{ s.email }}</td>
        </tr>
        <tr>
          <td>Phone Number:</td>
          <td>{{ s.phoneNumber }}</td>
        </tr>
        <tr>
          <td>Date of Birth:</td>
          <td>{{ s.dateOfBirth }}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td></td>
        </tr>
        <tr>
          <td>- Country:</td>
          <td>{{ s.address.country }}</td>
        </tr>
        <tr>
          <td>- City:</td>
          <td>{{ s.address.city }}</td>
        </tr>
        <tr>
          <td>- Street:</td>
          <td>{{ s.address.street }}</td>
        </tr>
        <tr>
          <td>- Number:</td>
          <td>{{ s.address.number }}</td>
        </tr>
        <tr>
          <td>Faculties</td>
          <td>
            <div v-for="f in s.faculties">
              {{ f.name }}
            </div>
          </td>
        </tr>
        <tr>
          <td><button @click="removeStudent(s)">Remove {{ s.firstName.split('')[0] + '. ' + s.lastName }}</button></td>
          <td><button @click="loadStudentUpdateForm(s); showStudentUpdateForm = true">Update {{ s.firstName.split('')[0] + '. ' + s.lastName }}</button></td>

        </tr>
      </table>


    </li>
  </ol>
</template>

<style scoped>

</style>
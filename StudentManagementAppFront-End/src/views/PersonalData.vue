<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'PersonalDataView'
})
</script>

<script setup>


class Student {
  id;
  firstName;
  lastName;
  email;
  dateOfBirth;
  address;
  phoneNumber;

  constructor(id, firstName, lastName, email, dateOfBirth, address, phoneNumber) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.address = address
    this.phoneNumber = phoneNumber;

  }
}

class Address {
  country;
  city;
  street;
  number;

  constructor(country, city, street, number) {
    this.country = country;
    this.city = city;
    this.street = street;
    this.number = number;
  }
}

import axios from "axios";
import tokens from "@/Scripts/tokens";
import {onMounted, ref} from "vue";

const student = ref(null);

async function getStudentData() {
  await axios.get('http://localhost:5196/api/students/student', {
    headers: {
      "Authorization": "bearer " + tokens.value
    }
  })
      .then(response => {
        let s = response.data
        let addr = s.addressModel
        let address = new Address(addr.country, addr.city, addr.street, addr.number)
        student.value = new Student(s.id, s.firstName, s.lastName, s.email, s.dateOfBirth,
            address,
            s.phoneNumber)

      })
      .catch(error => {
        console.log(error);
      });
}

onMounted(() => {
  getStudentData()
})

</script>

<template>

  <div v-if="student !== null">


    <div style="text-align: center;">
      <br><br>
      <table width="80%" height="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td width="90%" valign="top"><h5 class="style2">Personal Data</h5></td>
        </tr>
      </table>
    </div>

    <table width=98% border="0" align="center" cellpading="2" cellspacing="0">
      <tr>
        <td width="10%" valign="middle" class="row1"><strong>Name:</strong> &nbsp;&nbsp;</td>
        <td width="90%" class="row1"><strong><strong>
          {{ student.firstName + " " + student.lastName }} </strong> <strong>&nbsp;</strong>&nbsp;</strong></td>
      </tr>
      <tr>
        <td width="10%" height="21" class="row1">Date of birth:</td>
        <td width="90%" class="row1">{{ student.dateOfBirth }}</td>
      </tr>
    </table>
    <h5 class="style2">Residence</h5>
    <table width=98% border="0" align="center" cellpading="2" cellspacing="0">
      <tr>
        <td width="10%" class="row1">Country:</td>

        <td width="90%" class="row1"> {{ student.address.country }}</td>
      </tr>
      <tr>
        <td class="row1">City:</td>
        <td class="row1">{{ student.address.city }}
        </td>
      </tr>
      <tr>
        <td class="row1">Address:</td>
        <td class="row1">
          <div align="left">
            {{ student.address.street }}, &nbsp; nr. {{ student.address.number }}
          </div>
        </td>
      </tr>
    </table>


    <h5 class="style2">Contact Data </h5>
    <table width=98% border="0" align="center" cellpading="2" cellspacing="0">
      <tr>
        <td class="row1"> Mobil:</td>
        <tr class="row1">
          {{ student.phoneNumber }}
        </tr>
      </tr>
      <tr>
        <td width="10%" class="row1">Email:</td>
        <td class="row1">{{ student.email }}</td>
      </tr>
    </table>
    <p>&nbsp;</p>
  </div>

</template>


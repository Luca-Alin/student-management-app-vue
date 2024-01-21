<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AdminLoginView'})
</script>

<script setup>

import {ref} from "vue";
import axios from "axios";
import token from "@/token/token";
import {API_BASE_URL} from "@/config";
import userRole from "@/token/userRole";

const email = ref('')
const password = ref('')


const login = () => {
    axios.post(API_BASE_URL + '/Auth/admin/login', {
      email: email.value,
      password: password.value
    }).then((response) => {
      token.value = response.data;
      userRole.value = 'ADMIN';
      alert("Login successful!");
    }, (error) => {
      console.log(error)
      alert("Login failed!")
    })
}
</script>

<template>
<form @submit.prevent="login">

  <h1>Admin Login</h1>
  <table>
    <tr>
      <td>
        <label for="email">Email</label>
      </td>
      <td>
        <input type="text" id="email" name="email" placeholder="Your email" v-model="email">
      </td>
    </tr>
    <tr>
      <td>
        <label for="password">Password</label>
      </td>
      <td>
        <input type="password" id="password" name="password" placeholder="Your password" v-model="password">
      </td>
    </tr>
  </table>
  <input type="submit" value="Submit">

  <div>Account</div>
    <ol>
      <li>admin@fun-university.com</li>
      <li>Password: password</li>
    </ol>
</form>
</template>

<style scoped>

</style>

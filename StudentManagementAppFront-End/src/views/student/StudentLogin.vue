<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'StudentLoginView'
})
</script>

<script setup>

import axios from "axios";
import {useRouter} from "vue-router";
import {ref} from "vue";
import token from "@/token/token";
import {API_BASE_URL} from "@/config";
import userRole from "@/token/userRole";

const email = ref('');
const password = ref('');

const router = useRouter();

function login() {
  axios.post(API_BASE_URL + '/Auth/student/login', {
    email: email.value,
    password: password.value
  }).then((response) => {
    token.value = response.data
    userRole.value = 'STUDENT';
    router.push('/personal-data');
  }, (error) => {
    alert("Login failed!")
  });
}

</script>


<template>

  <div class="content">
    <form @submit.prevent="login">
        <table>
          <tr>
            <td colspan="2"><h1 style="text-align: center">Login</h1></td>
          </tr>
          <tr>
            <td><label>Email: </label></td>
            <td><input v-model="email" placeholder="Email" style="width:240px;" type="email"></td>
          </tr>
          <tr>
            <td><label>Password: </label></td>
            <td><input v-model="password" placeholder="Password" style="width:240px;" type="password"/></td>
          </tr>
          <tr>
            <td></td>
            <td><input id="btnLogin" class="auto-style2" name="btnLogin" type="submit" value="Log in" style="width: 100%; height: 100%;"/></td>
          </tr>
        </table>
        <div>Accounts</div>
        <ol>
          <li>teddysmith@fun-university.com</li>
          <li>johndoe@fun-university.com</li>
          <li>janedoe@fun-iniversity.com</li>
          <li>bobsmith@fun-univsity.com</li>
          <li>Password: password</li>
        </ol>
    </form>

    <a style="left: 50%; right: 50%" @click="router.push('/admin-login')">Click here if you're an admin</a>
  </div>


</template>

<style scoped>

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: hsla(160, 100%, 37%, 0.2);
  text-shadow: black;
  border-radius: 25px;
  padding: 25px;
  text-align: center;
  color: lightsalmon;
}

table, th, td {
  border-collapse: collapse;
  padding: 10px;
  text-align: right;
}
</style>



<script setup>
import router from "@/router";
</script>

<script>
import router from "@/router";
import tokens from "@/token/token";
import {computed} from "vue";
import userRole from "@/token/userRole";

function logoutFunction() {
  tokens.value = '';
  userRole.value = '';
  localStorage.setItem('tokens', '');
  localStorage.setItem('userRole', '');
  router.push({name: 'LoginView'});
}

</script>

<template>


      <div v-if="userRole === 'STUDENT'">
        <a @click="router.push('/personal-data')">Personal data</a> |
        <a @click="router.push('/school-situation')">School situation</a> |
        <a @click="router.push({ name: 'WipPageView', params: {data: 'Educational plans' } })">Educational plans</a> |
        <a @click="router.push({ name: 'WipPageView', params: {data: 'Teacher evaluation questionnaire' } })"> Teacher
          evaluation questionnaire</a> |
        <a @click="router.push({ name: 'WipPageView', params: {data: 'Occupational preferences questionnaire' } })">Occupational
          preferences questionnaire</a> |
        <a @click="router.push({ name: 'WipPageView', params: {data: 'Taxes' } })">Taxes</a> |
        <a @click="logoutFunction">Logout</a> |
        <a @click="router.push({ name: 'WipPageView', params: {data: 'Change the password' } })">Change the password</a>
        <br>
      </div>

      <div v-if="userRole === 'ADMIN'">
        <br>
        <a @click="router.push('/admin-login')">Login</a> |
        <a @click="router.push('/faculty-manager')">Faculty Manager</a> |
        <a @click="router.push('/student-manager')">Student Manager</a> |
        <a @click="router.push('/grades-manager')">Grades Manager</a> |
        <a @click="router.push('/course-manager')"> Course Manager</a> |
        <a @click="logoutFunction">Logout</a>
      </div>

  <RouterView/>
</template>

<style scoped>
</style>

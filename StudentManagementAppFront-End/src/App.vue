<script setup>
import router from "@/router";
</script>

<script>
import router from "@/router";
import tokens from "@/Scripts/tokens";
import {computed} from "vue";

function logoutFunction() {
  tokens.value = ''
  localStorage.setItem('tokens', '');
  router.push({name: 'LoginView'});
  console.log(tokens.value === '')
}

const tokenIsEmpty = computed(() => {
  return tokens.value === ''
})
</script>

<template>
  <table v-if="!tokenIsEmpty">
    <tr>
      <td>
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
      </td>
    </tr>
  </table>

  <RouterView/>
</template>

<style scoped>
</style>

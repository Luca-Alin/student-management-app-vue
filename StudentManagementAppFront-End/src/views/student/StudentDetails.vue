<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'StudentDetailsView'
})
</script>

<script setup>
import axios from "axios";
import tokens from "@/token/token";
import {onMounted, ref} from "vue";
import {API_BASE_URL} from "@/config";

const faculties = ref([]);
function getFaculties() {
  axios.get(API_BASE_URL + '/faculty/studentFaculties', {
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

onMounted(() => {
  getFaculties();
})
</script>

<template>
  <table width="100%" border="0" cellspacing=0 cellpadding=0>
    <tr>

      <td valign=top align=right><a href="javascript:void(0)" onClick="location.href='date_personale_student.php'"
                                    title="Date personale">Date personale</a> | <a href="javascript:form1.submit()"
                                                                                   title="Situaţia şcolară">Situaţia
        şcolară</a> | <a href="javascript:form2.submit()" title="Planuri de învăţământ">Planuri de învăţământ</a> | <a
          href="javascript:form3.submit()" title="Evaluare activităţi didactice"> Chestionar evaluare cadre
        didactice</a> | <a href="javascript:form6.submit()" title="Chestionar studenti">Chestionar MRAS</a> | <a
          href="javascript:form7.submit()" title="Profil ocupaţional">Chestionar preferinţe ocupaţionale</a> | <a
          href="javascript:form4.submit()" title="Taxe">Taxe</a> | <a href=index.php title="Logout">Logout</a> | <a
          href="javascript:void(0)" onClick="location.href='parola_student.php'" title="Schimbă parola">Schimbă
        parola</a>
        <br><br><br><b> Luca A.F. Alin </b></td>
    </tr>
  </table>

  <br><br>
  <table width="80%" height="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td width="90%" valign="top"><p></p>

        <h5 class="style1">Situaţia şcolară </h5>
        <li v-for="faculty in faculties">
          <a>{{faculty.name}}</a><br>
        </li>
      </td>
      <td width="90%" height="60" valign="middle">&nbsp;</td>
    </tr>

  </table>
  <p>&nbsp;</p>

</template>

<style scoped>
/* Stilul general */
body {
  background-color: #FFFCFF;
  scrollbar-face-color: #DEE3E7;
  scrollbar-highlight-color: #FFFFFF;
  scrollbar-shadow-color: #DEE3E7;
  scrollbar-3dlight-color: #D1D7DC;
  scrollbar-arrow-color: #006699;
  scrollbar-track-color: #EFEFEF;
  scrollbar-darkshadow-color: #98AAB1;
}

td {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
}

a:link {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #000000;
  text-decoration: none
}

a:active {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #000000;
  text-decoration: none
}

a:visited {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #000000;
  text-decoration: none
}

a:hover {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ff0000;
  text-decoration: none
}

.forumline {
  background-color: rgb(234, 242, 255);
  border: 2px #006699 solid;
}

.forumline1 {
  background-color: #EFEFEF;
  border: 2px #006699 solid;
}

.forumline2 {
  background-color: #EFEFEF;
  border: 2px
}


.cattitle {
  font-weight: bold;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  color: #006699
}

a.cattitle {
  text-decoration: none;
  color: #006699;
}

a.cattitle:hover {
  text-decoration: underline;
}

th {
  color: #FFFFFF;
  font-size: 11px;
  font-weight: bold;
  background-color: #006699;
  height: 25px;

}


th.thTop {
  border-width: 1px 0px 0px 0px;
}

th.thCornerL {
  border-width: 1px 0px 0px 1px;
}

th.thCornerR {
  border-width: 1px 1px 0px 0px;
}

td.rowpic {
  background-color: #FFFFFF;
}

td.catLeft, td.catRight, td.catBottom {
  background-color: #D1D7DC;
  border: #FFFFFF;
  border-style: solid;
  height: 28px;
}

td.catLeft1 {
  background-color: #D1D7DC;
  border: #FFFFFF;
  border-style: solid;
  height: 28px;
}

th.catLeft, td.catRight, td.catBottom {
  background-color: #D1D7DC;
  border: #FFFFFF;
  border-style: solid;
  height: 28px;
}

td.catLeft {
  border-width: 0px 0px 0px 1px;
}

td.catLeft1 {
  border-bottom-style: solid;
  background-color: #A8CBD9;
  border: 0px none #FFFFFF;


}

/* pentru form */
.form {
  background: transparent;
  background-color: #F4F4F4;
  color: #000000;
  font-family: Verdana, Arial, Helvetica;
  font-size: 11px;
  text-align: left;
  scrollbar-face-color: #CCCCCC;
  scrollbar-shadow-color: #F4F4F4;
  scrollbar-highlight-color: #F4F4F4;
  scrollbar-3dlight-color: #F4F4F4;
  scrollbar-darkshadow-color: #F4F4F4;
  scrollbar-track-color: #F4F4F4;
  scrollbar-arrow-color: #000000
}

.buton {
  background-color: #dddddd;
  border-color: #FFFFFF #bbbbbb #bbbbbb #FFFFFF;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  font-family: Verdana, Arial, Helvetica;
  font-size: 11px
}


/* Tipuri de celule */
td.galbeninchis {
  background-color: #ffcc33;
}

td.alb {
  background-color: #ffffff;
}

td.gri {
  background-color: #CCCCCC;
}

td.grideschis {
  background-color: #f4f4f4;
}

td.blue {
  background-color: #355895;
}

td.row1 {
  background-color: #EFEFEF;
  vertical-align: middle;
}

td.row2 {
  background-color: #DEE3E7;
}

td.row3 {
  background-color: #D1D7DC;
}

td.titlu {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #355895;
  font-weight: bold
}

p.titlu_red {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #CC0033;
  font-weight: bold
}

/* Titlurile articolelor */
p.titlu {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #316592;
  font-weight: bold
}

a.titlu:link {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #CC3333;
  text-decoration: none;
  font-style: italic;
  font-weight: bold
}

a.titlu:active {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #CC3333;
  text-decoration: none;
  font-style: italic;
  font-weight: bold
}

a.titlu:visited {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #CC3333;
  text-decoration: none;
  font-style: italic;
  font-weight: bold
}

a.titlu:hover {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #ffcc33;
  text-decoration: none;
  font-style: italic;
  font-weight: bold
}


/* Textul principal */
p.text {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px
}

span.text {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px
}

div.text {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px
}

div.text2 {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #355895;
}

span.text2 {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #355895;
}

td.text {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px
}

a.text:link {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #355895;
  text-decoration: none
}

a.text:active {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #355895;
  text-decoration: none
}

a.text:visited {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #355895;
  text-decoration: none
}

a.text:hover {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #FF0000;
  text-decoration: none
}

/* Text subsol */
div.subsol {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff
}

a.subsol:link {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff;
  text-decoration: none
}

a.subsol:active {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff;
  text-decoration: none
}

a.subsol:visited {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff;
  text-decoration: none
}

a.subsol:hover {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ff0000;
  text-decoration: none
}

/* Meniu sus */
div.meniusus {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff
}

a.meniusus:link {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff;
  text-decoration: none
}

a.meniusus:active {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff;
  text-decoration: none
}

a.meniusus:visited {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ffffff;
  text-decoration: none
}

a.meniusus:hover {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ff0000;
  text-decoration: none
}


/* Meniu sus */
div.meniusus1 {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #316592
}

a.meniusus1:link {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #316592;
  text-decoration: none
}

a.meniusus1:active {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #316592;
  text-decoration: none
}

a.meniusus1:visited {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #316592;
  text-decoration: none
}

a.meniusus1:hover {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #ff0000;
  text-decoration: none
}

p.meniusus1 {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #316592;
  text-decoration: none
}


.TitleBox {
  background-color: #f0f0f0;
  color: #000000;
}

.TitleBoxBorder {
  background-color: #999999;
  color: #FFFFFF;
}

.BoxBorder {
  background-color: #999999;
}

.BoxBorder2 {
  background-color: #999999;
}

.BoxBG {
  background-color: #316592;
  color: #000000;
}

.BoxBG2 {
  background-color: #F4f4f4;
  color: #000000;
}

.BoxTitle {
  background-color: #316592;
  color: #FFFFFF;
}

.BoxTitle1 {
  background-color: #FFFFFF;
  color: #316592;
}


.BoxTitle2 {
  background-color: #45a22b;
  color: #FFFFFF;
}

</style>
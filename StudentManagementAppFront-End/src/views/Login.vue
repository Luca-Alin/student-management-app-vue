<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'LoginView'
})
</script>

<script setup>

import axios from "axios";
import {useRouter} from "vue-router";
import {ref} from "vue";
import tokens from "@/Scripts/tokens";

const email = ref('');
const password = ref('');

const router = useRouter();

function login() {
  axios.post('http://localhost:5196/api/Auth/login', {
    email: email.value,
    password: password.value
  }).then((response) => {
    tokens.value = response.data
    console.log(response.data);
    router.push('/personal-data');
  }, (error) => {
    console.log(error);
  });
}

</script>


<template>
  <body>
  <form @submit.prevent="login">

    <div class="container">
      <div id="header">&nbsp;&nbsp;&nbsp;
        <br/>

      </div>
      <!-- content -->
      <div id="content">

        <h1>
          <img alt="facultyImage" height="70" src="/src/assets/LoginImages/facultyImage.png" width="335"/></h1>
        <div id="username">

          <input v-model="email" placeholder="Email" style="width:240px;" type="text">
        </div>
        <div id="password">
          <input v-model="password" placeholder="Password" style="width:240px;" type="password"/>
        </div>

        <!--        <div id="CaptchaDiv">-->


        <!--          <table style="width: 250px;">-->
        <!--            <tr height="30">-->
        <!--              <td height="46" align=left style="vertical-align: center;">-->


        <!--                <div>-->

        <!--                  <span id="Label13">Cod generat:</span></div>-->
        <!--              </td>-->
        <!--              <td align=left style="vertical-align: top;"><img src="captcha.php" name="codCP" id="codCP"-->
        <!--                                                               style="left: 0px; position: relative; top: 10px"/>-->
        <!--              </td>-->

        <!--            </tr>-->

        <!--            Captcha -->
        <!--            <tr height="30">-->
        <!--              <td align=left style="vertical-align: central;">-->


        <!--                <div>-->

        <!--                  <span id="Label13">Introduceţi:</span></div>-->
        <!--              </td>-->
        <!--              <td align=left style="vertical-align: central;">-->
        <!--                <input name="valCP" type="text" id="valCP" placeholder="Cod generat" required/>-->


        <!--              </td>-->

        <!--            </tr>-->

        <!--          </table>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div id="submit">-->

        <!--        <br/>-->
        <!--        <input type="submit" name="btnLogin" value="Log in" id="btnLogin" class="auto-style2"/>-->
        <!--        <br/>-->

      </div>

    </div>


    <br/>


  </form>

  <div class="divHelp">
    <br/>

    <div class="helpLogin">
      <strong>
           <span class="style1">
             <span id="LabelStudTitlu">Details</span>
           </span>
        <br/>
      </strong>
      <br/>


      <span id="LabelStud1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi asperiores cumque dicta eos fuga ipsam iusto mollitia nostrum, nulla odit omnis perferendis placeat, quos repellat sed temporibus, vero. Laudantium, quas.</span>
      <br/>

    </div>
  </div>

  <br/>
  </body>
</template>


<style scoped>

body {
  background-image: url("/src/assets/LoginImages/background.png");
  color: #000;
  font: 14px Arial;
  margin: 0 auto;
  padding: 0;
  height: 100%;
}

.container {
  margin: 25px auto;
  position: relative;
  width: 850px;
}

#header {
  text-align: right;
  vertical-align: middle;
  right: 150px;

}

#content {
  background: #f9f9f9;
  background: -moz-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  background: -webkit-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(3, 153, 247, 1) 100%);
  background: -o-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  background: -ms-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  background: linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f8f8f8', endColorstr='#f9f9f9', GradientType=0);
  border: 1px solid #c4c6ca;
  margin: 0 auto;
  position: relative;
  text-align: center;
  text-shadow: 0 1px 0 #fff;
  width: 430px;
  height: 410px;
  padding: 15px 10px 15px 40px;
}

#content h1 {
  color: #7E7E7E;
  font: bold 25px Helvetica, Arial, sans-serif;
  letter-spacing: -0.05em;
  line-height: 20px;
  margin: 10px 0 30px;
}

#content h1 img {
  border-radius: 10px;
  -moz-border-radius: 10px;
}

#content h1:before,
#content h1:after {
  content: "";
  height: 1px;
  position: absolute;
  top: 10px;
  width: 27%;
}

#content h1:after {
  background: rgb(126, 126, 126);
  background: -moz-linear-gradient(left, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: -webkit-linear-gradient(left, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: -o-linear-gradient(left, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: -ms-linear-gradient(left, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: linear-gradient(left, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  right: 0;
}

#content h1:before {
  background: rgb(126, 126, 126);
  background: -moz-linear-gradient(right, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: -webkit-linear-gradient(right, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: -o-linear-gradient(right, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: -ms-linear-gradient(right, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  background: linear-gradient(right, rgba(126, 126, 126, 1) 0%, rgba(255, 255, 255, 1) 100%);
  left: 0;
}

#content:after,
#content:before {
  background: #f9f9f9;
  background: -moz-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  background: -webkit-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(0, 156, 254, 1) 100%);
  background: -o-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  background: -ms-linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  background: linear-gradient(top, rgba(248, 248, 248, 1) 0%, rgba(249, 249, 249, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f8f8f8', endColorstr='#f9f9f9', GradientType=0);
  border: 1px solid #c4c6ca;
  content: "";
  display: block;
  height: 100%;
  left: -1px;
  position: absolute;
  width: 100%;
}

#content:after {
  -webkit-transform: rotate(2deg);
  -moz-transform: rotate(2deg);
  -ms-transform: rotate(2deg);
  -o-transform: rotate(2deg);
  transform: rotate(2deg);
  top: 0;
  z-index: -1;
}

#content:before {
  -webkit-transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  -ms-transform: rotate(-3deg);
  -o-transform: rotate(-3deg);
  transform: rotate(-3deg);
  top: 0;
  z-index: -2;
}

#username {
  margin: 0 20px;
  position: relative;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #ed1c24;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  border: 1px solid #c8c8c8;
  color: #777;
  font: 13px Helvetica, Arial, sans-serif;
  margin: 0 0 10px;
  padding: 15px 10px 15px 10px;
  width: 75%;
  outline: none;
  text-align: center;
  left: 25px;
  float: left;
}

#password {
  margin: 0 20px;
  position: relative;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  border: 1px solid #c8c8c8;
  color: #777;
  font: 13px Helvetica, Arial, sans-serif;
  margin: 0 0 10px;
  padding: 15px 10px 15px 10px;
  width: 75%;
  left: 25px;
  float: left;
}


#email {
  margin: 0 20px;
  position: relative;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  border: 1px solid #c8c8c8;
  color: #777;
  font: 13px Helvetica, Arial, sans-serif;
  margin: 0 0 10px;
  padding: 15px 10px 15px 10px;
  width: 75%;
  left: 25px;
  float: left;
}


#CaptchaDiv {
  margin: 0 20px;
  position: relative;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #ed1c24;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  background: #eae7e7;
  border: 1px solid #c8c8c8;
  color: #777;
  font: 13px Helvetica, Arial, sans-serif;
  margin: 0 0 10px;
  padding: 15px 10px 15px 10px;
  width: 75%;
  outline: none;
  text-align: center;
  left: 25px;
  float: left;
}

#submit {
  margin: 0 20px;
  float: left;
  margin: 0 25px;
  position: relative;
  float: right;
  top: 0px;
}

#username:hover {
  background: rgb(254, 193, 81);
  background: -moz-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -webkit-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -o-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -ms-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fec151', endColorstr='#fee79a', GradientType=0);
}

#password:hover {
  background: #C4DADB;
  background: -moz-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -webkit-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -o-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -ms-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fec151', endColorstr='#fee79a', GradientType=0);
}

#email:hover {
  background: #C4DADB;
  background: -moz-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -webkit-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -o-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: -ms-linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  background: linear-gradient(top, rgba(177, 176, 173, 1) 0%, rgba(152, 150, 149, 0.89) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fec151', endColorstr='#fee79a', GradientType=0);
}

.divHelp {
  text-align: center;
  vertical-align: middle;
  width: 50%;
  height: auto;
  margin: 0 auto;
}

.helpLogin {
  min-height: 350px;
  position: relative;
  top: 0px;
  left: 0px;
}

.divHelpMesaj {
  background-color: #EAE7E7;
  border-radius: 10px;
  -moz-border-radius: 10px;
  border: 1px solid #1F4976;
  font-size: 11.5px;
  color: #1F4976;
  font-family: Verdana, Serif;
  text-align: justify;
  padding: 10px;
  display: none;
  width: 430px;
}

.arrow_up_help {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #1F4976;
  left: 50%;
  position: absolute;
}

.auto-style2 {
  background: rgb(254, 231, 154);
  background: -webkit-linear-gradient(top, rgba(254, 231, 154, 1) 0%, rgba(254, 193, 81, 1) 100%);
  background: -o-linear-gradient(top, rgba(254, 231, 154, 1) 0%, rgba(254, 193, 81, 1) 100%);
  background: -ms-linear-gradient(top, rgba(254, 231, 154, 1) 0%, rgba(254, 193, 81, 1) 100%);
  background: rgb(254, 231, 154);
  border: 1px solid #999999;
  color: #0992FC;
  cursor: pointer;
  float: left;
  font: bold 15px Helvetica, Arial, sans-serif;
  height: 30px;
  position: relative;
  width: 120px;
  left: 0px;
  top: 0px;
  background-color: #FFFFFF;
  text-transform: capitalize;
}


</style>
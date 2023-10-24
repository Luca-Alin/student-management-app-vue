import {ref, watch} from "vue";

let userRole = ref(localStorage.getItem('userRole') || '');
watch(userRole, (newVal) => {
    console.log('userRole changed')
    localStorage.setItem('userRole', newVal)
}, {
    deep: true
})

export default userRole;
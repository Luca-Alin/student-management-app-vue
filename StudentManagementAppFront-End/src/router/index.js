import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login.vue";
import PersonalData from "@/views/PersonalData.vue";
import WIP from "@/views/WIP.vue";
import SchoolSituation from "@/views/SchoolSituation.vue";
import SchoolSituationDetail from "@/views/SchoolSituationDetail.vue";
import StudentDetails from "@/views/StudentDetails.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'LoginView',
            component: Login
        },
        {
            path: '/personal-data',
            name: 'PersonalDataView',
            component: PersonalData
        },
        {
            path: '/student-details',
            name: 'StudentDetailsView',
            component: StudentDetails
        },
        {
            path: '/school-situation',
            name: 'SchoolSituationView',
            component: SchoolSituation
        },
        {
            path:'/wip-page/:data',
            name: 'WipPageView',
            component: WIP
        },
        {
            path: '/school-situation-detail/:id',
            name: 'SchoolSituationDetailView',
            component: SchoolSituationDetail
        }
    ]
})

export default router

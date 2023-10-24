import {createRouter, createWebHistory} from 'vue-router'
import StudentLoginView from "@/views/student/StudentLogin.vue";
import PersonalData from "@/views/student/PersonalData.vue";
import WIP from "@/views/student/WIP.vue";
import SchoolSituation from "@/views/student/SchoolSituation.vue";
import SchoolSituationDetail from "@/views/student/SchoolSituationDetail.vue";
import StudentDetails from "@/views/student/StudentDetails.vue";
import FacultyManager from "@/views/admin/FacultyManager.vue";
import StudentManager from "@/views/admin/StudentManager.vue";
import GradesManager from "@/views/admin/GradesManager.vue";
import CourseManager from "@/views/admin/CourseManager.vue";
import AdminLogin from "@/views/admin/AdminLogin.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'LoginView',
            component: StudentLoginView
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
            path: '/wip-page/:data',
            name: 'WipPageView',
            component: WIP
        },
        {
            path: '/admin-login',
            name: 'AdminLoginView',
            component: AdminLogin
        },
        {
            path: '/school-situation-detail/:id',
            name: 'SchoolSituationDetailView',
            component: SchoolSituationDetail
        },
        {
            path: '/faculty-manager',
            name: 'FacultyManagerView',
            component: FacultyManager
        },
        {
            path: '/student-manager',
            name: 'StudentManagerView',
            component: StudentManager
        },
        {
            path: '/grades-manager',
            name: 'GradeManagerView',
            component: GradesManager
        },
        {
            path: '/course-manager',
            name: 'CourseManagerView',
            component: CourseManager
        }
    ]
})

export default router

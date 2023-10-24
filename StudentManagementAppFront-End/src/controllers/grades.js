import {defineStore} from "pinia";
import axios from "axios";
import token from "@/token/token";
import {API_BASE_URL} from "@/config";

export const gradesController = defineStore('grades', {
    state: () => ({
        faculties: [],
        courseId: 0,
        studentId: 0
    }),
    actions: {
        setCourseId(courseId) {
            this.courseId = courseId;
        },
        setStudentId(studentId) {
            this.studentId = studentId;
        },
        async fetchGradeByCourseIdAndStudentId() {
            let grade = null;
            await axios.get(
                `${API_BASE_URL}/grade/${this.courseId}/${this.studentId}`

                , {
                headers: {
                    "Authorization": "bearer " + token.value
                }
            })
                .then(response => {
                    let i = response.data;
                    grade = {
                        id: i.id,
                        value: i.value
                    };
                })
                .catch(error => {
                    console.log(error);
                });
            return grade;
        }
    }
})
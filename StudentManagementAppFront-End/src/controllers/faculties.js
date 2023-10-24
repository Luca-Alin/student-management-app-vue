import {defineStore} from "pinia";
import axios from "axios";
import token from "@/token/token";
import {API_BASE_URL} from "@/config";

export const facultyController = defineStore('faculties', {
    state: () => ({
        faculties: []
    }),

    actions: {
        async fetchAllFaculties() {
            await axios.get(API_BASE_URL + '/faculty/all', {
                headers: {
                    "Authorization": "bearer " + token.value
                }
            })
                .then(async response => {
                    this.faculties.value = response.data
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async updateFacultyName(faculty) {
            let newName = prompt("Enter new name", faculty.name)
            if (newName != null) {
                await axios.put(API_BASE_URL + '/faculty/update', {
                    id: faculty.id,
                    name: newName
                }, {
                    headers: {
                        "Authorization": "bearer " + token.value
                    }
                })
                    .then(async response => {
                        await this.fetchAllFaculties();
                        alert(response.data)
                    })
                    .catch(async error => {
                        await this.fetchAllFaculties();
                        console.log(error);
                        alert("Update failed!")
                    });
            }
        },
        async deleteFaculty(faculty) {
            await axios.delete(API_BASE_URL + '/faculty/delete', {
                headers: {
                    Authorization: "bearer " + token.value
                },
                data: {
                    id: faculty.id,
                    name: faculty.name
                }
            }).then(async response => {
                await this.fetchAllFaculties();
                alert(response.data)
            })
                .catch(async error => {
                    await this.fetchAllFaculties();
                    alert(error)
                });
            }
    }
})
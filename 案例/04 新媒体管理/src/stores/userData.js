import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserDataStore = defineStore('userData', () => {
    const userData = ref([{
        username: 'Jeang',
        password: '1900'
    },
    {
        username: 'admin',
        password: '123456'
    }
    ])
    return { userData }
}, {
    persist: {
        storage: localStorage,
    },
})
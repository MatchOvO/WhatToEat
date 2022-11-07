import { defineStore } from 'pinia'

export const useStatusStore =defineStore({
    id:'status',
    state:() => ({
        alertText:'发生未知错误'
    })
})
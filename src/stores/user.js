import { defineStore } from 'pinia'

export const useUserStore =defineStore({
    id:'user',
    state:() => ({
        username:'',
        isGuest:true,
        community:'',
        source:'public',
        personalMenu:[]
    })
})
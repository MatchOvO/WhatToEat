import { defineStore } from 'pinia'

export const useUserStore =defineStore({
    id:'user',
    state:() => ({
        username:'',
        avatarUrl:'',
        avatar:'1',
        isGuest:true,
        community:'',
        source:'public',
        type:'主食',
        typeCustom:'自定义',
        personalMenu:[]
    })
})
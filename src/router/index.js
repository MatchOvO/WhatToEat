import {createRouter,createWebHashHistory} from 'vue-router'
import AppIndex from "@/components/AppIndex";
import AppCustom from "@/components/AppCustom";
import AppUser from "@/components/AppUser"

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:AppIndex
        },
        {
            path:'/custom',
            component:AppCustom
        },
        {
            path:'/user',
            component:AppUser
        }
    ]
})

export default router
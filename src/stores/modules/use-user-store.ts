import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { UserApi } from "@/apis/modules/user";

export interface User {
  username: string;
  avatarUrl: string;
}

export const useUserStore = defineStore("user-store", ()=>{
  const token = useLocalStorage("xb-token", "")
  const isAuthenticated = computed(()=>{
   return !!token.value 
  })
  const user = ref<User | null>(null)
  // TODO: 完善后端后再来
  const initUser = async () => {
   // 使用token来获取用户的信息
   const res = await UserApi.getUserInfo()
   user.value = res 
  }
  const getUser = () => {
    return user.value
  }
  const getToken = () => {
    return token.value
  }
  return {
    user,
    isAuthenticated,
    getToken,
    initUser,
    getUser
  }
})
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export interface User {
  username: string;
  avaterUrl: string;
  token: string;
  permission: string[];
}

export const useUserStore = defineStore("user-store", ()=>{
  const user = useLocalStorage<User>('user', {
    username: '',
    avaterUrl: '',
    token: '',
    permission: [],
  })
  const isAuthenticated = computed(()=>{
   return !!user.value.token 
  })
  const getToken = () => {
    return user.value.token
  }
  return {
    user,
    isAuthenticated,
    getToken
  }
})
import axios from "axios";

export const instance = axios.create({ 
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true, 
})

export const profileApi = {
   logOut(){
    return instance.delete('/auth/me')
   },
   changeProfileData(name:string){
    return instance.put('/auth/me',{name})
   }
}

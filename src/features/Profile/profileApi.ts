import axios from "axios";

export const instance = axios.create({ 
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/', 
    withCredentials: true, 
})

export const profileApi = {
   me(){
    return instance.post<ResponceType>('/auth/me')
   },
   registration(){
    return instance.post('/auth/register', {
        email: "gavrilenko10919@gmail.com",
        password: "passsword123"
        })
   },
   login(){
    return instance.post('/auth/login',{ 
        email: "gavrilenko10919@gmail.com" ,
        password: "passsword123" ,
        rememberMe: false })
   },
   logOut(){
    return instance.delete('/auth/me')
   },
   changeProfileData(name:string){
   // return instance.put('/auth/me',{name})
    return instance.put('https://neko-back.herokuapp.com/2.0/auth/me',{name})
   }
}

export type ResponceType = {
        _id: string;
        email: string;
        name: string;
        avatar?: string;
        publicCardPacksCount: number; // количество колод
        
        created: Date; 
        updated: Date;
        isAdmin: boolean;
        verified: boolean; // подтвердил ли почту
        rememberMe: boolean;
        
        error?: string;
} 
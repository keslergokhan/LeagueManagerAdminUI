import axios from "axios";
import { IResultDataControl } from "../commons/base/baseResultControl";
import { ResultDataControl } from "../commons/results/resultControl";
import { GetJwtTokenResModel } from "../models/auths/getJwtTokenResModel";


export class AuthService
{
    public static GetLocalJwt = ():IResultDataControl<GetJwtTokenResModel> =>{
        var model:IResultDataControl<GetJwtTokenResModel> = new ResultDataControl<GetJwtTokenResModel>();
        const tokenKey = import.meta.env.VITE_CMS_API_JWT_KEY;
        const storageValue = localStorage.getItem(tokenKey);

        if(storageValue){
            model = JSON.parse(storageValue) as IResultDataControl<GetJwtTokenResModel>;
        }
        return model;
    }

    /**
     * Cms jwt token url
     * @returns 
     */
    private static GetJwtTokenUrl = () =>{
        return `${import.meta.env.VITE_CMS_API_URL}${import.meta.env.VITE_CMS_API_LOGIN_PATH}`;
    }

    /**
     * Cms jwt token
     * @returns 
     */
    private static  GetJwtTokenFetchAsync = async (email:string,password:string):Promise<IResultDataControl<GetJwtTokenResModel>> =>{
        var result = new ResultDataControl<GetJwtTokenResModel>();
        try{
            const tokenKey = import.meta.env.VITE_CMS_API_JWT_KEY;
            const result = await axios.post<IResultDataControl<GetJwtTokenResModel>>(this.GetJwtTokenUrl(),{
                email:email,
                password: password
            }).then(x=>x.data);
    
            if(result.isSuccess){
                localStorage.setItem(tokenKey,JSON.stringify(result));
            }
            return result;
        }catch{
            result.Fail();
        }
        
        return result;
    }

    /**
     * Cms Jwt token döndürür.
     * Token değeri localStorage üzerinde kontrol edilir mevcutsa yeni token alınmaz.
     * 
     * @returns 
     */
    public static GetJwtTokenAsync = async (email:string,password:string):Promise<IResultDataControl<GetJwtTokenResModel>> => {
        let model:IResultDataControl<GetJwtTokenResModel> = new ResultDataControl<GetJwtTokenResModel>;

        const tokenKey = import.meta.env.VITE_CMS_API_JWT_KEY;
        var dateNow = new Date();
        const storageValue = localStorage.getItem(tokenKey);

        if(storageValue == null){
            model = await this.GetJwtTokenFetchAsync(email,password);
        }else{
            
            model = JSON.parse(storageValue) as IResultDataControl<GetJwtTokenResModel>;
            const tokenExires = new Date(model.data.expires)
            
            if(tokenExires > dateNow){
                return model;
            }else{
                model = await this.GetJwtTokenFetchAsync(email,password);
            }
        }

        return model;
    }
   
}
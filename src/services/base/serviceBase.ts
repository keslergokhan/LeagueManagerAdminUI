import { AxiosRequestConfig } from "axios";
import { IResultDataControl } from "../../commons/base/baseResultControl";
import { ResultDataControl } from "../../commons/results/resultControl";
import { GetJwtTokenResModel } from "../../models/auths/getJwtTokenResModel";
import { AuthService } from "../authService";


export class ServiceBase {
    protected GetApiPath:string;


    /**
     *
     */
    constructor(GetApiPath:string) {
        this.GetApiPath = GetApiPath;        
    }
    
    private GetHeaderBearerToken():string{
        const getLocalJwt:IResultDataControl<GetJwtTokenResModel> = AuthService.GetLocalJwt();

        if(!getLocalJwt.isSuccess){
            throw new Error("User auth error !");
        }
        return `Bearer ${getLocalJwt.data.token}`;
    }

    protected AxiosHeaderConfig = ():AxiosRequestConfig<any> =>{
        return {
            headers:{
                Authorization:this.GetHeaderBearerToken(),
                "Cache-Control": "no-cache",
                "Content-Type": "application/json"
            }
        }
    }
}
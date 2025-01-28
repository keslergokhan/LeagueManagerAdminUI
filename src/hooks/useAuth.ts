import axios from "axios"
import { useState } from "react";
import { IResultDataControl } from "../commons/base/baseResultControl";

export interface UseAuthRes {
    id:string;
    email:string;
    name:string;
    surname:string;
    roles:[];   
}


export const useAuth = ():IResultDataControl<UseAuthRes> | undefined =>{
    const [useAuth,setAuth] = useState<IResultDataControl<UseAuthRes>>();
    /*
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {
        const fetch = async () =>{
            const url = `${import.meta.env.VITE_CMS_API_URL}${import.meta.env.VITE_CMS_API_AUTH_VALID}`;
            
            const getLocalJwt:IResultDataControl<GetJwtTokenRes> = AuthService.GetLocalJwt();
            if(getLocalJwt.isSuccess){
                let result = null;
                
                await axios.post<IResultDataControl<UseAuthRes>>(url,null,{
                    headers:{
                        Authorization:`Bearer ${getLocalJwt.data.token}`
                    }
                })
                .then(x=>{
                    console.log("auth control");
                    return x;
                })
                .then(x=> {
                    setAuth(x.data);
                    if((location.pathname=='/' || location.pathname==PageRoutes.Login.Path) || location.pathname == PageRoutes.Login.Path){
                        navigate(PageRoutes.Home.Path);
                    }
                }).catch(x=>{
                    setAuth(undefined);
                    if((location.pathname=='/' || location.pathname==PageRoutes.Login.Path) || location.pathname != PageRoutes.Login.Path){
                        navigate('/login');
                        localStorage.clear();
                    }
                });

            }else{
                if(location.pathname !='/' || location.pathname != PageRoutes.Login.Path){
                    navigate('/login');
                }
            }
        }
        fetch();
    },[]);
    */
    return useAuth;
    
}
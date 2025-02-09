import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageRoutes } from "../constants/pageRoute";
import { LeagueService } from "../services/leagueService";
import { ToastHelper } from "../commons/helpers/toastHelpers";
import { DefaultLayout } from "../layouts/defaultLayout";
import { useSetBreadCrumb2 } from "../hooks/useBranchCrumb";


export const SeasonPage = ():JSX.Element => {

    useSetBreadCrumb2(PageRoutes.Season,false);
    
    const leagueService = new LeagueService();
    const navigate = useNavigate();
    const {id} = useParams();
    let SEASON = null;

    useEffect(()=>{
        leagueService.Get(id).then(x=>{
            if(x.isSuccess && x.data!=null){
            }else{
                ToastHelper.DefaultError();
                setTimeout(() => {
                    navigate(PageRoutes.League.Path);
                }, 500);
            }
        })
    },[id]);

    return (<>
        <DefaultLayout>
            Sezonlar
        </DefaultLayout>
    </>);
}
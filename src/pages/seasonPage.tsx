import { useNavigate, useParams } from "react-router-dom";
import { PageRoutes } from "../constants/pageRoute";
import { LeagueService } from "../services/leagueService";
import { ToastHelper } from "../commons/helpers/toastHelpers";
import { ReadLeagueDto } from "../entities/dtos/leagues/readLeagueDto";
import { useEffect, useLayoutEffect,useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { LoadingLayout } from "../layouts/loadingLayout";
import { CmsCardBody } from "../components/shareds/cmsCardBody";
import { SeasonFormComponent } from "../components/seasonComponents/seasonFormComponent";
import { Typography } from "@mui/material";

export const SeasonPage = ():JSX.Element => {

    const appContext = useAppContext();
    const [isLoading,setLoadingState] = useState<boolean>(true);
    const [League,setLeague] = useState<ReadLeagueDto>({
        name:"",
        id:"",
        logoImage:"",
        seasons:[],
        state:0
    });

    const leagueService = new LeagueService();
    const navigate = useNavigate();
    const {id} = useParams();
    

    
    useEffect(()=>{
        leagueService.Get(id).then(x=>{
            if(x.isSuccess && x.data!=null){                
                setLeague(x.data);               
                appContext.SetArrayBreadCrumbs([{title:PageRoutes.Season.Title},{title:x.data.name}],false);
            }else{
                ToastHelper.DefaultError();
                setTimeout(() => {
                    navigate(PageRoutes.League.Path);
                }, 850);
            }
            setLoadingState(false); 
        })
    },[id]);



    return (
        <LoadingLayout isLoading={isLoading}>
            <Typography variant="h6" textAlign={"end"} > {League.name} Sezonları</Typography>
            <CmsCardBody xlCol={12} xxlCol={12}>
                <SeasonFormComponent league={League} ></SeasonFormComponent>
            </CmsCardBody>
        </LoadingLayout>
    );
}
import { useNavigate, useParams } from "react-router-dom";
import { PageRoutes } from "../constants/pageRoute";
import { LeagueService } from "../services/leagueService";
import { ToastHelper } from "../commons/helpers/toastHelpers";
import { DefaultLayout } from "../layouts/defaultLayout";
import { ReadLeagueDto } from "../entities/dtos/leagues/readLeagueDto";
import { useLayoutEffect,useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const SeasonPage = ():JSX.Element => {

    const appContext = useAppContext();
    const [isLoading,setLoadingState] = useState<boolean>(true);
    
    const leagueService = new LeagueService();
    const navigate = useNavigate();
    const {id} = useParams();
    let League:ReadLeagueDto= {
        name:"",
        id:"",
        logoImage:"",
        seasons:[],
        state:0
    };

    
    useLayoutEffect(()=>{
        leagueService.Get(id).then(x=>{
            if(x.isSuccess && x.data!=null){
                League=x.data;
                appContext.SetArrayBreadCrumbs([{title:League.name,path:""},{title:PageRoutes.Season.Title,path:PageRoutes.Season.Path}],false);
                setLoadingState(false);
            }else{
                ToastHelper.DefaultError();
                setTimeout(() => {
                    navigate(PageRoutes.League.Path);
                }, 500);
            }
        })
    },[id]);


    return (<>
        {
            isLoading ? <>Yükleniyor</>
            :
            <>
                <DefaultLayout>
                    Sezonlar
                </DefaultLayout>
            </>
        }
        
    </>);
}
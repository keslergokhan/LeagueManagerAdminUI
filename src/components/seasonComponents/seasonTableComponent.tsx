import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { ReadLeagueDto } from "../../entities/dtos/leagues/readLeagueDto";
import { TableContainer,Table,TableCell,TableRow,TableHead,TableBody,Stack,Button} from "@mui/material";
import { SeasonService } from "../../services/seasonService";
import { ToastHelper } from "../../commons/helpers/toastHelpers";
import { ReadSeasonDto } from "../../entities/dtos/seasons/readSeasonDto";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CmsCardBody } from "../shareds/cmsCardBody";
import { SeasonFormComponent } from "./seasonFormComponent";

export interface SeasonTamleComponentProps {
    league:ReadLeagueDto
}

export const SeasonTableComponent = (props:SeasonTamleComponentProps):JSX.Element =>{

    const seasonService = new SeasonService();
    const [seasonList,setSeasonList] = useState<Array<ReadSeasonDto>>();

    useEffect(()=>{
        refreshHandler();
    },[]);

    type formState = {
        addFormState:boolean,
    }

    const formsState:formState = {addFormState:false}

    const formReducerDispatchHandler = (state:formState,action:"addFromShow"|"addFromCencel")=>{{
        if(action == "addFromShow"){ return {addFormState : true}}
        if(action == "addFromCencel"){ return {addFormState : false}}
        return state;
    }}

    const [formReducer,formReducerDispatch] = useReducer(formReducerDispatchHandler,formsState);

    /**
     * Veri çekme
     */
    const refreshHandler = async () => {
        seasonService.GetAllSeasonByLeagueID(props.league.id).then(x=>{
            setSeasonList(x.data);
        }).catch(x=>{
            ToastHelper.DefaultError();
        })
    }

    // #region TableRow and Body

        const Row = (data:ReadSeasonDto,i:number):JSX.Element => {
            return (
                <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>
                        <span className="text-success">{new Date(data.startDate).toLocaleDateString()}</span> - <span className="text-danger">{new Date(data.endDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell align="right">
                        <Button variant="contained"  color="success" size="small" endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Güncelle</Button>
                    </TableCell>
                </TableRow>
            );
        }

        const Body = ():JSX.Element =>{
            return (
                <>
                    {seasonList?.map((x,i)=>{
                        return Row(x,i+1);
                    })}
                </>
            );
        }

    // #endregion End TableRow and Body


    // #region Form

        const SeasonFormContentHtml = ():JSX.Element =>{
            return (
                <SeasonFormComponent dispatch={formReducerDispatch} league={props.league} tableRefresh={refreshHandler} ></SeasonFormComponent>
            );
        }
    
    // #endregion End Form

    return (
        <>
            <CmsCardBody xlCol={12} xxlCol={12}>
                {(formReducer.addFormState ? <SeasonFormContentHtml></SeasonFormContentHtml>:<></>)}
                <TableContainer>
                    <Stack direction="row" justifyContent="flex-end">
                        <Stack direction="row" spacing={2} >
                            <Button variant="contained" size="small" onClick={async ()=>{await refreshHandler()}} color="primary" ><Icon icon="material-symbols:refresh" width="24" height="24"  style={{color: "#fff"}} /></Button>
                            <Button variant="contained" size="small" onClick={(e)=>{formReducerDispatch("addFromShow")}} color="success" endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Yeni Ekle</Button>
                        </Stack>
                    </Stack>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>*</TableCell>
                                <TableCell>Sezon</TableCell>
                                <TableCell>Başlangıç / Bitiş</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                    
                        <TableBody>
                            <Body></Body>
                        </TableBody>

                    </Table>
                </TableContainer>
            </CmsCardBody>
            
        </>
    );
}
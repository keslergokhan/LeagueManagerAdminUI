import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { ReadLeagueDto } from "../../entities/dtos/leagues/readLeagueDto";
import { TableContainer,Table,TableCell,TableRow,TableHead,TableBody,Stack,Button, Alert, Snackbar, Chip} from "@mui/material";
import { SeasonService } from "../../services/seasonService";
import { ToastHelper } from "../../commons/helpers/toastHelpers";
import { ReadSeasonDto } from "../../entities/dtos/seasons/readSeasonDto";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CmsCardBody } from "../shareds/cmsCardBody";
import { SeasonAddForm } from "./seasonAddFormComponent";
import { SeasonUpdateForm } from "./seasonUpdateFormComponent";

export interface SeasonTamleComponentProps {
    league:ReadLeagueDto
}

export interface SeasonFormState {
    addFormState:boolean,
    updateFormState:boolean,
    season:ReadSeasonDto|undefined
}

export interface SeasonFormAction{
    type:"ADD_FORM_SHOW"|"ADD_FORM_CENCEL"|"UPDATE_FORM_CENCEL"|"UPDATE_FORM_SHOW",
    payload?:ReadSeasonDto
}

export const SeasonTableComponent = (props:SeasonTamleComponentProps):JSX.Element =>{

    const seasonService = new SeasonService();
    const [seasonList,setSeasonList] = useState<Array<ReadSeasonDto>>();

    useEffect(()=>{
        refreshHandler();
    },[]);


    const formState:SeasonFormState = {addFormState:false,updateFormState:false,season:undefined}

    const formReducerDispatchHandler = (state:SeasonFormState,action:SeasonFormAction):SeasonFormState=>{

        if(action.type == "ADD_FORM_SHOW"){ 
            return {...formState,addFormState:true}
        }

        if(action.type == "ADD_FORM_CENCEL"){ 
            return {...formState,addFormState:false}
        }

        if(action.type == "UPDATE_FORM_SHOW"){ 
            return {...formState,updateFormState:true,season:action.payload}
        }

        if(action.type == "UPDATE_FORM_CENCEL"){ 
            return {...formState,updateFormState:false}
        }
        
        return state;
    }

    const [formReducer,formReducerDispatch] = useReducer(formReducerDispatchHandler,formState);

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
                    <TableCell>{i}. {(data.isFinish ? <Chip label="Bitti" color="error"></Chip>:<Chip label="Aktif" color="success"></Chip>)}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>
                        <span className="text-success">{new Date(data.startDate).toLocaleDateString()}</span> - <span className="text-danger">{new Date(data.endDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell align="right">
                        <Button variant="contained" onClick={(e)=>{formReducerDispatch({type:"UPDATE_FORM_SHOW",payload:data}); }}  color="success" size="small" endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Güncelle</Button>
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
                <SeasonAddForm dispatch={formReducerDispatch} league={props.league} tableRefresh={refreshHandler} ></SeasonAddForm>
            );
        }

        const SeasonUpdateFormContentHtml = ():JSX.Element =>{
            return (
                <SeasonUpdateForm season={formReducer.season} dispatch={formReducerDispatch} league={props.league} tableRefresh={refreshHandler} ></SeasonUpdateForm>
            );
        }
    
    // #endregion End Form

    return (
        <>
            <CmsCardBody xlCol={12} xxlCol={12}>
                {(formReducer.addFormState ? <SeasonFormContentHtml></SeasonFormContentHtml>:<></>)}
                {(formReducer.updateFormState ? <SeasonUpdateFormContentHtml></SeasonUpdateFormContentHtml>:<></>)}
                <TableContainer>
                    <Stack direction="row" justifyContent="flex-end">
                        <Stack direction="row" spacing={2} >
                            <Button variant="contained" size="small" onClick={async ()=>{await refreshHandler()}} color="primary" ><Icon icon="material-symbols:refresh" width="24" height="24"  style={{color: "#fff"}} /></Button>
                            <Button variant="contained" size="small" onClick={(e)=>{formReducerDispatch({type:"ADD_FORM_SHOW"})}} color="success" endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Yeni Ekle</Button>
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
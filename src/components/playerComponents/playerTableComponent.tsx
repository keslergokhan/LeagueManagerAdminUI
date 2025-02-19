import { Icon } from "@iconify/react/dist/iconify.js";
import { PlayerService } from "../../services/playerService";
import { useSetBreadCrumb } from "../../hooks/useBranchCrumb";
import { useEffect, useReducer, useRef, useState } from "react";
import { ReadPlayerDto } from "../../entities/dtos/players/readPlayerDto";
import { ToastHelper } from "../../commons/helpers/toastHelpers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Chip, IconButton, Stack } from "@mui/material";
import { PlayerPosition } from "../../constants/playerLocation";
import { useSpinner } from "../../hooks/useSpinnerElement";
import { PlayerAddForm } from "./playerAddFormComponent";
import { PlayerUpdateForm } from "./playerUpdateFormComponent";
import { CityService } from "../../services/cityService";
import { SearchSelectItem } from "../../models/shareds/searchSelectItem";
import { TeamService } from "../../services/teamService";
import { DistrictService } from "../../services/districtService";
import { Loading } from "../shareds/loadingComponent";

export interface PlayerFormState{
    addFormState:boolean
    updateFormState:boolean
    player:ReadPlayerDto|undefined
}

export interface PlayerFormAction{
    type:"ADD_FORM_SHOW"|"ADD_FORM_CENCEL"|"UPDATE_FORM_CENCEL"|"UPDATE_FORM_SHOW",
    player?:ReadPlayerDto
}

export const PlayerTable = ():JSX.Element =>{
    
    // #region Services
    const playerService = new PlayerService();
    const cityService = new CityService();
    const teamService = new TeamService();
    const districtService = new DistrictService();
    // #endregion EndServices
    
    
    useSetBreadCrumb({title:"Oyuncular",path:"/player"},true);

    // #region Data
    const tableRef = useRef<HTMLDivElement>(null);
    const [ALL_PLAYER_DATA,SET_PLAYER_DATA] = useState<Array<ReadPlayerDto>>(new Array<ReadPlayerDto>());
    const formReducerState:PlayerFormState = {addFormState:false,updateFormState:false,player:undefined }
    let citySelectData = new Array<SearchSelectItem<string>>();
    let teamSelectData = new Array<SearchSelectItem<string>>();
    const [isLoading,setLoadingState] = useState<boolean>(true);
    // #endregion End Data

    
    
    // #region Handler
    const formReducerHandler = (state:PlayerFormState,action:PlayerFormAction):PlayerFormState =>{

        if(action.type == "ADD_FORM_SHOW"){ 
            return {...formReducerState,addFormState:true}
        }

        if(action.type == "ADD_FORM_CENCEL"){ 
            return {...formReducerState,addFormState:false}
        }

        if(action.type == "UPDATE_FORM_SHOW"){ 
            return {...formReducerState,updateFormState:true,player:action.player}
        }

        if(action.type == "UPDATE_FORM_CENCEL"){ 
            return {...formReducerState,updateFormState:false}
        }

        return state;
    }
    /**
     * Yeni veri çekme
     */
    const refreshDataAsync = async ():Promise<void> =>{
        setSpinnerState(true);
        playerService.GetAllAsync().then((x)=>{
            if(!x.isSuccess){
                throw new Error();
            }
            SET_PLAYER_DATA(x.data);
        }).catch((x)=>{
            ToastHelper.DefaultError();
        }).finally(()=>{
            setSpinnerState(false);
        })
    }

    const getAllSelectDataAsync = async () =>{
        await cityService.GetSelectDataAsync("name").then(x=>{
            if(x.isSuccess){
                citySelectData = x.data;
            }else{
                ToastHelper.DefaultError();
            }
        }).finally(()=>{
            setLoadingState(false);
        });
        
        await teamService.GetSelectDataAsync("name").then(x=>{
            if(x.isSuccess){
                teamSelectData = x.data;
            }else{
                ToastHelper.DefaultError();
            }
        });
    }
    // #endregion EndHandler
    
    // #region Hooks
    const [tableSpinnerHtml,setSpinnerState,spinnerState] = useSpinner(tableRef,{color:"black",width:"50",height:"50"},(<>Yüklenyior</>));
    const [formReducer,formReducerDispatch] = useReducer(formReducerHandler,formReducerState);
    // #endregion End Hooks
    

    

    useEffect(()=>{
        refreshDataAsync();
        getAllSelectDataAsync();
    },[])

    // #region TableGridHeader
        const columns: GridColDef<ReadPlayerDto>[] = [
            { 
                field: 'id', 
                headerName: 'Adet', 
                width: 10,
                renderCell:(e)=>{
                    return e.api.getRowIndexRelativeToVisibleRows(e.id) + 1
                }
            },
            {
                field: 'nameAndSurname',
                headerName: 'Ad Soyad',
                width: 150,
                editable: false,
            },
            {
                field: 'eposta',
                headerName: 'Eposta',
                width: 150,
                editable: false,
            },
            {
                field: 'age',
                headerName: 'Yaş',
                type: 'number',
                width: 90,
                renderCell:(x)=>{
                    return x.row.playerInfo.age;
                },
                editable: false,
            },
            {
                field: 'IsCaptain',
                headerName: 'Kaptan',
                description: 'Oyuncunu takım içi kaptan olup olmadığını belirtir.',
                sortable: false,
                width: 90,
                renderCell:(x)=>{
                    if(x.row.playerInfo.isCaptain){
                        return <Chip label="K" color="warning"></Chip>
                    }else{
                        return <Chip label="-" ></Chip>
                    }
                }
            },
            {
                field: 'City',
                headerName: 'Şehir',
                description: 'Oyuncunun bulunduğu şehir.',
                sortable: false,
                renderCell:(x)=>{
                    return x.row.playerInfo.city.name
                },
                width: 160,
            },
            {
                field: 'District',
                headerName: 'İlçe',
                description: 'Oyuncunun bulunduğu İlçe.',
                sortable: false,
                renderCell:(x)=>{
                    return x.row.playerInfo.district.name
                },
                width: 160,
            },
            {
                field: 'Location1',
                headerName: '1. Konum',
                description: 'Oyuncunun iyi olduğu konum.',
                sortable: false,
                renderCell:(x)=>{
                    return PlayerPosition.find(i=>i.value == x.row.playerInfo.location1)?.key
                },
                width: 160,
            },{
                field:"Action",
                headerName:"İşlemler",
                sortable:false,
                renderCell:(x)=>{
                    return rowActionButton(x.row)
                },
                width:100
            }

        ];

      
        const rowActionButton = (value:ReadPlayerDto):JSX.Element =>{
            return (
                <>
                    <IconButton color="error" title="Oyuncuyu Sil !">
                        <Icon icon="weui:delete-filled" width="24" height="24"  />
                    </IconButton>
                    <IconButton color="success" title="Oyuncuyu Güncelle " onClick={()=>{formReducerDispatch({type:"UPDATE_FORM_SHOW",player:value})}}>
                        <Icon icon="akar-icons:pencil" width="24" height="24"  />
                    </IconButton>
                </>
            )
        }
    // #endregion End TableGridHeader

    const AddFormHtml = ():JSX.Element =>{
        console.log(citySelectData);
        return (<PlayerAddForm 
            citySelectData={citySelectData} 
            teamSelectData={teamSelectData} 
            dispatch={formReducerDispatch} 
            refresh={refreshDataAsync }></PlayerAddForm>)
    }

    const UpdateFormHtml = ():JSX.Element =>{
        return (<PlayerUpdateForm
            citySelectData={citySelectData} 
            teamSelectData={teamSelectData} 
            dispatch={formReducerDispatch} 
            refresh={refreshDataAsync} 
            player={formReducer.player}></PlayerUpdateForm>);
    }

    return (
        <>
            <Loading isLoading={isLoading}>
                {formReducer.addFormState == true ? <AddFormHtml></AddFormHtml>:<></>}
                {formReducer.updateFormState == true ? <UpdateFormHtml></UpdateFormHtml>:<></>}
                <Stack direction="column" spacing={2} sx={{width:"100%",marginTop:(formReducer.updateFormState || formReducer.addFormState ? "100px":"0px")}}>
                    <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
                        <Button variant="contained" size="small" color="primary" onClick={()=>{refreshDataAsync()}} ><Icon icon="material-symbols:refresh" width="24" height="24"  style={{color: "#fff"}} /></Button>
                        <Button variant="contained" size="small" onClick={(e)=>{formReducerDispatch({type:"ADD_FORM_SHOW"})}} color="success" endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Yeni Ekle</Button>
                    </Stack>
                    <div ></div>
                    {
                        spinnerState ?
                            <Stack justifyItems="center" alignItems="center" >{tableSpinnerHtml}</Stack>
                            :
                            <DataGrid
                                ref={tableRef}
                                rows={ALL_PLAYER_DATA}
                                columns={columns}
                                initialState={{
                                pagination: {
                                    paginationModel: {
                                    pageSize: 5,
                                    },
                                },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection={false}
                                disableRowSelectionOnClick
                            
                            />
                    }
                    
                </Stack>
            </Loading>
        </>
        
    )
}
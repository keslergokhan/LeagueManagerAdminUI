import { Icon } from "@iconify/react/dist/iconify.js";
import { PlayerService } from "../../services/playerService";
import { useSetBreadCrumb } from "../../hooks/useBranchCrumb";
import { useEffect, useRef, useState } from "react";
import { ReadPlayerDto } from "../../entities/dtos/players/readPlayerDto";
import { ToastHelper } from "../../commons/helpers/toastHelpers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip, colors, IconButton, Stack } from "@mui/material";
import { PlayerPosition } from "../../constants/playerLocation";
import { useSpinner } from "../../hooks/useSpinnerElement";

export const PlayerTable = ():JSX.Element =>{
    const playerService = new PlayerService();
    useSetBreadCrumb({title:"Oyuncular",path:"/player"},true);
    const tableRef = useRef<HTMLDivElement>(null);
    const [tableSpinnerHtml,setSpinnerState,spinnerState] = useSpinner(tableRef,{color:"black",width:"50",height:"50"},(<>Yüklenyior</>));
    
    const [ALL_PLAYER_DATA,SET_PLAYER_DATA] = useState<Array<ReadPlayerDto>>(new Array<ReadPlayerDto>());

    const refreshDataAsync = async ():Promise<void> =>{
        setSpinnerState(true);
        playerService.GetAllAsync().then((x)=>{
            if(!x.isSuccess){
                throw new Error();
            }
            SET_PLAYER_DATA(x.data);
        }).catch((x)=>{
            console.log(x);
            ToastHelper.DefaultError();
        }).finally(()=>{
            setSpinnerState(false);
        })
    }

    useEffect(()=>{
        
        refreshDataAsync();
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
                renderCell:()=>{
                    return rowActionButton()
                },
                width:100
            }

        ];

      
        const rowActionButton = ():JSX.Element =>{
            return (
                <>
                    <IconButton color="error" title="Oyuncuyu Sil !">
                        <Icon icon="weui:delete-filled" width="24" height="24"  />
                    </IconButton>
                    <IconButton color="success" title="Oyuncuyu Güncelle ">
                        <Icon icon="akar-icons:pencil" width="24" height="24"  />
                    </IconButton>
                </>
            )
        }
    // #endregion End TableGridHeader

    

    return (
        <>
            
            <Stack direction="column" spacing={2} sx={{width:"100%"}}>
                <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
                    <Button variant="contained" size="small" color="primary" onClick={()=>{refreshDataAsync()}} ><Icon icon="material-symbols:refresh" width="24" height="24"  style={{color: "#fff"}} /></Button>
                    <Button variant="contained" size="small" color="success" endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Yeni Ekle</Button>
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
            
        </>
        
    )
}
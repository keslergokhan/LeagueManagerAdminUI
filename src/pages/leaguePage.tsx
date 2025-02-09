import { useState } from "react";
import { DynamicTable, DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import * as Yup from 'yup'
import { Lclztn } from "../constants/localization";
import { Alert, ButtonGroup, TableCell} from "@mui/material";
import { Field,ErrorMessage,} from "formik";
import { DefaultLayout } from "../layouts/defaultLayout";
import { WriteLeagueDto } from "../entities/dtos/leagues/writeLeagueDto";
import { ReadLeagueDto } from "../entities/dtos/leagues/readLeagueDto";
import { LeagueService } from "../services/leagueService";
import {Button} from "@mui/material";
import { ReadSeasonDto } from "../entities/dtos/seasons/readSeasonDto";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../constants/pageRoute";
import { useBreadCrumb, useSetBreadCrumb2 } from "../hooks/useBranchCrumb";

export const LeaguePage = ():JSX.Element=>{
    
    useSetBreadCrumb2(PageRoutes.League,true);
    const navigate= useNavigate();
    const teamService = new LeagueService();
    const EMTPY_TEAM:WriteLeagueDto = {
        name:"",
        state:0,
        logoImage:""
    }; 
    const [TEAM,SET_TEAM] = useState<WriteLeagueDto>(EMTPY_TEAM);
    
    const dynamicTableProp:DynamicTableProp<WriteLeagueDto,ReadLeagueDto> = {
        Title:"Ligler",
        InitialValues : EMTPY_TEAM,
        UseStateData:TEAM,
        ValidationSchema : Yup.object({
            name:Yup.string().required(Lclztn.empty().Get()).max(50,Lclztn.max().AddValue("3-50").Get()).min(3,Lclztn.min().AddValue("3-50").Get()),
            logoImage:Yup.string().required(Lclztn.empty().Get()).max(50,Lclztn.max().AddValue("3-50").Get()).min(3,Lclztn.min().AddValue("3-50").Get())
        }),
        TableHeadHtml:(
            <>
                <TableCell>Lig</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Sezon</TableCell>
                <TableCell>Sezon İşlem</TableCell>
            </>
        ),
        TableRow : (data:ReadLeagueDto)=>{
           
            const season:ReadSeasonDto|null = data.seasons.length>0?data.seasons[data.seasons.length -1 ]:null;
            
            return (
            <>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.logoImage}</TableCell>
                <TableCell>{(season!=null ? <Alert severity="info">{season.name}</Alert >:<Alert severity="error">YOK</Alert> )} </TableCell>
                <TableCell> 
                   <Button variant="outlined"  onClick={()=>navigate(PageRoutes.Season.SetID(data.id))} >Sezon Ekle</Button>
                </TableCell>
            </>);
        },
        GetDataServiceAsync:teamService.GetAllAsync,
        AddFormSubmitHandlerAsync:async (data:WriteLeagueDto)=>{
            return await teamService.AddAsync(data);
        },
        AddFormHtml:()=>{

            return (
                <>
                    <div>
                        <label>Lig Adı</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Lig Logo</label>
                        <Field className="form-control" tpye="text" id="logoImage" name="logoImage" ></Field>
                        <ErrorMessage name="logoImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                   
                </>
            );
        },
        UpdateFormSubmitHandlerAsync:async(data:WriteLeagueDto)=>{
            return await teamService.UpdateAsync(data);
        },
        UpdateHtml:(data:ReadLeagueDto)=>{
            SET_TEAM(data);
            return (
                <>
                    <div>
                        <label>Lig Adı</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Lig Logo</label>
                        <Field className="form-control" tpye="text" id="logoImage" name="logoImage" ></Field>
                        <ErrorMessage name="logoImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                
            </>);
        },
        DeleteHandlerAsync:async(event:React.MouseEvent<HTMLButtonElement>,data:ReadLeagueDto)=>{
            await await teamService.RemoveAsync(data);
        },
        formDeleteOnOff:false
    }

    return (<>
        <DefaultLayout>
            <DynamicTable {...dynamicTableProp}></DynamicTable>
        </DefaultLayout>
    </>);
}
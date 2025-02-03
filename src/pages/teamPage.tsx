import { useState } from "react";
import { TeamService } from "../services/teamService";
import { WriteTeamDto } from "../entities/dtos/teams/writeTeamDto";
import { DynamicTable, DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import { ReadTeamDto } from "../entities/dtos/teams/readTeamDto";
import * as Yup from 'yup'
import { Lclztn } from "../constants/localization";
import { TableCell,TextField } from "@mui/material";
import { Field,ErrorMessage,} from "formik";
import { DefaultLayout } from "../layouts/defaultLayout";

export const TeamPage = ():JSX.Element=>{
    
    const teamService = new TeamService();
    const EMTPY_TEAM:WriteTeamDto = {
        name:"",
        description:"",
        state:0,
        teamLogoImage:""
    }; 
    const [TEAM,SET_TEAM] = useState<WriteTeamDto>(EMTPY_TEAM);
    
    const dynamicTableProp:DynamicTableProp<WriteTeamDto,ReadTeamDto> = {
        Title:"Takımlar",
        InitialValues : EMTPY_TEAM,
        UseStateData:TEAM,
        ValidationSchema : Yup.object({
            name:Yup.string().required(Lclztn.pleasedonotempty.Get())
        }),
        TableHeadHtml:(
            <>
                <TableCell>Sezon</TableCell>
            </>
        ),
        TableRow : (data:ReadTeamDto)=>{
            return (
            <>
                <TableCell>{data.name}</TableCell>
            </>);
        },
        GetDataServiceAsync:teamService.GetAllAsync,
        AddFormSubmitHandlerAsync:async (data:WriteTeamDto)=>{
            return await teamService.AddAsync(data);
        },
        AddFormHtml:()=>{

            return (
                <>
                    <div>
                        <label>Takım Adı</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım Logo</label>
                        <Field className="form-control" tpye="text" id="teamLogoImage" name="teamLogoImage" ></Field>
                        <ErrorMessage name="teamLogoImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım Hakkında Kısa Açıklama</label>
                        <Field sx={{marginBottom:"50px"}} as={TextField} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                </>
            );
        },
        UpdateFormSubmitHandlerAsync:async(data:WriteTeamDto)=>{
            return await teamService.UpdateAsync(data);
        },
        UpdateHtml:(data:ReadTeamDto)=>{
            SET_TEAM(data);
            return (
                <>
                    <div>
                        <label>Takım Adı</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım Logo</label>
                        <Field className="form-control" tpye="text" id="teamLogoImage" name="teamLogoImage" ></Field>
                        <ErrorMessage name="teamLogoImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım Hakkında Kısa Açıklama</label>
                        <Field sx={{marginBottom:"50px"}} as={TextField} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                
            </>);
        },
        DeleteHandlerAsync:async(event:React.MouseEvent<HTMLButtonElement>,data:ReadTeamDto)=>{
            await await teamService.RemoveAsync(data);
        },
    }

    return (<>
        <DefaultLayout>
            <DynamicTable {...dynamicTableProp}></DynamicTable>
        </DefaultLayout>
    </>);
}
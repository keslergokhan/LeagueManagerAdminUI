import { useState } from "react";
import { TeamService } from "../services/teamService";
import { DynamicTable, DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import * as Yup from 'yup'
import { Lclztn } from "../constants/localization";
import { TableCell,TextField } from "@mui/material";
import { Field,ErrorMessage,} from "formik";
import { DefaultLayout } from "../layouts/defaultLayout";
import { WritePlayerDto } from "../entities/dtos/players/writePlayerDto";
import { ReadPlayerDto } from "../entities/dtos/players/readPlayerDto";
import { PlayerService } from "../services/playerService";
import { useEffect } from "react";
import { ResultDataControl } from "../commons/results/resultControl";
import { ReadTeamDto } from "../entities/dtos/teams/readTeamDto";
import { ToastHelper } from "../commons/helpers/toastHelpers";
import { Icon } from "@iconify/react";


export const PlayerPage = ():JSX.Element=>{

    const service = new PlayerService();

    const EMTPY_TEAM:WritePlayerDto = {
        name:"",
        state:0,
        address:"",
        birthDate:new Date(),
        cityID:"",
        districtID:"",
        formNumber:0,
        height:"",
        isCaptain:false,
        isReplacement:false,
        kilogram:0,
        playerProfileImage:"",
        position:"",
        surname:"",
        team:{
            description:"",
            name:"",
            state:0,
            teamLogoImage:""
        }
    }; 
    const [TEAM,SET_PLAYER] = useState<WritePlayerDto>(EMTPY_TEAM);
    
    const dynamicTableProp:DynamicTableProp<WritePlayerDto,ReadPlayerDto> = {
        Title:"Takımlar",
        InitialValues : EMTPY_TEAM,
        UseStateData:TEAM,
        ValidationSchema : Yup.object({
            name:Yup.string().required(Lclztn.pleasedonotempty.Get())
        }),
        TableHeadHtml:(
            <>
                <TableCell>Ad-Soyad</TableCell>
                <TableCell>Profil</TableCell>
                <TableCell>Takım</TableCell>
                <TableCell>Mevki</TableCell>
                <TableCell>Forma Numarası</TableCell>
                <TableCell>Yaş</TableCell>
                <TableCell>Şehir</TableCell>
            </>
        ),
        TableRow : (data:ReadPlayerDto)=>{
            return (
            <>
                <TableCell style={{fontWeight:(data.isCaptain ? "bold":"normal")}}>
                     {data.name} {data.surname} {(data.isCaptain ? <Icon style={{color:"red"}} icon="material-symbols:flag-2" width="24" height="24" />:'')}
                </TableCell>
                <TableCell>{data.playerProfileImage}</TableCell>
                <TableCell>
                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                        {data.team.name}
                    </span>
                </TableCell>
                <TableCell>{data.position}</TableCell>
                <TableCell>{data.formNumber}</TableCell>
                <TableCell>{(new Date().getFullYear()) - (new Date(data.birthDate).getFullYear())}</TableCell>
                <TableCell>{data.city.name}</TableCell>
            </>);
        },
        GetDataServiceAsync:service.GetAllAsync,
        AddFormSubmitHandlerAsync:async (data:WritePlayerDto)=>{
            return await service.AddAsync(data);
        },
        AddFormHtml:()=>{

            return (
                <>
                    <div>
                        <label>Ad Soyad</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Kaptan</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Yedek</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Profil</label>
                        <Field className="form-control" tpye="text" id="teamLogoImage" name="teamLogoImage" ></Field>
                        <ErrorMessage name="teamLogoImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Takım</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Mevki</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Forma Numarası</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Doğum Yılı</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Kilogram</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Boy</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Forma Numarası</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>

                    <div>
                        <label>Adres</label>
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                   
                </>
            );
        },
        UpdateFormSubmitHandlerAsync:async(data:WritePlayerDto)=>{
            return await service.UpdateAsync(data);
        },
        UpdateHtml:(data:ReadPlayerDto)=>{
            SET_PLAYER(data);
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
                        <Field sx={{marginBottom:"50px"}} className="form-control"id="description" variant="outlined" margin="normal" multiline rows={3} name="description" ></Field>
                        <ErrorMessage name="description" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                
            </>);
        },
        DeleteHandlerAsync:async(event:React.MouseEvent<HTMLButtonElement>,data:ReadPlayerDto)=>{
            await await service.RemoveAsync(data);
        },
    }

    return (<>
        <DefaultLayout>
            <DynamicTable {...dynamicTableProp}></DynamicTable>
        </DefaultLayout>
    </>);
    
}
import { useState } from "react";
import { TeamService } from "../services/teamService";
import { DynamicTable, DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import * as Yup from 'yup'
import { Lclztn } from "../constants/localization";
import { TableCell,Grid2} from "@mui/material";
import { Field,ErrorMessage,} from "formik";
import { DefaultLayout } from "../layouts/defaultLayout";
import { WritePlayerDto } from "../entities/dtos/players/writePlayerDto";
import { ReadPlayerDto } from "../entities/dtos/players/readPlayerDto";
import { PlayerService } from "../services/playerService";
import { useEffect } from "react";
import { ToastHelper } from "../commons/helpers/toastHelpers";
import { Icon } from "@iconify/react";
import { PlayerPositionSelectField } from "../components/formikFields/playerPositionSelectField";
import { FormikDateField } from "../components/formikFields/formikDateField";
import { FormikSearchSelectField } from "../components/formikFields/formikSearchSelectField";
import { FormikYesNoSelectField } from "../components/formikFields/formikYesNoSelectField";

export const PlayerPage = ():JSX.Element=>{


    const teamService = new TeamService();
    const service = new PlayerService();

    const EMTPY_TEAM:WritePlayerDto = {
        teamID:"",
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
        position:0,
        surname:"",
        team:{
            description:"",
            name:"",
            state:0,
            teamLogoImage:""
        }
    }; 
    const [TEAM,SET_PLAYER] = useState<WritePlayerDto>(EMTPY_TEAM);
    let teamSelectData = new Array<any>();


    useEffect(()=>{
        teamService.GetAllAsync().then(x=>{
            if(x.isSuccess){
                teamSelectData = x.data.map(i=>{
                    return {
                        label:i.name,
                        value:i.id
                    }
                })
            }else{
                ToastHelper.Error(<> Beklenmedik bir problem yaşandı ! </>);
            }
        })
    });
    
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
            return null;
        },
        AddFormHtml:()=>{
           
            return (
                <>
                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={6}>
                            <div>
                                <label>Ad</label>
                                <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                                <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={6}>
                            <div>
                                <label>Soyad</label>
                                <Field className="form-control" tpye="text" id="surname" name="surname" ></Field>
                                <ErrorMessage name="surname" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                    </Grid2>
                   
                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={4}>
                            <div>
                                <label>Takım</label>
                                <FormikSearchSelectField type="text" label="Takım" id="teamID" name="teamID" options={teamSelectData}></FormikSearchSelectField>
                                <Field name="teamID" id="teamID" tpye="text" hidden></Field>
                                <ErrorMessage name="teamID" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <FormikYesNoSelectField label="Kaptan" name="isCaptain" id="isCaptain"></FormikYesNoSelectField>
                                <ErrorMessage name="isCaptain" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                          
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <FormikYesNoSelectField label="Yedek Oyuncu" name="isReplacement" id="isReplacement"></FormikYesNoSelectField>
                                <ErrorMessage name="isReplacement" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                    </Grid2>
                    
                  
                    <div>
                        <label>Profil</label>
                        <Field className="form-control" tpye="text" id="playerProfileImage" name="playerProfileImage" ></Field>
                        <ErrorMessage name="playerProfileImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                 
                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={6}>
                            <PlayerPositionSelectField  name="position" id="position"></PlayerPositionSelectField>
                            <ErrorMessage name="position" component="span" className="text-danger" ></ErrorMessage>
                        </Grid2>
                        <Grid2 size={6}>
                            <div>
                                <label>Forma Numarası</label>
                                <Field sx={{marginBottom:"50px"}} type="number" className="form-control" id="formNumber" name="formNumber" variant="outlined" margin="normal" rows={3}  ></Field>
                                <ErrorMessage name="formNumber" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>                       
                    </Grid2>


                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={4}>
                            <div>
                                <label>Doğum Tarihi</label>
                                <FormikDateField name="birthDate" id="birthDate" data="1990-01-01" ></FormikDateField>
                                <ErrorMessage name="birthDate" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>                
                        <Grid2 size={4}>
                            <div>
                                <label>Kilogram</label>
                                <Field className="form-control" type="number" id="kilogram" variant="outlined" margin="normal" rows={3} name="kilogram" ></Field>
                                <ErrorMessage name="kilogram" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <label>Boy</label>
                                <Field sx={{marginBottom:"50px"}} type="number" className="form-control" id="height" variant="outlined" margin="normal" rows={3} name="height" ></Field>
                                <ErrorMessage name="height" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>    
                    </Grid2>

                   
                </>
            );
        },
        UpdateFormSubmitHandlerAsync:async(data:WritePlayerDto)=>{
            return await service.UpdateAsync(data);
        },
        UpdateHtml:(data:ReadPlayerDto)=>{
            SET_PLAYER(data);
            console.log(data);
            return (
                <>
                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={6}>
                            <div>
                                <label>Ad</label>
                                <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                                <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={6}>
                            <div>
                                <label>Soyad</label>
                                <Field className="form-control" tpye="text" id="surname" name="surname" ></Field>
                                <ErrorMessage name="surname" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                    </Grid2>
                   
                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={4}>
                            <div>
                                <label>Takım</label>
                                <FormikSearchSelectField label="Takım" currentData={teamSelectData.find(x=>x["value"] == data.teamID)} type="text" id="teamID" name="teamID" options={teamSelectData}></FormikSearchSelectField>
                                <Field name="teamID" id="teamID" tpye="text" hidden></Field>
                                <ErrorMessage name="teamID" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <FormikYesNoSelectField data={data.isCaptain} label="Kaptan" name="isCaptain" id="isCaptain"></FormikYesNoSelectField>
                                <ErrorMessage name="isCaptain" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                          
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <FormikYesNoSelectField data={data.isReplacement} label="Yedek Oyuncu" name="isReplacement" id="isReplacement"></FormikYesNoSelectField>
                                <ErrorMessage name="isReplacement" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                    </Grid2>
                    
                  
                    <div>
                        <label>Profil</label>
                        <Field className="form-control" tpye="text" id="playerProfileImage" name="playerProfileImage" ></Field>
                        <ErrorMessage name="playerProfileImage" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                 
                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={6}>
                            <PlayerPositionSelectField data={data.position}  name="position" id="position"></PlayerPositionSelectField>
                            <ErrorMessage name="position" component="span" className="text-danger" ></ErrorMessage>
                        </Grid2>
                        <Grid2 size={6}>
                            <div>
                                <label>Forma Numarası</label>
                                <Field sx={{marginBottom:"50px"}} type="number" className="form-control" id="formNumber" name="formNumber" variant="outlined" margin="normal" rows={3}  ></Field>
                                <ErrorMessage name="formNumber" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>                       
                    </Grid2>


                    <Grid2 container spacing={2} columns={12}>
                        <Grid2 size={4}>
                            <div>
                                <label>Doğum Tarihi</label>
                                <FormikDateField name="birthDate" id="birthDate" data="1990-01-01" ></FormikDateField>
                                <ErrorMessage name="birthDate" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>                
                        <Grid2 size={4}>
                            <div>
                                <label>Kilogram</label>
                                <Field className="form-control" type="number" id="kilogram" variant="outlined" margin="normal" rows={3} name="kilogram" ></Field>
                                <ErrorMessage name="kilogram" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <label>Boy</label>
                                <Field sx={{marginBottom:"50px"}} type="number" className="form-control" id="height" variant="outlined" margin="normal" rows={3} name="height" ></Field>
                                <ErrorMessage name="height" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>    
                    </Grid2>
                
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
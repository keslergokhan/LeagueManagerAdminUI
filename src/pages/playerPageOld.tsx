import { useState } from "react";
import { TeamService } from "../services/teamService";
import { DynamicTable, DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import * as Yup from 'yup'
import { Lclztn } from "../constants/localization";
import { TableCell,Grid2,TextField, Typography} from "@mui/material";
import { Field,ErrorMessage,} from "formik";
import { DefaultLayout } from "../layouts/defaultLayout";
import { WritePlayerDto } from "../entities/dtos/players/writePlayerDto";
import { ReadPlayerDto } from "../entities/dtos/players/readPlayerDto";
import { PlayerService } from "../services/playerService";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { PlayerPositionSelectField } from "../components/formikFields/playerLocationSelectField";
import { FormikDateField } from "../components/formikFields/formikDateField";
import { FormikSearchSelectField } from "../components/formikFields/formikSearchSelectField";
import { FormikYesNoSelectField } from "../components/formikFields/formikYesNoSelectField";
import { CityService } from "../services/cityService";
import { DistrictService } from "../services/districtService";
import { ToastHelper } from "../commons/helpers/toastHelpers";
import { PowerFootSelectField } from "../components/formikFields/powerFootSelectField";

export const PlayerPageOld = ():JSX.Element=>{


    const teamService = new TeamService();
    const service = new PlayerService();
    const cityService = new CityService();
    const districtService = new DistrictService();

    const EMTPY_TEAM:WritePlayerDto = {
        name:"",
        surname:"",
        eposta:"",
        password:"",
        team:{
            description:"",
            name:"",
            state:0,
            teamLogoImage:""
        },
        playerInfo:{
            cityID:"",
            birthDate:new Date(),
            districtID:"",
            height:0,
            formNumber:0,
            isCaptain:false,
            kilogram:0,
            location1:0,
            location2:0,
            location3:0,
            playerProfileImage:"",
            powerFoot:1,
            socialMediaJSON:""            
        },
        state:0
    }; 
    const [TEAM,SET_PLAYER] = useState<WritePlayerDto>(EMTPY_TEAM);
    let teamSelectData = new Array<any>();
    let citySelectData = new Array<any>();
    let distrctSelectData = new Array<any>();

    useEffect(()=>{
        cityService.GetSelectDataAsync("name").then(x=>{
            if(x.isSuccess){
                citySelectData = x.data;
            }else{
                ToastHelper.DefaultError();
            }
        });

        teamService.GetSelectDataAsync("name").then(x=>{
            if(x.isSuccess){
                teamSelectData = x.data;
            }else{
                ToastHelper.DefaultError();
            }
        });

        districtService.GetSelectDataAsync("name").then(x=>{
            if(x.isSuccess){
                distrctSelectData = x.data;
            }else{
                ToastHelper.DefaultError();
            }
        });
    });
    
   
    const dynamicTableProp:DynamicTableProp<WritePlayerDto,ReadPlayerDto> = {
        Title:"Takımlar",
        formDeleteOnOff:true,
        InitialValues : EMTPY_TEAM,
        UseStateData:TEAM,
        ValidationSchema : Yup.object({
            name:Yup.string().required(Lclztn.empty().Get()).min(2,Lclztn.min().AddValue("2").Get()).max(30,Lclztn.max().AddValue("30").Get()),
            surname:Yup.string().required(Lclztn.empty().Get()).min(2,Lclztn.min().AddValue("2").Get()).max(30,Lclztn.max().AddValue("30").Get()),
            teamID:Yup.string().required(Lclztn.empty().Get()),
            eposta:Yup.string().required(Lclztn.empty().Get()).min(2,Lclztn.min().AddValue("2").Get()).max(75,Lclztn.max().AddValue("75").Get()),
            password:Yup.string().required(Lclztn.empty().Get()).min(2,Lclztn.max().AddValue("2").Get()).max(13,Lclztn.max().AddValue("13").Get()),
            playerInfo:Yup.object().shape({
                playerProfileImage:Yup.string().required(Lclztn.empty().Get()),
                isCaptain:Yup.string().required(Lclztn.empty().Get()),
                formNumber:Yup.number().required(Lclztn.empty().Get()).max(99,Lclztn.max().AddValue("1-99").Get()).min(1,Lclztn.min().AddValue("1-99").Get()),
                location1:Yup.number().required(Lclztn.empty().Get()).notOneOf([0],"1. Değer boş olamaz !"),
                kilogram:Yup.number().required(Lclztn.empty().Get()).min(35,Lclztn.min().AddValue("35-120").Get()).max(120,Lclztn.max().AddValue("120").Get()).min(35,Lclztn.min().AddValue("35-120").Get()).max(120,Lclztn.max().AddValue("120").Get()),
                height:Yup.number().required(Lclztn.empty().Get()).notOneOf([0],"1. Değer boş olamaz !").min(35,Lclztn.min().AddValue("35-250").Get()).max(250,Lclztn.max().AddValue("100-250").Get()),
                cityID:Yup.string().required(Lclztn.empty().Get()),
                districtID:Yup.string().required(Lclztn.empty().Get()),
                powerFoot:Yup.number().required(Lclztn.empty().Get()).notOneOf([0],Lclztn.empty().Get())
                
            })
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
                <TableCell style={{fontWeight:(data.playerInfo.isCaptain ? "bold":"normal")}}>
                     {data.name} {data.surname} {(data.playerInfo.isCaptain ? <Icon style={{color:"red"}} icon="material-symbols:flag-2" width="24" height="24" />:'')}
                </TableCell>
                <TableCell>{data.playerInfo.playerProfileImage}</TableCell>
                <TableCell>
                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                        {}
                    </span>
                </TableCell>
                <TableCell>{data.playerInfo.location1}</TableCell>
                <TableCell>{data.playerInfo.formNumber}</TableCell>
                <TableCell>{(new Date().getFullYear()) - (new Date(data.playerInfo.birthDate).getFullYear())}</TableCell>
                <TableCell>{data.playerInfo.city.name}</TableCell>
            </>);
        },
        GetDataServiceAsync:service.GetAllAsync,
        AddFormSubmitHandlerAsync:async (data:WritePlayerDto)=>{
            return await service.AddAsync(data);
        },
        AddFormHtml:()=>{
            
            return (
                <>

                    <Grid2 container spacing={10} columns={12}>
                        <Grid2 size={6}>
                            <Typography variant="h5" sx={{marginBottom:"20px"}}>Oyuncu</Typography>

                            <div>
                                <label>Profil</label>
                                <Field className="form-control" tpye="text" id="playerInfo.playerProfileImage" name="playerInfo.playerProfileImage" ></Field>
                                <ErrorMessage name="playerInfo.playerProfileImage" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                            
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
                                <Grid2 size={6}>
                                    <div>
                                        <label>Eposta</label>
                                        <Field className="form-control" tpye="text" id="eposta" name="eposta" ></Field>
                                        <ErrorMessage name="eposta" component="span" className="text-danger" ></ErrorMessage>
                                    </div>
                                </Grid2>
                                <Grid2 size={6}>
                                    <div>
                                        <label>Şifre</label>
                                        <Field className="form-control" tpye="password" id="password" name="password" ></Field>
                                        <ErrorMessage name="password" component="span" className="text-danger" ></ErrorMessage>
                                    </div>
                                </Grid2>
                            </Grid2>
                        </Grid2>


                        <Grid2 size={6}>
                            <Typography variant="h5" sx={{marginBottom:"20px"}}>Detay Bilgiler</Typography>

                            
                            <Grid2 container spacing={2} columns={12}>
                                <Grid2 size={6}>
                                    <div>
                                        <FormikSearchSelectField type="text" label="Takım" id="teamID" name="teamID" options={teamSelectData}></FormikSearchSelectField>
                                    </div>
                                </Grid2>
                                <Grid2 size={6}>
                                    <div>
                                        <FormikYesNoSelectField label="Kaptan" name="playerInfo.isCaptain" id="isCaptain"></FormikYesNoSelectField>
                                    </div>
                                </Grid2>
                            </Grid2>

                            <Grid2 container spacing={2} columns={12}>
                                <Grid2 size={3}>
                                    <div>
                                        <label>Forma Numarası</label>
                                        <Field sx={{marginBottom:"50px"}} type="number" className="form-control" id="formNumber" name="playerInfo.formNumber" variant="outlined" margin="normal" rows={3}></Field>
                                        <ErrorMessage name="playerInfo.formNumber" component="span" className="text-danger small" ></ErrorMessage>
                                    </div> 
                                </Grid2>  
                               
                                <Grid2 size={3}>
                                    <PlayerPositionSelectField label="1.Mevki" name="playerInfo.location1" id="location1"></PlayerPositionSelectField>
                                </Grid2>
                                <Grid2 size={3}>
                                    <PlayerPositionSelectField label="2.Mevki" name="playerInfo.location2" id="location2"></PlayerPositionSelectField>
                                </Grid2>
                                <Grid2 size={3}>
                                    <PlayerPositionSelectField label="3.Mevki" name="playerInfo.location3" id="location3"></PlayerPositionSelectField>
                                </Grid2>
                            </Grid2>

                            <Grid2 container spacing={2} columns={12}>
                                <Grid2 size={6}>
                                    <div>
                                        <label>Doğum Tarihi</label>
                                        <FormikDateField name="playerInfo.birthDate" id="birthDate" data="1990-01-01" ></FormikDateField>
                                    </div>
                                </Grid2>                
                                <Grid2 size={2}>
                                    <div>
                                        <label>Kilogram</label>
                                        <Field className="form-control" type="number" id="kilogram" variant="outlined" margin="normal" rows={3} name="playerInfo.kilogram" ></Field>
                                        <ErrorMessage name="playerInfo.kilogram" component="span" className="text-danger" ></ErrorMessage>
                                    </div>
                                </Grid2>
                                <Grid2 size={2}>
                                    <div>
                                        <label>Boy</label>
                                        <Field sx={{marginBottom:"50px"}} type="text" className="form-control" id="height" variant="outlined" margin="normal" rows={3} name="playerInfo.height" ></Field>
                                        <ErrorMessage name="playerInfo.height" component="span" className="text-danger" ></ErrorMessage>
                                    </div>
                                </Grid2>
                                <Grid2 size={2}>
                                    <div>
                                        <PowerFootSelectField name="playerInfo.powerFoot" label="Güçlü Ayak"></PowerFootSelectField>
                                        <ErrorMessage name="playerInfo.powerFoot" component="span" className="text-danger" ></ErrorMessage>
                                    </div>
                                </Grid2>    
                            </Grid2>

                            <Typography variant="h6" sx={{marginTop:"14px"}}>İletişim Bilgiler</Typography>
                            <Grid2 container spacing={2} columns={12}>
                                <Grid2 size={6}>
                                    <div>
                                        <FormikSearchSelectField type="text" label="İl" id="cityID" name="playerInfo.cityID" options={citySelectData}></FormikSearchSelectField>
                                    </div>
                                </Grid2>
                                <Grid2 size={6}>
                                    <div>
                                        <FormikSearchSelectField type="text" label="İlçe" id="districtID" name="playerInfo.districtID" options={distrctSelectData}></FormikSearchSelectField>
                                    </div>
                                </Grid2>
                            </Grid2>

                        </Grid2>
                    </Grid2>
                   
                </>
            );
        },
        UpdateFormSubmitHandlerAsync:async(data:WritePlayerDto)=>{
            return await service.UpdateAsync(data);
        },
        UpdateHtml:(data:ReadPlayerDto)=>{
            //SET_PLAYER(data);
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
                                <FormikSearchSelectField id="team.name" name="team.name"  label="Takım 2" currentData={teamSelectData.find(x=>x["value"] == data.teamID)} type="text" options={teamSelectData}></FormikSearchSelectField>
                                <ErrorMessage name="team.name" component="span" className="text-danger" ></ErrorMessage>
                            </div>
                        </Grid2>
                        <Grid2 size={4}>
                            <div>
                                <FormikYesNoSelectField data={data.playerInfo.isCaptain} label="Kaptan" name="isCaptain" id="isCaptain"></FormikYesNoSelectField>
                                <ErrorMessage name="isCaptain" component="span" className="text-danger" ></ErrorMessage>
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
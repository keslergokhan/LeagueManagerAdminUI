import { Button, Grid2, Stack, Typography } from "@mui/material";
import { PlayerFormAction} from "./playerTableComponent";
import { PlayerService } from "../../services/playerService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormikDateField } from "../formikFields/formikDateField";
import { ReadPlayerDto } from "../../entities/dtos/players/readPlayerDto";
import * as Yup from 'yup';
import { FormikSearchSelectField } from "../formikFields/formikSearchSelectField";
import { FormikYesNoSelectField } from "../formikFields/formikYesNoSelectField";
import { PlayerPositionSelectField } from "../formikFields/playerLocationSelectField";
import { PowerFootSelectField } from "../formikFields/powerFootSelectField";
import { SearchSelectItem } from "../../models/shareds/searchSelectItem";

export interface PlayerAddFormProps{
    refresh:() => Promise<void>
    dispatch:React.Dispatch<PlayerFormAction>;
    teamSelectData:Array<SearchSelectItem<string>>;
    citySelectData:Array<SearchSelectItem<string>>;
}

export const PlayerAddForm = (props:PlayerAddFormProps):JSX.Element =>{

    const playerService = new PlayerService();
    console.log("player-add");
    const seasonAddFormInitialValiues:ReadPlayerDto = {
        id:"",
        eposta:"",
        name:"",
        password:"",
        state:0,
        surname:"",
        playerTeams:[],
        playerInfo:{
            age:0,
            birthDate:new Date(),
            cityID:"",
            city:{
                id:"",
                name:"",
                state:0
            },
            district:{
                id:"",
                name:"",
                state:0
            },
            districtID:"",
            formNumber:0,
            height:0,
            isCaptain:false,
            kilogram:0,
            location1:0,
            location2:0,
            location3:0,
            playerProfileImage:"",
            powerFoot:0,
            socialMediaJSON:"",
        },
    };

    const validationSchema = Yup.object({});

    const formSubmitHandlerAsync = async (Values:ReadPlayerDto):Promise<void> => {
        console.log("fsdf");
    }

    return (
        <>
            <Formik 
                initialValues={seasonAddFormInitialValiues}
                validationSchema={validationSchema}
                onSubmit={async (values:ReadPlayerDto)=>{await formSubmitHandlerAsync(values)}}>

                <Form>
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
                                        <FormikSearchSelectField type="text" label="Takım" id="teamID" name="teamID" options={props.teamSelectData}></FormikSearchSelectField>
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
                                        İl
                                    </div>
                                </Grid2>
                                <Grid2 size={6}>
                                    <div>
                                        İlçe
                                    </div>
                                </Grid2>
                            </Grid2>

                        </Grid2>
                    </Grid2>

                    <Stack direction="row" spacing={2} sx={{marginTop:"10px"}} justifyContent="flex-end">
                        <Button variant="contained" type="submit" size="small" color="success" onClick={()=>{}} >Kaydet</Button>
                        <Button variant="contained" size="small" color="error" onClick={()=>{props.dispatch({type:"ADD_FORM_CENCEL"})}} >İptal</Button>
                    </Stack>
                </Form>
            </Formik>
        </>
    )

    
}
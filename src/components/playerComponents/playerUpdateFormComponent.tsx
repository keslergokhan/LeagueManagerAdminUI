import { ErrorMessage, Field, Form, Formik } from "formik";
import { ReadPlayerDto } from "../../entities/dtos/players/readPlayerDto";
import * as Yup from 'yup'
import { PlayerService } from "../../services/playerService";
import { FormikDateField } from "../formikFields/formikDateField";
import { Button, Stack } from "@mui/material";
import { PlayerFormAction } from "./playerTableComponent";
import { SearchSelectItem } from "../../models/shareds/searchSelectItem";

export interface PlayerUpdateFormProps{
    player:ReadPlayerDto|undefined;
    refresh:()=>Promise<void>;
    dispatch:React.Dispatch<PlayerFormAction>;
    teamSelectData:Array<SearchSelectItem<string>>;
    citySelectData:Array<SearchSelectItem<string>>;
}

export const PlayerUpdateForm = (props:PlayerUpdateFormProps):JSX.Element =>{
    const playerService = new PlayerService();

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
                    <Stack spacing={2} direction={"row"}>
                        <div>
                            <label>Lig Adı</label>
                            <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                            <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                        </div>
                        <div>
                            <label>Lig Başlangıç</label>
                            <FormikDateField name="startDate" id="startDate" ></FormikDateField>
                        </div>
                        <div>
                            <label>Lig Bitiş</label>
                            <FormikDateField name="endDate" id="endDate" ></FormikDateField>
                        </div>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{marginTop:"10px"}} justifyContent="flex-end">
                        <Button variant="contained" type="submit" size="small" color="success" onClick={()=>{}} >Kaydet</Button>
                        <Button variant="contained" size="small" color="error" onClick={()=>{props.dispatch({type:"ADD_FORM_CENCEL"})}} >İptal</Button>
                    </Stack>
                </Form>
                    
            </Formik>
        </>
    );
}
import { Stack,Button } from "@mui/material";
import { Formik,Form } from "formik";
import { Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Lclztn } from "../../constants/localization";
import { FormikDateField } from "../formikFields/formikDateField";
import { WriteSeasonDto } from "../../entities/dtos/seasons/writeSeasonDto";
import { SeasonService } from "../../services/seasonService";
import { ToastHelper } from "../../commons/helpers/toastHelpers";
import { ReadLeagueDto } from "../../entities/dtos/leagues/readLeagueDto";
import { StringHelper } from "../../commons/helpers/stringHelpers";
import { SeasonFormAction } from "./seasonTableComponent";

export interface SeasonFormProps {
    dispatch:React.Dispatch<SeasonFormAction>;
    league:ReadLeagueDto,
    tableRefresh:()=>void
}

export const SeasonAddForm = (props:SeasonFormProps):JSX.Element =>{

    const seasonService = new SeasonService();
    
    const seasonAddFormInitialValiues:WriteSeasonDto = {
        name:"",
        startDate:new Date(),
        endDate:new Date(),
        isFinish:false,
        leagueID:props.league.id,
        state:0
    };

    const validationSchema = Yup.object({
        name:Yup.string().required(Lclztn.empty().Get()).max(75,Lclztn.max().Get()),
        startDate:Yup.string().required(Lclztn.empty().Get()),
        endDate:Yup.string().required(Lclztn.empty().Get()),
        leagueID:Yup.string().required()
    })

    const formSubmitHandlerAsync = async (values:WriteSeasonDto) =>{
        console.log(values);
        await seasonService.AddAsync(values).then(x=>{
            if(!x.isSuccess){
                throw new Error();
            }
            props.tableRefresh();
            props.dispatch({type:"ADD_FORM_CENCEL"});
            ToastHelper.Success(<>Yeni sezon başarıyla eklendi.</>);
        }).catch(x=>{
            console.log(x);
            ToastHelper.DefaultError();
        });
    }

    return (
        <>
            <Formik 
                initialValues={seasonAddFormInitialValiues}
                validationSchema={validationSchema}
                onSubmit={async (values:WriteSeasonDto)=>{await formSubmitHandlerAsync(values)}}>

                <Form>
                    <Stack spacing={2} direction={"row"}>
                        <Field name="leagueID" id="leagueID" value={props.league.id} hidden></Field>
                        <div>
                            <label>Lig Adı</label>
                            <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                            <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                        </div>
                        <div>
                            <label>Lig Başlangıç</label>
                            <FormikDateField name="startDate" id="startDate" data={StringHelper.GetTodayDate()}></FormikDateField>
                        </div>
                        <div>
                            <label>Lig Bitiş</label>
                            <FormikDateField name="endDate" id="endDate" data={StringHelper.GetTodayDate()}></FormikDateField>
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
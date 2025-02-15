import { Formik,Form, Field, ErrorMessage } from "formik";
import { ReadLeagueDto } from "../../entities/dtos/leagues/readLeagueDto";
import { SeasonFormAction } from "./seasonTableComponent";
import { Stack,Button, Typography } from "@mui/material";
import { FormikDateField } from "../formikFields/formikDateField";
import { StringHelper } from "../../commons/helpers/stringHelpers";
import { SeasonService } from "../../services/seasonService";
import { WriteSeasonDto } from "../../entities/dtos/seasons/writeSeasonDto";
import { Lclztn } from "../../constants/localization";
import * as Yup from 'yup';
import { ReadSeasonDto } from "../../entities/dtos/seasons/readSeasonDto";
import { ToastHelper } from "../../commons/helpers/toastHelpers";

interface SeasonUpdateFormProps{
    dispatch:React.Dispatch<SeasonFormAction>;
    league:ReadLeagueDto,
    tableRefresh:()=>void,
    season:ReadSeasonDto|undefined
}

export const SeasonUpdateForm = (props:SeasonUpdateFormProps):JSX.Element => {

    const seasonService = new SeasonService();
    
    const seasonAddFormInitialValiues:WriteSeasonDto = {
        id:props.season?.id,
        name:props.season?.name ?? "",
        startDate:props.season?.startDate ?? new Date(),
        endDate:props.season?.endDate ?? new Date(),
        isFinish:props.season?.isFinish ?? false,
        leagueID:props.league.id,
        state:0
    };

    const validationSchema = Yup.object({
        name:Yup.string().required(Lclztn.empty().Get()).max(75,Lclztn.max().Get()),
        startDate:Yup.string().required(Lclztn.empty().Get()),
        endDate:Yup.string().required(Lclztn.empty().Get()),
        leagueID:Yup.string().required()
    })

    const updateFormSubmitHandlerAsync = async (data:WriteSeasonDto):Promise<void> => {
        seasonService.UpdateAsync(data).then((x)=>{

            if(!x.isSuccess){
                throw new Error();
            }
            ToastHelper.Success(<>Güncelleme işlemi başarılı.</>);
        }).catch(x=>{
            console.log(x);
            ToastHelper.DefaultError();
        }).finally(()=>{
            props.tableRefresh();
            props.dispatch({type:"UPDATE_FORM_CENCEL"})
        })

        
    }

    return (<>
        

        <Formik 
            onSubmit={async (values:WriteSeasonDto)=>{await updateFormSubmitHandlerAsync(values)}}
            validationSchema={validationSchema}
            initialValues={seasonAddFormInitialValiues}
        >

            <Form>
                <Field name="id" id="id" vlaue={props.season?.id} hidden></Field>
                <Typography>Güncelle</Typography>
                <Stack spacing={2} direction={"row"}>
                    <Field name="leagueID" id="leagueID" value={props.league.id} hidden></Field>
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
                    <Button variant="contained" size="small" color="error" onClick={()=>{props.dispatch({type:"UPDATE_FORM_CENCEL"})}} >İptal</Button>
                </Stack>
            </Form>
            
        </Formik>
    </>);
}
import { useState } from "react";
import { DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import { ReadSeasonDto } from "../entities/dtos/seasons/readSeasonDto";
import { WriteSeasonDto } from "../entities/dtos/seasons/writeSeasonDto";
import * as Yup from 'yup'
import { Lclztn } from "../constants/localization";
import { TableCell } from "@mui/material";
import { SeasonService } from "../services/seasonService";
import { Field,ErrorMessage } from "formik";
import { DefaultLayout } from "../layouts/defaultLayout";
import { DynamicTable } from "../components/dynamicComponents/dynamicTable";



export const SeasonPage = ():JSX.Element => {

    const seasonService = new SeasonService();
    const EMPTY_SEASON:WriteSeasonDto = {
        name:"",
        state:0,
    };

    const [SEASON,SET_SEASON] = useState<WriteSeasonDto>(EMPTY_SEASON);
    const dynamicTableProp:DynamicTableProp<WriteSeasonDto,ReadSeasonDto> = {
        Title:"Sezonlar",
        InitialValues : EMPTY_SEASON,
        UseStateData:SEASON,
        ValidationSchema : Yup.object({
            name:Yup.string().required(Lclztn.pleasedonotempty.Get())
        }),
        TableHeadHtml:(
            <>
                <TableCell>Sezon</TableCell>
            </>
        ),
        TableRow : (data:ReadSeasonDto)=>{
            return (
            <>
                <TableCell>{data.name}</TableCell>
            </>);
        },
        GetDataServiceAsync:seasonService.GetAllAsync,
        AddFormSubmitHandlerAsync:async (data:WriteSeasonDto)=>{
            return await seasonService.AddAsync(data);
        },
        AddFormHtml:()=>{

            return (
                <>
                    <div>
                        <label>Başlık</label>
                        <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                        <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                </>
            );
        },
        UpdateFormSubmitHandlerAsync:async(data:WriteSeasonDto)=>{
            return await seasonService.UpdateAsync(data);
        },
        UpdateHtml:(data:ReadSeasonDto)=>{
            SET_SEASON(data);
            return (<>
                <div>
                    <label>Başlık</label>
                    <Field className="form-control" tpye="text" id="name" name="name" ></Field>
                    <ErrorMessage name="name" component="span" className="text-danger" ></ErrorMessage>
                </div>
                
            </>);
        },
        DeleteHandlerAsync:async(event:React.MouseEvent<HTMLButtonElement>,data:ReadSeasonDto)=>{
            await await seasonService.RemoveAsync(data);
        },
    };



    return (<>
        <DefaultLayout>
            <DynamicTable {...dynamicTableProp}></DynamicTable>
        </DefaultLayout>
    </>);
}
import { DynamicTable,DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import { TableCell } from "@mui/material";
import { ReadBlogDto } from "../entities/dtos/blogs/readBlogDto";
import { WriteBlogDto } from "../entities/dtos/blogs/writeBlogDto";
import { DefaultLayout } from "../layouts/defaultLayout"
import { BlogService } from "../services/blogService"
import { useEffect,useState } from "react";
import { IResultDataControl } from "../commons/base/baseResultControl";
import { Field,ErrorMessage, FieldProps, FormikProps } from "formik";
import { FormikDateField } from "../components/formikFields/formikDateField";
import * as Yup from 'yup';
import { CkEditorField } from "../components/formikFields/ckEditorField";
import {Grid2} from '@mui/material'

export const BlogPage = ():JSX.Element=>{

    const blogService = new BlogService();

    const [CkEdtorHelper,CkEdtor] = CkEditorField({name:"content",id:"content",data:""});

    const dynamicTable:DynamicTableProp<ReadBlogDto,WriteBlogDto> =
    {
        AddFormHtml:()=>{

            return (
                <>
                    <div>
                        <label>Başlık</label>
                        <Field className="form-control" tpye="text" id="title" name="title"></Field>
                        <ErrorMessage name="title" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    <div>
                        <label>Resim</label>
                        <Field className="form-control" tpye="text" id="blogImage" name="blogImage"></Field>
                        <ErrorMessage name="blogImage" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    <div>
                        <label>İçerik</label>
                        <CkEdtor></CkEdtor>
                        <ErrorMessage name="content" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    
                    <div >
                        <label>Tarih</label>
                        <FormikDateField name="blogDate" id="blogDate" ></FormikDateField>
                    </div>
                </>
            )
        },
        AddFormSubmitHandlerAsync:async(values:WriteBlogDto)=>{
            console.log(values)
            console.log(CkEdtorHelper.current.setData(""));
            await blogService.AddAsync(values);
        },
        DeleteHandlerAsync:async(event:React.MouseEvent<HTMLButtonElement>,data:ReadBlogDto)=>{
            await blogService.RemoveAsync(data);
        },
        UpdateFormSubmitHandlerAsync:async (values:WriteBlogDto)=>{
            console.log(values);
        },
        GetDataServiceAsync:blogService.GetAllAsync,
        InitialValues:{
            title:"",
            content:"",
            blogDate:new Date(),
            blogImage:"",
            state:0
        },
        TableHeadHtml:(
            <>
                <TableCell>Başlık</TableCell>
                <TableCell>Resim</TableCell>
                <TableCell>Tarih</TableCell>
            </>
        ),
        TableRow:(data:ReadBlogDto)=>(
            <>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.blogImage}</TableCell>
                <TableCell>{new Date(data.blogDate).toLocaleDateString("tr-TR")}</TableCell>
            </>
        ),
        Title:"Blog",
        UpdateHtml:(event:React.MouseEvent<HTMLButtonElement>,data:WriteBlogDto):JSX.Element=>{
          
            return (<>
                    <div>
                        <label>Başlık</label>
                        <Field className="form-control" tpye="text" id="title" name="title" ></Field>
                        <ErrorMessage name="title" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    <div>
                        <label>Resim</label>
                        <Field className="form-control" tpye="text" id="blogImage" name="blogImage" ></Field>
                        <ErrorMessage name="blogImage" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    <div>
                        <label>İçerik</label>
                        <CkEdtor></CkEdtor>
                        <ErrorMessage name="content" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    
                    <div >
                        <label>Tarih</label>
                        <FormikDateField name="blogDate" id="blogDate" ></FormikDateField>
                    </div>
            </>)
        },
        ValidationSchema : Yup.object({
            title:Yup.string().required("Bu alan zorunludur "),
            content:Yup.string().required("Bu alanda zorunludur")
        })


    }

    return (
        <DefaultLayout>
            <DynamicTable {...dynamicTable}></DynamicTable>
        </DefaultLayout>
    )
}
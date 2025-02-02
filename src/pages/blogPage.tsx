import { DynamicTable,DynamicTableProp } from "../components/dynamicComponents/dynamicTable";
import { TableCell } from "@mui/material";
import { ReadBlogDto } from "../entities/dtos/blogs/readBlogDto";
import { WriteBlogDto } from "../entities/dtos/blogs/writeBlogDto";
import { DefaultLayout } from "../layouts/defaultLayout"
import { BlogService } from "../services/blogService"
import { useState } from "react";
import { Field,ErrorMessage} from "formik";
import { FormikDateField } from "../components/formikFields/formikDateField";
import * as Yup from 'yup';
import { Lclztn } from "../constants/localization";
import { CkEditorField } from "../components/formikFields/ckEditorField";

export const BlogPage = ():JSX.Element=>{

    const blogService = new BlogService();

    const emptyData = {
        title:"",
        content:"",
        blogDate:new Date(),
        blogImage:"",
        state:0
    };
    
    const [blogValue,setBlogValue] = useState<WriteBlogDto>(emptyData);
    const [CkEdtorHelper,CkEdtor] = CkEditorField({name:"content",id:"content",data:""});
    const dynamicTable:DynamicTableProp<ReadBlogDto,WriteBlogDto> =
    {
        InitialValues:emptyData,
        ValidationSchema : Yup.object({
            title:Yup.string().required(Lclztn.pleasedonotempty.Get()),
            content:Yup.string().required(Lclztn.pleasedonotempty.Get()),
            blogDate:Yup.string().required(Lclztn.pleasedonotempty.Get())
        }),
        UseStateData:blogValue,
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
                        <CkEdtor data={""}></CkEdtor>
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
            CkEdtorHelper.current.setData("");
            await blogService.AddAsync(values);
        },
        DeleteHandlerAsync:async(event:React.MouseEvent<HTMLButtonElement>,data:ReadBlogDto)=>{
            await blogService.RemoveAsync(data);
        },
        UpdateFormSubmitHandlerAsync:async (values:WriteBlogDto)=>{
            return await blogService.UpdateAsync(values);
        },
        GetDataServiceAsync:blogService.GetAllAsync,
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
        UpdateHtml:(data:WriteBlogDto):JSX.Element=>{
            setBlogValue(data);
            return (<>
                    <div>
                        <label>Başlık</label>
                        <Field className="form-control" tpye="text" id="title" name="title" ></Field>
                        <ErrorMessage name="title" component="span" className="text-danger" ></ErrorMessage>
                    </div>
                    <div>
                        <label>Resim</label>
                        <Field className="form-control" tpye="text" id="blogImage" name="blogImage" ></Field>
                        <ErrorMessage name="blogImage" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    <div>
                        <label>İçerik</label>
                        <CkEdtor data={data.content}></CkEdtor>
                        <ErrorMessage name="content" component="span" className="text-danger"></ErrorMessage>
                    </div>
                    
                    <div >
                        <label>Tarih</label>
                        <FormikDateField name="blogDate" id="blogDate" data={data.blogDate.toString().split('T')[0]} ></FormikDateField>
                    </div>
            </>)
        }

    }

    return (
        <DefaultLayout>
            <DynamicTable {...dynamicTable}></DynamicTable>
        </DefaultLayout>
    )
}
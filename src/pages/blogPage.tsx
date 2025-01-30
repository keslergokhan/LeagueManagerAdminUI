import { DefaultLayout } from "../layouts/defaultLayout"
import { BlogService } from "../services/blogService"
import { useEffect } from "react";

export const BlogPage = ():JSX.Element=>{

    const blogService = new BlogService();

    useEffect(()=>{
        blogService.GetAllAsync().then(x=>{
            console.log(x);
            console.log("getir");
        })
    })

    return (
        <DefaultLayout>
            Blog sayfası
        </DefaultLayout>
    )
}
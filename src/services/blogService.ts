import { IResultDataControl } from "../commons/base/baseResultControl"
import { ResultDataControl } from "../commons/results/resultControl"
import { ReadBlogDto } from "../entities/dtos/blogs/readBlogDto"
import { ServiceBase } from "./base/serviceBase"
import { WriteBlogDto } from "../entities/dtos/blogs/writeBlogDto"
import axios from "axios"
import { GenericServiceBase } from "./base/genericServiceBase"


export class BlogService extends GenericServiceBase<WriteBlogDto,ReadBlogDto>{

    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/blog`)
    }

}
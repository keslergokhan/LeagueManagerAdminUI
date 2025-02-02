import { IResultDataControl } from "../commons/base/baseResultControl"
import { ResultDataControl } from "../commons/results/resultControl"
import { ReadBlogDto } from "../entities/dtos/blogs/readBlogDto"
import { ServiceBase } from "./base/serviceBase"
import { WriteBlogDto } from "../entities/dtos/blogs/writeBlogDto"
import axios from "axios"


export class BlogService extends ServiceBase{

    /**
     *
     */
    constructor() {
        super();
        this.GetApiPath = `${import.meta.env.VITE_CMS_API_URL}api/blog`
    }


    public GetAllAsync = async ():Promise<IResultDataControl<Array<ReadBlogDto>>> =>{
        let result = new ResultDataControl<Array<ReadBlogDto>>();

        const ssss = await axios.get<IResultDataControl<Array<ReadBlogDto>>>(`${this.GetApiPath}/GetAll`,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })


        return result;
    }

    public AddAsync = async (data:WriteBlogDto):Promise<IResultDataControl<Array<ReadBlogDto>>> =>{
        let result = new ResultDataControl<Array<ReadBlogDto>>();

        const ssss = await axios.post<IResultDataControl<Array<ReadBlogDto>>>(`${this.GetApiPath}/Add`,data,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })

        return result;
    }

    public RemoveAsync = async (data:ReadBlogDto):Promise<IResultDataControl<Array<ReadBlogDto>>> =>{
        let result = new ResultDataControl<Array<ReadBlogDto>>();

        const ssss = await axios.post<IResultDataControl<Array<ReadBlogDto>>>(`${this.GetApiPath}/Remove/${data.id}`,null,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })

        return result;
    }

}
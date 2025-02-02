import { WriteDtoBase } from "../../base/writeDtoBase";


export interface WriteBlogDto extends WriteDtoBase {
    title:string;
    content:string;
    blogDate:Date;
    blogImage:string;
}
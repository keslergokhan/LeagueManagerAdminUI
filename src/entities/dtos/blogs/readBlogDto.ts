import { ReadDtoBase } from "../../base/readDtoBase";

export interface ReadBlogDto extends ReadDtoBase {
    title:string;
    content:string;
    blogDate:Date;
    blogImage:string;
}
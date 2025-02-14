import { ReadDtoBase } from "../../base/readDtoBase";

export interface ReadSeasonDto extends ReadDtoBase {
    name:string;
    startDate:Date;
    endDate:Date;
}
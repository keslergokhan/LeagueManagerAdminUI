import { WriteDtoBase } from "../../base/writeDtoBase";

export interface WriteLeagueDto extends WriteDtoBase{
    name:string;
    logoImage:string;
}
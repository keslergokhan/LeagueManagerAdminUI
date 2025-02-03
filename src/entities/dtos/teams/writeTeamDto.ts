import { WriteDtoBase } from "../../base/writeDtoBase";

export interface WriteTeamDto extends WriteDtoBase{
    name:string;
    description:string;
    teamLogoImage:string;
}
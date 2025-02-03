import { ReadDtoBase } from "../../base/readDtoBase";

export interface ReadTeamDto extends ReadDtoBase{
    name:string;
    description:string;
    teamLogoImage:string;
}
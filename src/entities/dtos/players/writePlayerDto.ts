import { WriteDtoBase } from "../../base/writeDtoBase";
import { WriteCityDto } from "../cities/writeCityDto";
import { WriteDistrictDto } from "../districts/writeDistrictDto";
import { WriteTeamDto } from "../teams/writeTeamDto";

export interface WritePlayerDto extends WriteDtoBase{
    name:string;
    surname:string;
    address:string;
    position:number;
    height:string;
    kilogram:number;
    birthDate:Date;
    formNumber:number;
    playerProfileImage:string;
    teamID:string;
    team:WriteTeamDto;
    isCaptain:boolean;
    isReplacement:boolean;
    cityID:string;
    districtID:string;
}
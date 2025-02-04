import { ReadDtoBase } from "../../base/readDtoBase";
import { ReadCityDto } from "../cities/readCityDto";
import { ReadDistrictDto } from "../districts/readDistrictDto";
import { ReadTeamDto } from "../teams/readTeamDto";

export interface ReadPlayerDto extends ReadDtoBase{
    name:string;
    surname:string;
    address:string;
    position:string;
    height:string;
    kilogram:number;
    birthDate:Date;
    formNumber:number;
    playerProfileImage:string;
    teamID:string;
    team:ReadTeamDto;
    isCaptain:boolean;
    isReplacement:boolean;
    city:ReadCityDto;
    cityID:string;
    districtID:string;
    district:ReadDistrictDto;
}
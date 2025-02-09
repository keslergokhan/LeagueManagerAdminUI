import { WriteDtoBase } from "../../base/writeDtoBase";
import { WriteCityDto } from "../cities/writeCityDto";
import { WriteDistrictDto } from "../districts/writeDistrictDto";
import { WriteTeamDto } from "../teams/writeTeamDto";
import { WritePlayerInfoDto } from "./writePlayerInfoDto";

export interface WritePlayerDto extends WriteDtoBase{
    name:string;
    surname:string;
    eposta:string;
    password:string;
    teamID:string;
    team:WriteTeamDto;
    playerInfo:WritePlayerInfoDto
}
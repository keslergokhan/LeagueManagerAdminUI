import { ReadDtoBase } from "../../base/readDtoBase";
import { ReadTeamDto } from "../teams/readTeamDto";
import { ReadPlayerInfo } from "./readPlayerInfoDto";

export interface ReadPlayerDto extends ReadDtoBase{
    name:string;
    surname:string;
    password:string;
    eposta:string;
    teamID:string;
    team:ReadTeamDto;
    playerInfo:ReadPlayerInfo
}
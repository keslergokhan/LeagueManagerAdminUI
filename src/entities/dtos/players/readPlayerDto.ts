import { ReadDtoBase } from "../../base/readDtoBase";
import { ReadPlayerTeamDto } from "../playerTeams/readPlayerTeamDto";
import { ReadTeamDto } from "../teams/readTeamDto";
import { ReadPlayerInfo } from "./readPlayerInfoDto";

export interface ReadPlayerDto extends ReadDtoBase{
    name:string;
    surname:string;
    password:string;
    eposta:string;
    playerInfo:ReadPlayerInfo;
    playerTeams:Array<ReadPlayerTeamDto>
}
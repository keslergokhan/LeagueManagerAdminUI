import { WriteDtoBase } from "../../base/writeDtoBase";
import { WritePlayerDto } from "../players/writePlayerDto";
import { WriteTeamDto } from "../teams/writeTeamDto";

export interface WritePlayerTeamDto extends WriteDtoBase{
    team:WriteTeamDto;
    teamID:string;
    player:WritePlayerDto;
    playerID:string;
    playerTeam:WritePlayerDto
}
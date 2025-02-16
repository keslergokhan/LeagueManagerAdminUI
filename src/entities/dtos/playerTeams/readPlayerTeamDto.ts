import { ReadDtoBase } from "../../base/readDtoBase";
import { ReadPlayerDto } from "../players/readPlayerDto";
import { ReadTeamDto } from "../teams/readTeamDto";

export interface ReadPlayerTeamDto extends ReadDtoBase{
    team:ReadTeamDto;
    teamID:string;
    player:ReadPlayerDto;
    playerID:string;
}
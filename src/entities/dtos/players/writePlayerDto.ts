import { WriteDtoBase } from "../../base/writeDtoBase";
import { WritePlayerTeamDto } from "../playerTeams/writePlayerTeamDto";
import { WritePlayerInfoDto } from "./writePlayerInfoDto";

export interface WritePlayerDto extends WriteDtoBase{
    name:string;
    surname:string;
    eposta:string;
    password:string;
    playerInfo:WritePlayerInfoDto;
    playerTeams:Array<WritePlayerTeamDto>
}
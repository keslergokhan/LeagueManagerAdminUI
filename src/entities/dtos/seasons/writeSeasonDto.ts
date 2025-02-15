import { WriteDtoBase } from "../../base/writeDtoBase";

export interface WriteSeasonDto extends WriteDtoBase{
    name:string;
    startDate:Date;
    endDate:Date; 
    isFinish:Boolean;
    leagueID:string;
}
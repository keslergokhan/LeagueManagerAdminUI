import { ReadDtoBase } from "../../base/readDtoBase";
import { ReadSeasonDto } from "../seasons/readSeasonDto";

export interface ReadLeagueDto extends ReadDtoBase {
    name:string;
    logoImage:string;
    seasons:Array<ReadSeasonDto>
}
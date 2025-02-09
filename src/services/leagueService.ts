import { ReadLeagueDto } from "../entities/dtos/leagues/readLeagueDto";
import { WriteLeagueDto } from "../entities/dtos/leagues/writeLeagueDto";
import { GenericServiceBase } from "./base/genericServiceBase";

export class LeagueService extends GenericServiceBase<WriteLeagueDto,ReadLeagueDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/league`); 
    }
}
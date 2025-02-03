import { GenericServiceBase } from "./base/genericServiceBase";
import { WriteTeamDto } from "../entities/dtos/teams/writeTeamDto";
import { ReadTeamDto } from "../entities/dtos/teams/readTeamDto";           

export class TeamService extends GenericServiceBase<WriteTeamDto,ReadTeamDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/team`);
    }
}
import { ReadSeasonDto } from "../entities/dtos/seasons/readSeasonDto";
import { WriteSeasonDto } from "../entities/dtos/seasons/writeSeasonDto";
import { GenericServiceBase } from "./base/genericServiceBase";


export class SeasonService  extends GenericServiceBase<WriteSeasonDto,ReadSeasonDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/season`);
    }
}
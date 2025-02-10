import { IResultDataControl } from "../commons/base/baseResultControl";
import { ResultDataControl } from "../commons/results/resultControl";
import { ReadSeasonDto } from "../entities/dtos/seasons/readSeasonDto";
import { WriteSeasonDto } from "../entities/dtos/seasons/writeSeasonDto";
import { GenericServiceBase } from "./base/genericServiceBase";
import axios from "axios";


export class SeasonService  extends GenericServiceBase<WriteSeasonDto,ReadSeasonDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/season`);
    }

    /**
     * Lig id göre tüm sezonları getir.
     * @param id LeagueID
     * @returns 
     */
    public GetAllSeasonByLeagueID = async (id:string):Promise<IResultDataControl<Array<ReadSeasonDto>>> =>{
        const result = new ResultDataControl<Array<ReadSeasonDto>>();
        await axios.get<IResultDataControl<Array<ReadSeasonDto>>>(`${this.GetApiPath}/getAllSeasonByLeagueId/${id}`,this.AxiosHeaderConfig()).then(x=>{
            result.SetSuccessData(x.data.data);
        }).catch(x=>{
            result.Fail();
        })
        return result;
    }
}
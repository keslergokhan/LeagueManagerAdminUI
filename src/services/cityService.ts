import { ReadCityDto } from "../entities/dtos/cities/readCityDto";
import { WriteCityDto } from "../entities/dtos/cities/writeCityDto";
import { GenericServiceBase } from "./base/genericServiceBase";

export class CityService extends GenericServiceBase<WriteCityDto,ReadCityDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/city`);
    }
}
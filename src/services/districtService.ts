import { ReadDistrictDto } from "../entities/dtos/districts/readDistrictDto";
import { WriteDistrictDto } from "../entities/dtos/districts/writeDistrictDto";
import { GenericServiceBase } from "./base/genericServiceBase";
import { ISearchSelectItem,SearchSelectItem } from "../models/shareds/searchSelectItem";
import { IResultDataControl } from "../commons/base/baseResultControl";
import { ResultDataControl } from "../commons/results/resultControl";

export class DistrictService extends GenericServiceBase<WriteDistrictDto,ReadDistrictDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/district`);
    }
    
}
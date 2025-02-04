import { ReadPlayerDto } from "../entities/dtos/players/readPlayerDto";
import { WritePlayerDto } from "../entities/dtos/players/writePlayerDto";
import { GenericServiceBase } from "./base/genericServiceBase";

export class PlayerService extends GenericServiceBase<WritePlayerDto,ReadPlayerDto>{
    /**
     *
     */
    constructor() {
        super(`${import.meta.env.VITE_CMS_API_URL}api/player`);
    }
}
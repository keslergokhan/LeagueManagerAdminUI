import { WriteCityDto } from "../cities/writeCityDto";
import { WriteDistrictDto } from "../districts/writeDistrictDto";

export interface WritePlayerInfoDto{
    location1:number;
    location2:number;
    location3:number;
    height:number;
    kilogram:number;
    birthDate:Date;
    formNumber:number;
    playerProfileImage:string;
    isCaptain:boolean;
    powerFoot:number;
    socialMediaJSON:string;
    districtID:string;
    cityID:string;
}
import { ReadCityDto } from "../cities/readCityDto";
import { ReadDistrictDto } from "../districts/readDistrictDto";

export interface ReadPlayerInfo{
    location1:number;
    location2:number;
    location3:number;
    height:number;
    kilogram:number;
    birthDate:Date;
    formNumber:number;
    playerProfileImage:string;
    isCaptain:boolean;
    age:number;
    powerFoot:number;
    socialMediaJSON:string;
    districtID:string;
    cityID:string;
    city:ReadCityDto
    district:ReadDistrictDto
}
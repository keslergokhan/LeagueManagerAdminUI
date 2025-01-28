import { createContext } from "react";
import { BreadCrumbItem } from "../models/shareds/breadCrumbItem";

export interface AppBaseContextProp {
    SetBreadCrumbs:(item:BreadCrumbItem | null,isClear:boolean)=>void;
    BreadCrumbs:Array<BreadCrumbItem>
}


const appBaseContextProp:AppBaseContextProp = {
    SetBreadCrumbs:(item:BreadCrumbItem | null,isClear:boolean):void=>{},
    BreadCrumbs:[]
}

export const AppBaseContext = createContext<AppBaseContextProp>(appBaseContextProp);


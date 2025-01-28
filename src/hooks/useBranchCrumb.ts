import { useContext} from "react";
import { AppBaseContext} from "../contexts/appBaseContext";
import { BreadCrumbItem } from "../models/shareds/breadCrumbItem";
import { PageRoute } from "../constants/pageRoute";

export const useSetBreadCrumb = (item:BreadCrumbItem|null,isClear:boolean):Array<BreadCrumbItem> =>{

    const context = useContext(AppBaseContext);
    context.SetBreadCrumbs(item,isClear);
    return context.BreadCrumbs;
}

export const useSetBreadCrumb2 = (item:PageRoute,isClear:boolean):Array<BreadCrumbItem> =>{

    const context = useContext(AppBaseContext);
    context.SetBreadCrumbs({title:item.Title,path:item.Path},isClear);
    return context.BreadCrumbs;
}


export const useBreadCrumb = ():Array<BreadCrumbItem> =>{
    const context = useContext(AppBaseContext);
    return context.BreadCrumbs;
}

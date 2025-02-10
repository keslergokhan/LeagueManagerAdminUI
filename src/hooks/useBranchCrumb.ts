import { useContext} from "react";
import { AppBaseContext} from "../contexts/appBaseContext";
import { BreadCrumbItem } from "../models/shareds/breadCrumbItem";
import { PageRoute } from "../constants/pageRoute";

export const useSetBreadCrumb = (item:BreadCrumbItem,isClear:boolean) =>{

    const context = useContext(AppBaseContext);
    context?.SetBreadCrumbs(item,isClear);
}

export const useSetBreadCrumb2 = (item:PageRoute,isClear:boolean) =>{

    const context = useContext(AppBaseContext);
    context?.SetBreadCrumbs({title:item.Title,path:item.Path},isClear);
}

export const useSetArrayBreadCrumb = (items:Array<BreadCrumbItem>,isClear:boolean) =>{

    const context = useContext(AppBaseContext);
    context?.SetArrayBreadCrumbs(items,isClear);
}


export const useBreadCrumb = ():Array<BreadCrumbItem>|null =>{

    const context = useContext(AppBaseContext);
    return context.BreadCrumbs();
}

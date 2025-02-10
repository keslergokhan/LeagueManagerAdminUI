import { createContext } from "react";
import { BreadCrumbItem } from "../models/shareds/breadCrumbItem";

export interface AppBaseContextProps {
    SetBreadCrumbs:(item:BreadCrumbItem,isClear:boolean)=>void;
    SetArrayBreadCrumbs:(items:Array<BreadCrumbItem>,isClear:boolean)=>void;
    BreadCrumbs:()=>Array<BreadCrumbItem>;
}

export class AppBaseContextPropsService implements AppBaseContextProps {
    private breadCrumbs:Array<BreadCrumbItem>;
    private LocalStorageKey:string = "breadcrumb_list";
  
    constructor() {
        this.breadCrumbs = new Array<BreadCrumbItem>();
    }

    public SetLoading: (state:boolean)=>void;

    public BreadCrumbs=()=>{
        return this.GetLocalStorage();
    }

    private SetLocalStorage = () =>{
        localStorage.setItem(this.LocalStorageKey, JSON.stringify(this.breadCrumbs));
    }

    private GetLocalStorage = ():Array<BreadCrumbItem>=>{
        const breadcrumbJSON = localStorage.getItem(this.LocalStorageKey);
        if(breadcrumbJSON!=null){
            this.breadCrumbs = JSON.parse(breadcrumbJSON);
        }else{
            this.breadCrumbs = new Array<BreadCrumbItem>();
        }

        return this.breadCrumbs;
    }

   
    public SetArrayBreadCrumbs = (items: Array<BreadCrumbItem>, isClear: boolean) => {
        items.forEach(x=>{
            this.SetBreadCrumbs(x,isClear);
        })
    }
    public SetBreadCrumbs = (item:BreadCrumbItem | null,isClear:boolean):void=>{
        if(item!=null){
            this.GetLocalStorage();
            if(isClear){
                this.breadCrumbs.splice(0,this.breadCrumbs.length);
                this.breadCrumbs.push(item);
            }else{
                if(this.breadCrumbs.filter(x=>x.title == item.title).length==0){
                    this.breadCrumbs.push(item);
                }
            }
            this.SetLocalStorage();
        }
    }
}

export const AppBaseContext = createContext<AppBaseContextProps>(new AppBaseContextPropsService());


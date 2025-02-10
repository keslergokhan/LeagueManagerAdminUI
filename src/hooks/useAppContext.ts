import { useContext} from "react";
import { AppBaseContext, AppBaseContextProps} from "../contexts/appBaseContext";
import { BreadCrumbItem } from "../models/shareds/breadCrumbItem";
import { PageRoute } from "../constants/pageRoute";

export const useAppContext = ():AppBaseContextProps =>{

    return useContext(AppBaseContext);
}
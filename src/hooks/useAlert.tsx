import { useState} from "react"
import { Icon } from "@iconify/react/dist/iconify.js"

export enum AlertState{
    success="success",
    error="danger",
    warning="warning"
}
export interface useAlertProp{
    alertState:AlertState;
    message?:string;
    html?:JSX.Element
}

export const useALert = ():[JSX.Element,(prop:useAlertProp)=>void] => {
    const [alertShow,setAlertShow] = useState<boolean>();
    const [alertProp,setAlertProp] = useState<useAlertProp | null>(null);

    let alertJsx:JSX.Element = (<></>);

    /**
     * Alert close button
     */
    const closeAlertHandler = ()=>{
        alertJsx = (<></>);
        setAlertShow(false);
    }

    /**
     * Alert set prop
     * @param prop 
     */
    const setAlertPropHandler = (prop:useAlertProp):void=>{
        setAlertShow(true);
        setAlertProp(prop);
    }

    if(alertShow == true){
        const alertState = alertProp?.alertState;
        const className = `alert alert-${alertState} bg-${alertState}-100 text-${alertState}-600 border-${alertState}-600 border-start-width-4-px border-top-0 border-end-0 border-bottom-0 px-24 py-13 mb-0 fw-semibold text-lg radius-4 d-flex align-items-center justify-content-between`;
        const buttonClassName = `remove-button text-${alertState}-600 text-xxl line-height-1`;
        
        alertJsx=(<>
            <div className={className}
                        role="alert"
                    >
                <div className="d-flex align-items-center gap-2">
                    <Icon
                        icon="bx:error"
                        className="icon text-xl"
                    />
                    {(alertProp?.html == undefined ? alertProp?.message:alertProp.html)}
                </div>
                <button type="button" className={buttonClassName}>
                    {" "}
                    <Icon onClick={closeAlertHandler} icon="iconamoon:sign-times-light" className="icon" />
                </button>
            </div>
        </>);
    }

    return [alertJsx,setAlertPropHandler];
}
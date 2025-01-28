import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react";

export const useSpinner = (elementRef:React.RefObject<HTMLElement>):[JSX.Element,(state:boolean)=>void] =>{

    const [spinnerShow,setSpinnerShow] = useState<boolean>(false);
    let icon:JSX.Element = (<></>);

    const setSpinnerShowHandler = (state:boolean):void=>{
        setSpinnerShow(state);
    }

    if(spinnerShow){
        if(elementRef.current){
            elementRef.current.style.opacity = "0.8";
            elementRef.current.style.pointerEvents = "none";
        }
        icon=(<Icon icon="svg-spinners:ring-resize" width="24" height="24" style={{color:"#fff"}} />);
    }else{
        if(elementRef.current){
            elementRef.current.style.opacity = "1";
            elementRef.current.style.pointerEvents = "auto";
        }
    }

    return [icon,setSpinnerShowHandler]
}
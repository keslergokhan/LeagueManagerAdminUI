import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react";

export const useSpinner = 
(elementRef:React.RefObject<HTMLElement>,styles?:React.CSSProperties|undefined,message?:JSX.Element|undefined):
[JSX.Element,(state:boolean)=>void,state:boolean] =>{

    const [spinnerShow,setSpinnerShow] = useState<boolean>(false);
    let icon:JSX.Element = (<></>);

    if(styles==undefined){
        styles={color:"#fff",width:"50",height:"50"}
    }

    if(message==undefined){
        message = <></>;
    }

    const setSpinnerShowHandler = (state:boolean):void=>{
        setSpinnerShow(state);
    }

    if(spinnerShow){
        if(elementRef.current){
            elementRef.current.style.opacity = "0.8";
            elementRef.current.style.pointerEvents = "none";
        }
        icon=(<><Icon icon="svg-spinners:ring-resize" width="24" height="24" style={styles} /> {message}</>);
    }else{
        if(elementRef.current){
            elementRef.current.style.opacity = "1";
            elementRef.current.style.pointerEvents = "auto";
        }
    }

    return [icon,setSpinnerShowHandler,spinnerShow]
}
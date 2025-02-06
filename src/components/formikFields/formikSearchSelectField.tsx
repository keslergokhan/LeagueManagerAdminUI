import { Autocomplete,TextField } from "@mui/material";
import { useField } from "formik";
import { Field } from "formik";
import { useEffect } from "react";

interface FormikSearchSelectProp{
    name:string;
    id:string;
    label:string;
    style?:React.CSSProperties;
    options?:Array<any>
    type:string;
    currentData?:any
}

export const FormikSearchSelectField = (props:FormikSearchSelectProp):JSX.Element =>{
    const [field,meta,helper] = useField(props);
    const {currentData,...restoreProps} = props;
    let value = "";
    useEffect(()=>{
        if(currentData != undefined){
            helper.setValue(currentData["value"]);
            value = currentData["value"];
        }
       
    },[])
    
    return (
        <>
            <Field {...field} {...restoreProps} hidden></Field>
            <Autocomplete
                disablePortal
                value={currentData}
                options={props.options ? props.options : new Array<any>}
                onChange={(_,newValue)=>{
                    if(newValue){
                        helper.setValue(newValue["value"])
                    }else{
                        helper.setValue("");
                    }
                }}
                
                renderInput={(params) => <TextField {...params} label={props.label} />}
             />
        </>
    );
}
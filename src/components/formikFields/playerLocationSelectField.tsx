import { useField } from "formik";
import { Field } from "formik";
import { PlayerPosition } from "../../constants/playerLocation";
import { useEffect } from "react";
import { ErrorMessage } from "formik";

interface PlayerPositionSelectProps {
    name:string;
    label:string;
    id:string;
    data?:number;
}

export const PlayerPositionSelectField = (props:PlayerPositionSelectProps):JSX.Element=>{
    
    const [field,meta,helper] = useField(props);

    useEffect(()=>{
        if(props.data){
            helper.setValue(props.data);
        }
    },[])

    return (
        <>
            <label>{props.label}</label>
            <Field {...field} {...props} type="number" hidden></Field>
            <select className="form-control" 
                onChange={(x)=>{
                    if(x.target){
                        helper.setValue(x.target.value);
                        x.target.querySelector(`[value="${x.target.value}"]`)?.setAttribute("selected","true")
                    }
                }}>

                {PlayerPosition.map((x,i)=>{
                    if(props.data == x.value){
                        return <option value={x.value} key={i}>{x.key}</option>
                    }else{
                        return <option value={x.value} key={i}>{x.key}</option>
                    }
                    
                })}
            </select>
            <ErrorMessage name={props.name} component="span" className="text-danger" ></ErrorMessage>
        </>
    );
}
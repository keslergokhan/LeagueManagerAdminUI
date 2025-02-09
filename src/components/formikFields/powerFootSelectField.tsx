import { useField } from "formik";
import { Field } from "formik";
import { useEffect } from "react";

interface PowerFootSelectFieldProp{
    name:string;
    label:string;
    data?:number;
}

export const PowerFootSelectField = (props:PowerFootSelectFieldProp):JSX.Element =>{
    const [field,meta,helper] = useField(props);

    useEffect(()=>{
        if(props.data){
            helper.setValue(props.data);
        }else{
            helper.setValue(0);
        }
    },[])
    return (
        <>
            <label>{props.label}</label>
            <Field {...field} {...props} hidden></Field>
            <select className="form-control"  onChange={(e)=>{
                if(e.target){
                    helper.setValue(e.target.value);
                }
            }}>
                <option value={0}>Boş</option>
                <option value={1}>Sağ</option>
                <option value={2}>Sol</option>
            </select>
        </>
    );
}
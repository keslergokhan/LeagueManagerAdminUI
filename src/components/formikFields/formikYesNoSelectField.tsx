import { Field } from "formik";
import { useField } from "formik";
import { useEffect } from "react";
import { ErrorMessage } from "formik";

interface FormikYesNoSelectFieldProp{
    id:string;
    name:string;
    label:string;
    data?:boolean;
}

export const FormikYesNoSelectField = (props:FormikYesNoSelectFieldProp):JSX.Element =>{

    const [field,meta,helper] = useField(props);
    useEffect(()=>{
        if(props.data != undefined){
            helper.setValue(props.data);
        }else{
            helper.setValue(false);
        }
    },[])

    return (
        <>
            <label>{props.label}</label>
            <Field {...field} name={props.name} id={props.id} type="text" hidden></Field>
            <select className="form-control" 
            onChange={(x)=>{
                if(x.target){
                    if(x.target.value == "true"){
                        helper.setValue(true);
                    }else{
                        helper.setValue(false);
                    }
                }
            }}>

                <option value="false">Hayır</option>
                <option value="true">Evet</option>
            </select>
            <ErrorMessage name={props.name} component="span" className="text-danger" ></ErrorMessage>
        </>
    );
}
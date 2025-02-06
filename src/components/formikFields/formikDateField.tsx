import { ErrorMessage, useField} from "formik";
import { useEffect } from "react";

interface FormikDateFieldProp{
    id:string;
    name:string;
    data?:string;
    style?:React.CSSProperties
}

export const FormikDateField = (props:FormikDateFieldProp):JSX.Element =>{

    const [field,meta,helper] = useField(props);

    useEffect(()=>{
        if(props.data){
            helper.setValue(props.data);
        }
    },[]);

    return (
        <div>
            <input type="date" {...field} {...props} className="form-control" ></input>
            <ErrorMessage className="text-danter" name={props.name} id={props.id} ></ErrorMessage>
        </div>
        
    );
}
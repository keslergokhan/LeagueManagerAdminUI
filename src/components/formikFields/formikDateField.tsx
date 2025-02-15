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
        if(field.value){
            if(typeof(field.value) == "object"){
                if(new Date(field.value).toLocaleDateString().indexOf('T') != -1){
                    helper.setValue(new Date(field.value).toLocaleDateString().split('T')[0])
                }
            }else{
                helper.setValue(field.value.toString().split('T')[0])
            }
            
        }
        
        if(props.data){
            helper.setValue(props.data.toString().split('T')[0]);
        }
    },[]);

    return (
        <div>
            <input type="date" {...field} {...props} className="form-control" ></input>
            <ErrorMessage className="text-danter" name={props.name} id={props.id} ></ErrorMessage>
        </div>
        
    );
}
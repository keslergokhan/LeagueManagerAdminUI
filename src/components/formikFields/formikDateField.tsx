import { ErrorMessage, useField} from "formik";

interface FormikDateFieldProp{
    id:string;
    name:string;
}

export const FormikDateField = (props:FormikDateFieldProp):JSX.Element =>{

    const [field,meta,helper] = useField(props);

    return (
        <div>
            <input type="date" {...field} {...props} className="form-control"  ></input>
            <ErrorMessage className="text-danter" name={props.name} id={props.id} ></ErrorMessage>
        </div>
        
    );
}
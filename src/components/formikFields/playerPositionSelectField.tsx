import { useField } from "formik";
import { Field } from "formik";
import { PlayerPosition } from "../../constants/playerPosition";
import { useEffect } from "react";

interface PlayerPositionSelectProps {
    name:string;
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
            <label>Mevki</label>
            <Field {...field} {...props} type="text" hidden></Field>
            <select className="form-control" value={(props.data ? props.data:1)}
                onChange={(x)=>{
                    if(x.target){
                        helper.setValue(x.target.value);
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
        </>
    );
}
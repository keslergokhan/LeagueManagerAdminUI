import { ReadDtoBase } from "../../entities/base/readDtoBase";
import { WriteDtoBase } from "../../entities/base/writeDtoBase";
import { IResultDataControl } from "../../commons/base/baseResultControl";
import { ResultDataControl } from "../../commons/results/resultControl";
import { ServiceBase } from "./serviceBase";
import axios from "axios"
import { ReadPlayerDto } from "../../entities/dtos/players/readPlayerDto";


export abstract class GenericServiceBase<TRequest extends WriteDtoBase,TResponse extends ReadDtoBase> extends ServiceBase{

    /**
     *
     */
    constructor(GetApiPath:string) {
        super(GetApiPath);
        
    }

    public Get = async (ID:string):Promise<IResultDataControl<TResponse>>=>{
        let result = new ResultDataControl<TResponse>();

        await axios.get<IResultDataControl<TResponse>>(`${this.GetApiPath}/get/${ID}`,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })

        return result;
    }

    public GetAllAsync = async ():Promise<IResultDataControl<Array<TResponse>>> =>{
        let result = new ResultDataControl<Array<TResponse>>();

        await axios.get<IResultDataControl<Array<TResponse>>>(`${this.GetApiPath}/GetAll`,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })

        return result;
    }

    public AddAsync = async (data:TRequest):Promise<IResultDataControl<Array<TResponse>>> =>{
        let result = new ResultDataControl<Array<TResponse>>();

        await axios.post<IResultDataControl<Array<TResponse>>>(`${this.GetApiPath}/Add`,data,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })

        return result;
    }

    public RemoveAsync = async (data:TResponse):Promise<IResultDataControl<Array<TResponse>>> =>{
        let result = new ResultDataControl<Array<TResponse>>();

        await axios.post<IResultDataControl<Array<TResponse>>>(`${this.GetApiPath}/Remove/${data.id}`,null,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        })

        return result;
    }

    public UpdateAsync = async (data:TRequest):Promise<IResultDataControl<Array<TResponse>>> => {
        let result = new ResultDataControl<Array<TResponse>>();

        await axios.post<IResultDataControl<Array<TResponse>>>(`${this.GetApiPath}/Update`,data,this.AxiosHeaderConfig())
        .then(x=>{
            result = x.data;
        }).catch(x=>{
            result.Fail();
        });

        return result;
    }


}
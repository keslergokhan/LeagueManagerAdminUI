import { BaseResultControl,IResultDataControl } from "../base/baseResultControl";


export class ResultControl extends BaseResultControl{

    
}

export class ResultDataControl<T extends any> extends BaseResultControl implements IResultDataControl<T>
{
    public data:T;
    public SetData(data:T):IResultDataControl<T>{
        this.data = data;
        return this;
    }
    public SetSuccessData(data:T):IResultDataControl<T>{
        this.Success();
        this.data = data;
        return this;
    }
}
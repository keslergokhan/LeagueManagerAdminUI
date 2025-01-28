export interface IResultControl{
    isSuccess:boolean;
    Success():IResultControl;
    Fail():IResultControl
}

export interface IResultDataControl<T> extends IResultControl{
    data:T;
    SetData(data:T):IResultDataControl<T>;
    SetSuccessData(data:T):IResultDataControl<T>;
}

export abstract class BaseResultControl implements IResultControl{
    public isSuccess:boolean;
    /**
     *
     */
    constructor() {
        this.isSuccess = false;
    }
    public Success():IResultControl{
        this.isSuccess = true;
        return this;
    }

    public Fail():IResultControl{
        this.isSuccess = false;
        return this;
    }
}


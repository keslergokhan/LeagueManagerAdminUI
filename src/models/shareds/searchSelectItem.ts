export interface ISearchSelectItem<T extends string | number | Date | Boolean>{
    label:string;
    value:T
}

export class SearchSelectItem<T extends string | number | Date | Boolean> implements ISearchSelectItem<T>{
    label: string;
    value: T;
    /**
     *
     */
    constructor(label:string,value:T) {
        this.label = label;
        this.value = value;
    }
}
interface PlayerPosition{
    value:number;
    key:string;
}

export const PlayerPosition = new Array<PlayerPosition>(
    {value:0,key:"Boş"},
    {value:1,key:"Kaleci"},
    {value:2,key:"Defans"},
    {value:3,key:"Orta Saha"},
    {value:4,key:"Forvet"},
);
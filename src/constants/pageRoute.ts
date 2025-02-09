import { LeaguePage } from "../pages/leaguePage";

export class PageRoute{
    Title:string;
    Path:string;

    constructor(title:string,path:string){
        this.Title=title;
        this.Path=path;
    }

    SetID = (id:string):string =>{
        return this.Path.replace(":id",id);
    }
}

export const PageRoutes = {
    Login:new PageRoute("Login","/login"),
    Home:new PageRoute("Home","/home"),
    League:new PageRoute("Ligler","/league"),
    Season:new PageRoute("Sezonlar","/season/:id"),
    TaskRouteGroup:new PageRoute("Task Route Group","/taskroutegroup")
}
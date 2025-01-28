export class PageRoute{
    Title:string;
    Path:string;

    constructor(title:string,path:string){
        this.Title=title;
        this.Path=path;
    }
}

export const PageRoutes = {
    Login:new PageRoute("Login","/login"),
    Home:new PageRoute("Home","/home"),
    TaskRouteGroup:new PageRoute("Task Route Group","/taskroutegroup")
}
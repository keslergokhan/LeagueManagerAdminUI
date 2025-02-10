import { LeftMenuComponent } from "../components/leftMenuComponents/leftMenuComponent";
import { useAuth } from "../hooks/useAuth";
import { BreadCrumb } from "../components/shareds/breadCrumb";
import { useAppContext} from "../hooks/useAppContext";
import { Stack,Typography,Box } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

interface DefaultLayoutProp{
    children:React.ReactNode;
}

export const DefaultLayout = (props:DefaultLayoutProp):JSX.Element =>{
    const useAutResult = useAuth();
    const context = useAppContext();

    const Content = (content:React.ReactNode):JSX.Element=>{
        return (
            <>
                <BreadCrumb></BreadCrumb>
                {content}
            </>
        )
    }
    if(useAutResult?.isSuccess){
        
        return (
            <>
                <section className="overlay">
                    <LeftMenuComponent></LeftMenuComponent>
                    <main className="dashboard-main">
                        <div className="dashboard-main-body">
                            {(Content(props.children))}
                        </div>
                    </main>
                </section>
            </>
        )
    }else{
        return (<></>);
    }
    
}
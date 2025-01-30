import { LeftMenuComponent } from "../components/leftMenuComponents/leftMenuComponent";
import { useAuth } from "../hooks/useAuth";
import { BreadCrumb } from "../components/shareds/breadCrumb";

interface DefaultLayoutProp{
    children:React.ReactNode;
}

export const DefaultLayout = (props:DefaultLayoutProp):JSX.Element =>{
    const useAutResult = useAuth();


    if(useAutResult?.isSuccess){
        return (
            <>
                <section className="overlay">
                    <LeftMenuComponent></LeftMenuComponent>
                    <main className="dashboard-main">
                        <div className="dashboard-main-body">
                            <BreadCrumb></BreadCrumb>
                            {props.children}
                        </div>
                    </main>
                </section>
            </>
        )
    }else{
        return (<></>);
    }
    
}
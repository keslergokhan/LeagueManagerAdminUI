import { Icon } from "@iconify/react/dist/iconify.js";
import { useBreadCrumb } from "../../hooks/useBranchCrumb";
import { Link } from "react-router-dom";

export const BreadCrumb = ():JSX.Element => {

    const breadCrumbs = useBreadCrumb();

    const breadCrumbHtml = new Array<JSX.Element>();

    breadCrumbs?.map((x,i)=>{

        let link:JSX.Element;
        if(i==breadCrumbs.length-1){
            link = <span>{x.title}</span>;
        }else{
            if(x.path){
                link = <Link to={x.path}>{x.title }</Link>;
            }else{
                link = <Link to="">{x.title }</Link>;
            }
        }

        const content = (
            <>
                <span key={i}> 
                    {(i!=0?<Icon icon="material-symbols-light:play-arrow-rounded" width="24" height="24"  style={{color: "#423535"}} />:"")} 
                    {link}
                </span>
            </>
        );
        breadCrumbHtml.push(content);
    })
    return (
    <>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24" >
            <h6 className="fw-semibold mb-0">
                {breadCrumbHtml.map((x,i)=>{
                    return <span key={i}>{x}</span>
                })}
            </h6>
        </div>
    </>);
}
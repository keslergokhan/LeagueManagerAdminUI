import { Icon } from "@iconify/react/dist/iconify.js";
import { useBreadCrumb } from "../../hooks/useBranchCrumb";

export const BreadCrumb = ():JSX.Element => {

    const breadCrumbs = useBreadCrumb();
    return (
    <>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24" >
            <h6 className="fw-semibold mb-0">
                {
                    
                    breadCrumbs.map((x,i)=>(<span key={i}> {(i!=0?<Icon icon="material-symbols-light:play-arrow-rounded" width="24" height="24"  style={{color: "#423535"}} />:"")} {x.title} </span>))
                }
            </h6>
        </div>
    </>);
}
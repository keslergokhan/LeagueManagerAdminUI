

interface CmsCardBodyProp {
    children :React.ReactNode;
    xxlCol:number;
    xlCol:number;
}

export const CmsCardBody = (props:CmsCardBodyProp):JSX.Element =>{
    
    
    const col = `col-xxl-${props.xxlCol} col-xl-${props.xlCol} mt-3 mb-3`;
    return (
        <div className={col} onClick={()=>{}}>
                <div className="card h-100">
                    <div className="card-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between" >
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
    )
}
import { Icon } from "@iconify/react/dist/iconify.js"
import { useRef } from "react"

export const AlertError = () =>{

    const alertUseRef = useRef<HTMLDivElement>(null);
    const closeAlertHandler = ()=>{
        alertUseRef.current?.remove();
    }

    return (<>
        <div ref={alertUseRef} className="alert alert-danger bg-danger-100 text-danger-600 border-danger-600 border-start-width-4-px border-top-0 border-end-0 border-bottom-0 px-24 py-13 mb-0 fw-semibold text-lg radius-4 d-flex align-items-center justify-content-between"
                    role="alert"
                >
            <div className="d-flex align-items-center gap-2">
                <Icon
                    icon="bx:error"
                    className="icon text-xl"
                />
                This is a danger alert
            </div>
            <button type="button" className="remove-button text-danger-600 text-xxl line-height-1">
                {" "}
                <Icon onClick={closeAlertHandler} icon="iconamoon:sign-times-light" className="icon" />
            </button>
        </div>
    </>)
}
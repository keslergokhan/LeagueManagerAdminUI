import { Icon } from "@iconify/react/dist/iconify.js"

export const AlertSuccess = () =>{
    return (<>
        <div className="alert alert-success bg-success-100 text-success-600 border-success-600 border-start-width-4-px border-top-0 border-end-0 border-bottom-0 px-24 py-13 mb-0 fw-semibold text-lg radius-4 d-flex align-items-center justify-content-between"
                    role="alert"
                >
            <div className="d-flex align-items-center gap-2">
                <Icon
                    icon="akar-icons:double-check"
                    className="icon text-xl"
                />
                This is a Success alert
            </div>
            <button className="remove-button text-success-600 text-xxl line-height-1">
                {" "}
                <Icon icon="iconamoon:sign-times-light" className="icon" />
            </button>
        </div>
    </>)
}
import { toast} from 'react-toastify'

export interface YesNoToastProps{
    content:JSX.Element,
    yesHandlerAsync?:()=>Promise<void>,
    noHandlerAsync?:()=>Promise<void>
}

export class ToastHelper{

    static YesNoToast = (props:YesNoToastProps):void =>{
        var id = toast(
            ({ closeToast }) => (
              <div style={{ textAlign: "center" }}>
                <span style={{ margin: "0 0 10px" }}>{props.content}</span>
                <div>
                  <button
                    onClick={() => {
                        if(props.yesHandlerAsync){
                            props.yesHandlerAsync();
                        }
                        toast.dismiss(id);
                    }}
                    style={{
                      marginRight: "10px",
                      padding: "5px 15px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={(e) => {
                        if(props.noHandlerAsync){
                            props.noHandlerAsync();
                        }
                        toast.dismiss(id);
                    }}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            ),
            {
                style:{top:"100px"},
                position:"top-center",
                autoClose: 2500, // Kullanıcı bir seçim yapana kadar kapanmaz
                closeOnClick: false, // Toast'a tıklama ile kapanmayı engeller
            }
            );
    }

    static DefaultError = ():void =>{
      ToastHelper.Error(<>Beklenmedik teknik bir problem yaşandı !</>);
    };

    static Error = (content:JSX.Element):void =>{
      toast.error(content, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }

    static Success = (content:JSX.Element):void =>{
      toast.success(content, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
}
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router-dom'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { AuthService } from '../../services/authService';
import { IResultDataControl } from '../../commons/base/baseResultControl';
import { Lclztn } from '../../constants/localization';
import { AlertState, useALert } from '../../hooks/useAlert';
import { useSpinner } from '../../hooks/useSpinnerElement';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants/pageRoute';
import { GetJwtTokenResModel } from '../../models/auths/getJwtTokenResModel';

interface SignInFormInValues {
    email:string;
    password:string;
}

export const SignInLayer = ():JSX.Element => {
    const navigate = useNavigate();
    const [useAlertJsx,setUseAlertProp] = useALert();
    const submitButtonRef = useRef(null);
    const [useSpinnerHtml,setSpinnerState] = useSpinner(submitButtonRef);
    
    const signInFormInValues:SignInFormInValues = {
        email:"",
        password:""
    }

    /** Login form */
    const signInOnSubmitHandler = async (values:SignInFormInValues) =>{
        setSpinnerState(true);
        const jwtTokenResult:IResultDataControl<GetJwtTokenResModel> = await AuthService.GetJwtTokenAsync(values.email,values.password);
        
        if(jwtTokenResult.isSuccess){
            navigate(PageRoutes.Home.Path);
        }else{
            setUseAlertProp({
                message:Lclztn.errorUserAndPassword().Get(),
                alertState :AlertState.error
            });
        }
        
        console.log(jwtTokenResult);
        setSpinnerState(false);
    }
    
    const validationSchema = Yup.object({
        email:Yup.string()
        .required(Lclztn.empty().Get())
        .max(50,Lclztn.max().AddValue("50").Get())
        .email(Lclztn.emailNotFormat().Get()),
        
        password:Yup.string()
        .required(Lclztn.empty().Get())
        .max(50,Lclztn.max().AddValue("50").Get())
    });

    /** password input gizle göster */
    var [passwordEyeState,setPasswordEyeState] = useState<boolean>(true);
    var passwordEyeOnclickHandler = ():void => {
        setPasswordEyeState(!passwordEyeState);
    }


    return (
        <section className="auth bg-base d-flex flex-wrap">
            <div className="auth-left d-lg-block d-none">
                <div className="d-flex align-items-center flex-column h-100 justify-content-center">
                    <img src="assets/images/auth/auth-img.png" alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <Link to="/" className="mb-40 max-w-290-px">
                            <img src="assets/images/logo.png" alt="" />
                        </Link>
                        <h4 className="mb-12">Lig Yönetim Paneli</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                        Tekrar hoş geldiniz! Lütfen bilgilerinizi giriniz.
                        </p>
                    </div>
                    
                    <Formik 
                    onSubmit={signInOnSubmitHandler} 
                    initialValues={signInFormInValues}
                    validationSchema={validationSchema}
                    >
                        <Form action="#">
                        
                            {useAlertJsx}
                            <div className='mb-16 mt-3'>
                                <div className="icon-field">
                                    <span className="icon top-50 translate-middle-y">
                                        <Icon icon="mage:email" />
                                    </span>
                                    <Field 
                                        type="email"
                                        className="form-control h-56-px bg-neutral-50 radius-12"
                                        placeholder="Email"
                                        name='email' id='email'>
                                    </Field>
                                </div>
                                <ErrorMessage name="email" component="span" className="text-danger" />
                            </div>
                            
                            <div className='mb-20'>
                                <div className="position-relative">
                                    <div className="icon-field">
                                        <span className="icon top-50 translate-middle-y">
                                            <Icon icon="solar:lock-password-outline" />
                                        </span>
                                        <Field
                                            type={passwordEyeState?"password":"text"}
                                            className="form-control h-56-px bg-neutral-50 radius-12"
                                            id="your-password"
                                            placeholder="Password"
                                            name='password'>
                                        </Field>
                                    </div>
                                    
                                    <span
                                        className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                                        data-toggle="#your-password"
                                        onClick={passwordEyeOnclickHandler}
                                    />
                                </div>
                                <ErrorMessage name="password" component="span" className="text-danger" />
                            </div>
                            
                            <div className="" hidden>
                                <div className="d-flex justify-content-between gap-2">
                                    <div className="form-check style-check d-flex align-items-center">
                                    
                                        <input
                                            className="form-check-input border border-neutral-300"
                                            type="checkbox"
                                            defaultValue=""
                                            id="remeber"
                                        />
                                        <label className="form-check-label" htmlFor="remeber">
                                            Remember me{" "}
                                        </label>
                                    </div>
                                    <Link to="#" className="text-primary-600 fw-medium">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                            <button 
                                ref={submitButtonRef}
                                type="submit"
                                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                            >
                                {" "}
                                Giriş {useSpinnerHtml}
                            </button>
                            
                       </Form>

                    </Formik>

                </div>
            </div>
        </section>

    )
}

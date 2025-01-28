import { useAuth } from "../hooks/useAuth"
import { SignInLayer } from "../components/signInComponents/signInLayer";

export const SignPage = ():JSX.Element =>{
    const useResult = useAuth();
    return (
        <>
            <SignInLayer></SignInLayer>
        </>
    )
}
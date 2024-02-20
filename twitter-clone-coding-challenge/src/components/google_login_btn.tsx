import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Button = styled.span`
    margin-top: 10px;
    background-color: white;
    font-weight: 500;
    width: 100%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Logo = styled.img`
    height: 25px;
`;


export default function GoogleLoginButton(){
    const navigator = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigator("/");
        } catch (error) {
            console.log(error)
        }
        
    }
    return <Button onClick={onClick}>
        <Logo src="/google-logo.svg" />
        구글로 계속하기...
    </Button>
}
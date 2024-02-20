import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubLoginButton from "../components/github_login_btn";
import GoogleLoginButton from "../components/google_login_btn";
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth_components";



export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;
        if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        setError("");
        if(isLoading || email === "" || password === "" ) return;
        try {
            setLoading(true);
            navigate("/"); 
        } catch (e) {
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return <Wrapper>
        <Title>Submit into X</Title>
        <Form onSubmit={onSubmit}>
            <Input 
                onChange={onChange}
                name="email" 
                value={email} 
                placeholder="Email" 
                type="text" 
                required
            />
            <Input 
                onChange={onChange}
                name="password" 
                value={password} 
                placeholder="Password" 
                type="password" 
                required
            />
            <Input 
                type="submit" 
                value={isLoading ? "Loading . . ." : "Create Account" }
            />
        </Form>
        {error !== "" ? <Error>{error}</Error>: null}
        <Switcher>
            계정이 없으신가요?
            <Link to="/create_account">
                계정 생성하러가기 &rarr;
            </Link>
        </Switcher>

        <GithubLoginButton />
        <GoogleLoginButton />
    </Wrapper>;
}
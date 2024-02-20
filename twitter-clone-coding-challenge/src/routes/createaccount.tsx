import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubLoginButton from "../components/github_login_btn";
import GoogleLoginButton from "../components/google_login_btn";
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth_components";



export default function CreateAccount(){

    
    const navigate = useNavigate();

    // 이 밑의 const 여러개를 하나로 바꾸는 방법이 있다고 함 - react master 강의.
    // 이 밑의 const 여러개는 같은 작동을 해서 같은 변수값을 돌려쓰는 방법으로 리펙토링 하면 될거같은데 나중에 해야될 것 같음.
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;
        if(name === "name"){
            setName(value)
        }else if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || name === "" || email === "" || password === "" ) return;
        try {
            setLoading(true);
            const credentials =  await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            ); 
            console.log(credentials.user); 
            await updateProfile(credentials.user, {
                displayName: name
            });
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
                name="name" 
                value={name} 
                placeholder="Name" 
                type="text" 
                required
            />
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
                value={isLoading ? "Loading . . ." : "Log in" }
            />
        </Form>
        {error !== "" ? <Error>{error}</Error>: null}
        <Switcher>
            이미 계정이 있으신가요? 
            <Link to="/login">
                로그인 하러가기 &rarr;
            </Link>
        </Switcher>

        <GithubLoginButton />
        <GoogleLoginButton />
    </Wrapper>;
}
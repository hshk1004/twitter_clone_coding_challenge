import styled from "styled-components";
import { auth } from "../firebase";
import PostTweetForm from "../components/tweet_posting-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
`;

export default function Home(){
    const logout = () => {
        auth.signOut();
    };
    return (
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    );
}
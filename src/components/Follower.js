import React from 'react';
import styled from 'styled-components';

const FollowerList = styled.div`
    width: 10vw;
    margin-top: 20px;
`;

const Title = styled.div`
    font-size: 0.9rem;
    padding: 0 0 16px 8px;
`;

const Followers = styled.div`
    width: 90%;
    height: 64px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: #eee;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 200;
    box-sizing: border-box;
    padding: 0 0.5em;
    overflow: hidden;
    div {
        max-width: 50%;
    }
`;

const Profile = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${props => props.url || "url('')"} no-repeat;
    background-size: cover;
    margin: 0 8px;
`;

function Follower() {
    return ( 
        <FollowerList>
            <Title>Follower</Title>
            <Followers>
                <Profile url={"url('https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')"} />
                <div>follower</div>
            </Followers>
        </FollowerList>
     );
}

export default Follower;
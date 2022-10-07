import React from 'react';
import styled from 'styled-components';
import SideNav from '../components/SideNav';
import Card from '../components/Card';
import Follower from '../components/Follower';
import Message from '../components/Message';
import { useState } from 'react';

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1440px) {
        width: 100vw;
    }
`;

const NewsFeed = styled.div`
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1280px) {
        width: 80vw;
    }
    @media screen and (max-width: 960px) {
        width: 100vw;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    width: 10%;
    background: #fff;
    padding: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0A174E;
    color: #0A174E;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
        background: #0A174E;
        color: #fff;
    }
    &:active {
        background: #0A174E;
        color: #fff;
    }
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
        padding: 0.4em 3em;
    }
`;


const Main = (props: {windowWidth: number}) => {

    const { windowWidth } = props;

    const [addPost, setAddPost] = useState(false);

    const handlePost = () => {
        setAddPost(!addPost);
    }

    return ( 
        <Container>
            {/* aside navigation bar */}
            {
                windowWidth > 960 && // 960px 이하 모바일 메뉴로 변경
                <SideNav />
            }
            {/* news feed */}
            <NewsFeed>
                <ButtonWrapper>
                    <Button onClick={handlePost}>
                        {
                            addPost === false ? 'New Post' : '← back'
                        }
                    </Button>
                </ButtonWrapper>
                {
                    addPost === false
                    ? <Card />
                    : <Message windowWidth={windowWidth} />
                }
            </NewsFeed>
            {/* Follower Lists */}
            {
                windowWidth > 1280 && // 1280px 이하 일 때 none
                <Follower />
            }
        </Container>
     );
}

export default Main;
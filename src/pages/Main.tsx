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
    border: none;
    background: #6200EE;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
        background: #3700B3;
        color: #fff;
    }
    &:active {
        background: #3700B3;
        color: #fff;
    }
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
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
                            addPost === false ? '글 쓰기' : '← 뒤로 가기'
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
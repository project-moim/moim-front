import React, { useState } from 'react';
import styled from 'styled-components';
import SideNav from '../components/SideNav';
import Card from '../components/Card';
import { useDaumPostcodePopup } from 'react-daum-postcode';

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
    @media screen and (max-width: 1280px) {
        width: 80vw;
    }
    @media screen and (max-width: 960px) {
        width: 100vw;
    }
`;

const Form = styled.form`
    width: 80%;
    margin: 40px auto;
`;

const Input = styled.input`
    width: 90%;
    box-sizing: border-box;
    padding: 0.5em;
    margin-right: 8px;
    border: 1px solid #ddd;
`;

const Upload = styled.label`
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 20px;
    border: 1px solid #0A174E;
    color: #0A174E;
    margin-right: 10px;
    &:hover {
        background: #0A174E;
        color: #fff;
    }
    cursor: pointer;
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
        padding: 0.2em 1em;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 8px 0;
`;

const InputFile = styled(Input)`
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
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
    border-radius: 20px;
    margin-right: 20px;
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
        padding: 0.2em 3em;
    }
`;

const SubmitBtn = styled(Button)`
    border: none;
    border-radius: 8px;
    background: #0A174E;
    color: #fff;
    padding: 0.5em 4em;
    font-weight: 700;
    &:hover {
        background: #F5D042;
        color: #0A174E;
    }
    &:active {
        background: #F5D042;
        color: #0A174E;
    }
`;

const FollowerList = styled.div`
    width: 10vw;
    margin-top: 20px;
`;

const Title = styled.div`
    font-size: 0.9rem;
    padding: 0 0 16px 8px;
`;

const Follower = styled.div`
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

function Main({ windowWidth }) {

    // daum postcode script url
    const open = useDaumPostcodePopup('http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const [message, setMessage] = useState('');

    const searchLocation = (data) => { // 주소 검색 daum postcode
        
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log(fullAddress);
    };

    const handleLocation = () => { // Location 검색 팝업
        open({ onComplete: searchLocation });
    };

    const onChange = (e) => {
        const { target: {value} } = e;
        setMessage(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message);
        setMessage('');
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
                <Form onSubmit={handleSubmit}>
                    <Input type='text' name='message' value={message} maxLength={140} onChange={onChange} />
                    <ButtonWrapper>
                        <Upload>
                            + File
                            <InputFile type='file' accept='image/*' />
                        </Upload>
                        <Button type='button' onClick={handleLocation}>Location</Button>
                        <SubmitBtn>Submit</SubmitBtn>
                    </ButtonWrapper>
                </Form>
                <Card />
            </NewsFeed>
            {/* Follower Lists */}
            {
                windowWidth > 1280 && // 1280px 이하 일 때 none
                <FollowerList>
                    <Title>Follower</Title>
                    <Follower>
                        <Profile url={"url('https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')"} />
                        <div>follower</div>
                    </Follower>
                </FollowerList>
            }
        </Container>
     );
}

export default Main;
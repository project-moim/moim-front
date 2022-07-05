import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import SideNav from '../components/SideNav';
import Postcode from 'react-daum-postcode';

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1440px) {
        width: 100vw;
    }
`;

const Section = styled.section`
    width: 80vw;
    @media screen and (max-width: 960px) {
        width: 90%;
        margin: 0 auto;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin: 80px 0 40px 0;
`;

const Form = styled.form`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    padding: 0.5rem;
    width: 50%;
    margin-bottom: 16px;
    @media screen and (max-width: 960px) {
        width: 70%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

const PostcodeWrapper = styled.div`
    width: 50%;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #eee;
    margin-bottom: 20px;
`;

const Upload = styled.label`
    width: 160px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 20px;
    border: 1px solid #0A174E;
    color: #0A174E;
    cursor: pointer;
    &:hover {
        background: #0A174E;
        color: #fff;
    }
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
    }
`;

const InputFile = styled(Input)`
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`;

const Button = styled.button`
    width: 10%;
    background: #fff;
    width: 120px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0A174E;
    color: #0A174E;
    border-radius: 20px;
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
    }
`;

const SubmitBtn = styled(Button)`
    border: none;
    border-radius: 8px;
    background: #0A174E;
    color: #fff;
    &:hover {
        background: #F5D042;
        color: #0A174E;
    }
    &:active {
        background: #F5D042;
        color: #0A174E;
    }
`;

function SignUp({ windowWidth }) {

    const [userInfo, setUserInfo] = useState({});

    const [address, setAddress] = useState('');
    const [visible, setVisible] = useState(false); // 주소 입력창 상태

    const handleUserInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name] : value
        })
    }

    const handlePostcode = (data) => { // 주소 입력시 실행되는 함수
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

        // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setAddress(fullAddress);
        setVisible(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(userInfo);
    }

    return ( 
        <Container>
            {
                windowWidth > 960 && // 960px 이하 모바일 메뉴로 변경
                <SideNav />
            }
            <Section>
                <Title>회원가입</Title>
                <Form onSubmit={onSubmit}>
                    <Input type='text' placeholder='이메일' name='email' defaultValue={userInfo.email} onChange={handleUserInfo} />
                    <Input type='text' placeholder='비밀번호' name='password' defaultValue={userInfo.password} onChange={handleUserInfo} />
                    <Input type='text' placeholder='비밀번호 확인' name='passwordComfirm' />
                    <Input type='text' placeholder='주소' name='address' defaultValue={address} onClick={() => setVisible(true)} readOnly />
                    {
                        visible &&
                        <PostcodeWrapper>
                            <Postcode onComplete={handlePostcode} />
                        </PostcodeWrapper>
                    }
                    <Upload>
                        + 프로필 이미지
                        <InputFile type='file' accept='image/*' />
                    </Upload>
                    <ButtonWrapper>
                        <SubmitBtn>가 입</SubmitBtn>
                    </ButtonWrapper>
                </Form>
            </Section>
        </Container>
     );
}

export default SignUp;
import axios from 'axios';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/userSlice';

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1440px) {
        width: 100vw;
    }
`;

const Section = styled.section`
    width: 90%;
    margin: 0 auto;
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
    margin-top: 80px;
`;

const Input = styled.input`
    padding: 0.5rem;
    width: 40%;
    margin-bottom: 16px;
    border: none;
    border-bottom: 1.5px solid #0A174E;
    @media screen and (max-width: 960px) {
        width: 70%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`;

const Button = styled.button`
    width: 10%;
    width: 120px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 8px;
    background: #0A174E;
    color: #fff;
    cursor: pointer;
    &:hover {
        background: #112581;
    }
    &:active {
        background: #112581;
    }
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
    }
`;


const Login = () => {

    const url = `${process.env.REACT_APP_API_URL}/api/login`;

    const dispatch = useDispatch();

    const [loginValue, setLoginValue] = useState({ email: '', password: '' });

    const handleLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginValue({
            ...loginValue,
            [name] : value
        })
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        // console.log(loginValue);
        axios.post(url, loginValue)
        .then(res => {
            console.log(res);
            dispatch(login({
                id: loginValue.email,
                token: res.headers.authorization
            }));
        }).catch(err => console.log(err));
        setLoginValue(null);
    }

    return ( 
        <Container>
            <Section>
                <Title>로그인</Title>
                <Form onSubmit={onSubmit}>
                    <Input type='text' placeholder='이메일' name='email' defaultValue={loginValue.email} onChange={handleLoginValue} />
                    <Input type='password' placeholder='비밀번호' name='password' defaultValue={loginValue.password} onChange={handleLoginValue} />
                    <ButtonWrapper>
                        <Button>로그인</Button>
                    </ButtonWrapper>
                    {/* <ButtonWrapper>
                        <Button>구글 로그인</Button>
                        <Button>카카오 로그인</Button>
                    </ButtonWrapper> */}
                </Form>
            </Section>
        </Container>
     );
}

export default Login;
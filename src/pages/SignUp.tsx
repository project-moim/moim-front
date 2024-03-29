import React, { useCallback } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Postcode from 'react-daum-postcode';
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { signup } from 'src/hooks/queries/user';
import { useNavigate } from 'react-router';

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
`;

const Input = styled.input`
    padding: 0.5rem;
    width: 50%;
    margin: 12px 0;
    border: none;
    border-bottom: 1.5px solid #444;
    &:focus {
        outline: none;
    }
    @media screen and (max-width: 960px) {
        width: 70%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

const ErrorMessage = styled.div`
    font-size: 0.8rem;
    color: #888;
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
    border-radius: 10px;
    border: 2px solid #03DAC6;
    color: #018786;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        border: none;
        background: #018786;
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
    margin: 48px 0;
`;

const Button = styled.button`
    width: 10%;
    background: #fff;
    width: 120px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #6200EE;
    color: #6200EE;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        background: #6200EE;
        color: #fff;
    }
    &:active {
        background: #6200EE;
        color: #fff;
    }
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
    }
`;

const SubmitBtn = styled(Button)`
    border: none;
    border-radius: 8px;
    background: #6200EE;
    font-weight: 700;
    color: #fff;
    &:hover {
        background: #3700B3;
    }
    &:active {
        background: #3700B3;
    }
`;

const SignUp = () => {

    const navigate = useNavigate();

    const { mutate: postUser } = useMutation(signup, {
        onSuccess: res => {
            alert(res.data);
            navigate('/');
        }
    });

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onBlur' });

    const [address, setAddress] = useState('');
    const [visible, setVisible] = useState(false); // 주소 입력창 상태

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
        setValue('address', fullAddress);
        setAddress(fullAddress);
        setVisible(false);
    }

    const onSubmit = (data) => {
        // console.log({ email: data.email, password: data.password, address: address});
        try {
            postUser({
                email: data.email,
                password: data.password,
                name: data.username,
                address: data.address
            });
            // isSuccess === true && alert('회원가입이 완료되었습니다.');
        } catch(e) {
            console.log(e);
        }
        // axios.post(url, {
        //     email: data.email,
        //     password: data.password,
        //     address: address
        // }).then(res => console.log(res))
        // .catch(err => console.log(err));
    }

    return ( 
        <Container>
            <Section>
                <Title>회원가입</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input type='text' placeholder='이메일' {...register('email', {
                        required: true,
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })} style={errors.email && { borderBottom:"1.5px solid #888" }} />
                    <ErrorMessage>
                        {errors.email?.type === 'required' && '이메일을 입력해주세요.'}
                        {errors.email?.type === 'pattern' && '올바른 이메일을 입력해주세요.'}
                    </ErrorMessage>
                    <Input type='password' placeholder='비밀번호' {...register('password', {
                        required: true
                    })} style={errors.password && { borderBottom:"1.5px solid #888" }} />
                    <ErrorMessage>
                        {errors.password?.type === 'required' && '비밀번호를 입력해주세요.'}
                    </ErrorMessage>
                    <Input type='password' placeholder='비밀번호 확인' {...register('passwordConfirm', {
                        required: true
                    })} style={errors.passwordConfirm && { borderBottom:"1.5px solid #888" }} />
                    <ErrorMessage>
                        {
                            watch('password') !== '' && watch('passwordConfirm') !== '' && 
                            watch('password') !== watch('passwordConfirm') &&
                            '비밀번호가 일치하지 않습니다.'
                        }
                    </ErrorMessage>
                    <Input type='text' placeholder='닉네임' {...register('username')} />
                    <Input type='text' placeholder='주소' name='address' value={address || ''} {...register('address', {
                        required: true
                    })} onClick={() => setVisible(true)} readOnly />
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
import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
    width: 960px;
    margin: 0 auto;
`;

const Title = styled.h3`
    text-align: center;
    margin-top: 40px;
`;

const ContentWrapper = styled.div`
    width: 90%;
    margin: 10px auto;
    padding: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    background: #6200EE;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    &:hover {
        background: #3700B3;
    }
`;

const MyPage = () => {
    return (
        <Container>
            <Title>내 정보</Title>
            <ContentWrapper></ContentWrapper>
            <Title>나의 모임</Title>
            <ContentWrapper></ContentWrapper>
            <Title>팔로잉 / 팔로워</Title>
            <ContentWrapper></ContentWrapper>
        </Container>
    )
}

export default MyPage;

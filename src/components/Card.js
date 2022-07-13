import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    min-height: 240px;
    border-bottom: 1px solid #eee;
`;

const Author = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

const Profile = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #eee;
    background: ${props => props.url || "url('')"} no-repeat;
    background-size: cover;
    margin: 0 8px;
`;

const Icon = styled.div`
    padding: 0.5rem;
    border: 1px solid #eee;
    border-radius: 30px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
    position: absolute;
    right: 60px;
`

const LikeIcon = styled(Icon)`
    right: 20px;
`

const Image = styled.div`
    width: 80%;
    height: ${props => props.url ? '100px' : '0'};
    background-image: ${props => props.url || ''};
    background-repeat: no-repeat;
    background-size: contain;
    margin: ${props => props.url ? '10px 0' : '0'};
`;

const Text = styled.div`
    width: 100%;
    padding: 1em;
    color: #444;
    p {
        margin: 10px 0;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    padding: 0.5em;
    font-size: 0.8rem;
    color: #999;
`;

const Tag = styled.div`
    display: inline-block;
    margin-right: 5px;
    font-size: 1rem;
`;

const Attachment = styled.div``;

const Location = styled.div``;

function Card() {
    return ( 
        <CardContainer>
            <Author>
                <Profile url={"url('https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')"} />
                <p>author</p>
                <Icon>+ Follow</Icon>
                <LikeIcon>♡</LikeIcon>
            </Author>
            <Image />
            <Text>
                <p>
                    국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며, 
                    국회의 의결은 재적의원 3분의 2 이상의 찬성을 얻어야 한다. 
                    비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 
                    경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 
                    경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 
                    그러하지 아니하다.
                    국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 
                    이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 
                    요구할 수 있다.
                </p>
                <ContentWrapper>
                    <Tag>#Tag1</Tag>
                    <Tag>#Tag2</Tag>
                    <Tag>#Tag3</Tag>
                </ContentWrapper>
                <ContentWrapper>
                    2022년 07월 20일
                </ContentWrapper>
            </Text>
            <Attachment>
                <Location></Location>
            </Attachment>
        </CardContainer>
     );
}

export default Card;
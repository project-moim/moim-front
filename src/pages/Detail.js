import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import Follower from '../components/Follower';
import SideNav from '../components/SideNav';

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;
    @media screen and (max-width: 1440px) {
        width: 100vw;
    }
`;

const Card = styled.div`
    width: 60%;
    margin: 40px auto;
    min-height: 240px;
    /* border-bottom: 1px solid #eee; */
`;

const Author = styled.div`
    /* width: 100%; */
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
`;

const Images = styled.div`
    width: 80%;
    margin: 10px auto;
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
    /* width: 100%; */
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

const CommentWrapper = styled.div`
    margin-top: 40px;
`;

const Form = styled.form`
    width: 90%;
    margin: 20px auto;
`;

const Textarea = styled.textarea`
    border: none;
    width: 80%;
    border-bottom: 1px solid rgba(10, 23, 78, 0.2);
    padding: 0.5rem;
    margin: 0 8px;
    resize: none;
    @media screen and (max-width: 1440px) {
        width: 70%;
    }
`;

const Button = styled.button`
    width: 10%;
    background: #fff;
    padding: 0.4rem;
    border: 1px solid #0A174E;
    color: #0A174E;
    border-radius: 10px;
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
        width: 80px;
    }
`;

const List = styled.div`
    width: 100%;
`;

const Comment = styled.div`
    width: 100%;
    font-weight: 300;
    display: flex;
    align-items: center;
    margin: 4px 0;
`;

const CommentArea = styled(Textarea)`
    border-bottom: none;
    &:focus {
        outline: none;
    }
`;

const Content = styled(ContentWrapper)`
    margin: 8px 16px;
    color: #444;
    font-size: 0.9rem;
`;

const CommentBtn = styled.span`
    font-size: 0.8rem;
    font-weight: 700;
    margin: 0 4px;
    color: #999;
    cursor: pointer;
`;

function Detail({ windowWidth }) {

    const [comment, setComment] = useState('');

    const onChange = (e) => {
        const { target: {value} } = e;
        setComment(value)
    }

    const onCheckEnter = (e) => {
        if(e.keyCode === 13) {
            addComment(e);
        }
    }

    const addComment = (e) => {
        e.preventDefault();
        console.log(comment);
        setComment('');
    }

    return ( 
        <Container>
            {
                windowWidth > 960 && // 960px 이하 모바일 메뉴로 변경
                <SideNav />
            }
            <Card>
                <Author>
                    <Profile url={"url('https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')"} />
                    <p>author</p>
                    <Icon>+ Follow</Icon>
                    <LikeIcon>♡</LikeIcon>
                </Author>
                <Images>
                    <Carousel />
                </Images>
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
                <CommentWrapper>
                    <Form onKeyUp={onCheckEnter} onSubmit={addComment}>
                        <Textarea type='text' rows='1' value={comment} onChange={onChange} />
                        <Button>Comment</Button>
                    </Form>
                    <List>
                        <Comment>
                            <Author>
                                <Profile url={"url('https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')"} />
                                <p>author</p>
                            </Author>
                            <CommentArea type='text' value='국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며' readOnly />
                            <Content>2022.07.31</Content>
                            <CommentBtn>↩</CommentBtn>
                            <CommentBtn>x</CommentBtn>
                        </Comment>
                        <Comment>
                            <Author>
                                <Profile url={"url('https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')"} />
                                <p>author</p>
                            </Author>
                            <CommentArea type='text' value='국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.' readOnly />
                            <Content>2022.07.31</Content>
                            <CommentBtn>↩</CommentBtn>
                            <CommentBtn>x</CommentBtn>
                        </Comment>
                    </List>
                </CommentWrapper>
            </Card>
            {
                windowWidth > 1280 && // 1280px 이하 일 때 none
                <Follower />
            }
        </Container>
     );
}

export default Detail;
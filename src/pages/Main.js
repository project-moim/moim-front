import React, { useState } from 'react';
import styled from 'styled-components';
import SideNav from '../components/SideNav';
import Card from '../components/Card';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Map from '../components/Map';
import Follower from '../components/Follower';

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

const Form = styled.form`
    width: 70%;
    margin: 40px 0;
`;

const Textarea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    padding: 0.5em;
    margin-right: 8px;
    border: 1px solid #ddd;
    resize: none;
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
        padding: 0.4em 1em;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 8px 0;
`;

const InputFile = styled.input`
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
        padding: 0.4em 3em;
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

const Preview = styled.div`
    width: 70%;
    margin: 0 atuo;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

const Thumbnail = styled.img`
    width: 120px;
    height: 120px;
    margin-right: 10px;
    object-fit: cover;
    &:hover {
        border: 1px dashed #0A174E;
    }
    @media screen and (max-width: 768px) {
        width: 120px;
        margin-right: 0;
        margin: 8px;
    }
`;

function Main({ windowWidth }) {

    // daum postcode script url
    const open = useDaumPostcodePopup('http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const [currentPosition, setCurrentPosition] = useState(''); // 현재 위치
    const [message, setMessage] = useState('');
    const [file, setFile]= useState([]);

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

        // console.log(fullAddress);
        setCurrentPosition(fullAddress);
    };

    const handleLocation = () => { // Location 검색 팝업
        open({ onComplete: searchLocation });
    };

    const onChange = (e) => {
        const { target: {value} } = e;
        setMessage(value);
    }

    const handleAddFile = (e) => { // 이미지 파일 추가
        const fileList = e.target.files;

        if(file.length < 4) { // 최대 4개까지 첨부 가능
            for(let i = 0; i < fileList.length; i++) {
                if(i < 4 - file.length) {
                    const url = URL.createObjectURL(fileList[i]);
                    setFile(prev => [...prev, url]);
                }
            }
        }
    }

    const handleRemoveFile = (img) => { // 첨부한 이미지 삭제
        setFile(file.filter(url => url !== img))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            content: message,
            media: file,
            location: currentPosition
        });
        setMessage('');
        setFile([]);
        setCurrentPosition('');
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
                    <Textarea name='message' value={message} maxLength={140} onChange={onChange} />
                    <ButtonWrapper>
                        <Upload>
                            File
                            <InputFile type='file' multiple accept='image/*' onChange={(e) => handleAddFile(e)} />
                        </Upload>
                        <Button type='button' onClick={handleLocation}>Location</Button>
                        <SubmitBtn>Submit</SubmitBtn>
                    </ButtonWrapper>
                </Form>
                <Preview>
                    {
                        file.length > 0 &&
                        file.map((img, i) => (
                            <Thumbnail key={i} src={img} alt='attachment file' onClick={() => handleRemoveFile(img)} />
                        ))
                    }
                    {
                        currentPosition !== '' && <Map currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} />
                    }
                </Preview>
                <Card />
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
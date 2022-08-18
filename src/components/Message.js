import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';
import Map from './Map';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const InputWrapper = styled.div`
    width: 50%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
`;

const Upload = styled.label`
    padding: 0.5rem 2rem;
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
    justify-content: center;
    margin: 10px 0;
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
    padding: 0.5rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0A174E;
    color: #0A174E;
    border-radius: 20px;
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

const Input = styled.input`
    padding: 0.5rem;
    border-radius: 20px;
    border: 1px solid #0A174E;
    text-align: center;
    margin: 8px 0;
`;

const InputTime = styled.input`
    padding: 0.5rem;
    border-radius: 20px;
    border: 1px solid #0A174E;
    text-align: center;
    margin: 8px 0;
`;

const DatePickerCustom = styled.div`
    .react-datepicker-wrapper {
        padding: 0.5rem;
        border-radius: 20px;
        border: 1px solid #0A174E;
        text-align: center;
        margin: 8px 0;
        input {
            border: none;
            text-align: center;
            &:focus {
                outline: none;
            }
        }
    }
`;

const Select = styled.select`
    border-radius: 20px;
    border: 1px solid #0A174E;
    padding: 0.5rem;
    text-align: center;
    margin: 8px 0;
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

const ErrorMessage = styled.p`
    font-size: 0.9rem;
    color: #888;
`;

function Message({ windowWidth }) {

    // daum postcode script url
    const open = useDaumPostcodePopup('http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    // const countRegex = /[^0-9]g/;

    const date = new Date();
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    // console.log(`${hours}:${minutes}`);

    const [startDate, setStartDate] = useState(new Date());
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    const [currentPosition, setCurrentPosition] = useState(''); // 현재 위치
    const [message, setMessage] = useState('');
    const [file, setFile]= useState([]);
    const [gathering, setGathering] = useState({
        address2: '',
        headcount: '',
        time: '',
        accept: 'T'
    });
    const [error, setError] = useState('');

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

    const gatheringOption = (e) => {
        const { name, value } = e.target;
        setGathering({
            ...gathering,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Number(gathering.time.substring(3, 5)));

        if(message.length > 0 || file.length > 0) {
            if(currentPosition === '') {
                console.log({
                    content: message,
                    url: file
                });
            } else {
                gathering.headcount === '' && setError('모임 양식을 정확하게 입력해주세요.');

                if(Number(gathering.time.substring(0, 2)) < Number(hours)) {
                    setError('모임 양식을 정확하게 입력해주세요.');
                } else if(Number(gathering.time.substring(0, 2)) === Number(hours)) {
                    (Number(gathering.time.substring(3, 5)) <= Number(minutes)) &&
                    setError('모임 양식을 정확하게 입력해주세요.');
                }
                // console.log({
                //     content: message,
                //     url: file,
                //     address1: currentPosition,
                //     address2: gathering.address2,
                //     headcount: gathering.headcount,
                //     time:  gathering.time,
                //     accept: gathering.accept
                // }); 
            }
            setMessage('');
            setFile([]);
            setCurrentPosition('');
        } else {
            setError('내용을 입력해주세요.')
        }
    }

    return ( 
        <>
        <Form onSubmit={handleSubmit}>
            <Textarea name='message' value={message} maxLength={140} onChange={onChange} />
            <ButtonWrapper>
                <Upload>
                    File
                    <InputFile type='file' multiple accept='image/*' onChange={(e) => handleAddFile(e)} />
                </Upload>
                <Button type='button' onClick={handleLocation}>Location</Button>
            </ButtonWrapper>
            <InputWrapper>
                <Input type='text' placeholder='상세주소' name='address2' onChange={gatheringOption} />
                <Input type='number' min={2} max={100} placeholder='모임인원' name='count' onChange={gatheringOption} />
                <DatePickerCustom>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        filterTime={filterPassedTime}
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm aa"
                    />
                </DatePickerCustom>
                {/* <InputTime type='time' name='time' onChange={gatheringOption} /> */}
                <Select name='accept' onChange={gatheringOption}>
                    {/* <option selected disabled>참가 제한</option> */}
                    <option value='T'>누구나 모임</option>
                    <option value='F'>확인 후 모임</option>
                </Select>
            </InputWrapper>
            <ButtonWrapper>
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
        {
            <ErrorMessage>{error}</ErrorMessage>
        }
        </>
     );
}

export default Message;
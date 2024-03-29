import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';
import Map from './Map';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const Form = styled.form`
    width: 70%;
    margin: 40px 0;
`;

const Textarea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #444;
    border-radius: 5px;
    resize: none;
`;

const InputWrapper = styled.div`
    width: 50%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
`;

const Upload = styled.label`
    padding: 0.4rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 10px;
    background: #fff;
    border: 2px solid #03DAC6;
    color: #018786;
    margin-right: 10px;
    &:hover {
        border: 2px solid #018786;
        color: #fff;
        background: #018786;
    }
    cursor: pointer;
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
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
    background: #fff;
    border: 2px solid #03DAC6;
    color: #018786;
    padding: 0.4rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
        border: 2px solid #018786;
        color: #fff;
        background: #018786;
    }
    &:active {
        border: 2px solid #018786;
        color: #fff;
        background: #018786;
    }
    @media screen and (max-width: 1440px) {
        margin-right: 10px;
    }
`;

const Input = styled.input`
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #444;
    text-align: center;
    margin: 8px 0;
    &:focus {
        outline: none;
    }
`;

const DatePickerCustom = styled.div`
    .react-datepicker-wrapper {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #444;
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
    border-radius: 5px;
    border: 1px solid #444;
    padding: 0.5rem;
    text-align: center;
    margin: 8px 0;
`;

const SubmitBtn = styled(Button)`
    border: none;
    border-radius: 10px;
    background: #6200EE;
    color: #fff;
    padding: 0.5rem 4rem;
    font-weight: 700;
    margin-top: 30px;
    &:hover {
        border: none;
        background: #3700B3;
    }
    &:active {
        border: none;
        background: #3700B3;
    }
`;

const Preview = styled.div`
    width: 70%;
    margin: 0 atuo;
    margin-top: 40px;
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
        border: 1px dashed #018786;
    }
    @media screen and (max-width: 768px) {
        width: 120px;
        margin-right: 0;
        margin: 8px;
    }
`;

const ErrorMessage = styled.p`
    font-size: 0.8rem;
    color: #888;
    text-align: center;
`;

function Message({ windowWidth }) {

    const url = `${process.env.REACT_APP_API_URL}/api/post`;

    // daum postcode script url
    const open = useDaumPostcodePopup('http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const countRegex = /[^0-9]g/;

    const date = new Date();
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    // console.log(`${hours}:${minutes}`);

    const formData = new FormData();

    const [gatheringDate, setGatheringDate] = useState(new Date());
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

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
                    formData.append(`file${i}`, fileList[i]);
                }
            }
        }

        // for (let value of formData.values()) {
        //     console.log(value);
        // }
    }

    const handleRemoveFile = (img) => { // 첨부한 이미지 삭제
        setFile(file.filter(url => url !== img));
        window.URL.revokeObjectURL(img);
    }

    const onSubmit = (data) => {
        if(message.length > 0 || file.length > 0) {
            if(currentPosition === '') {
                // console.log({
                //     content: message,
                //     files: formData
                // });
                axios.post(url, {
                    cotent: message,
                    files: formData
                }).then(res => console.log(res))
                .catch(err => console.log(err));
            } else {
                // console.log({
                //     content: message,
                //     files: formData,
                //     address1: currentPosition,
                //     address2: data.address2,
                //     headcount: data.headcount,
                //     time:  gatheringDate,
                //     accept: data.accept
                // }); 
                axios.post(url, {
                    content: message,
                    files: formData,
                    address1: currentPosition,
                    address2: data.address2,
                    headcount: data.headcount,
                    time:  gatheringDate,
                    accept: data.accept
                }).then(res => console.log(res))
                .catch(err => console.log(err));
            }
            setMessage('');
            setFile([]);
            setCurrentPosition('');
        } else { window.alert('작성한 내용을 다시 확인해주세요.'); }
    }

    return ( 
        <>
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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Textarea name='message' value={message} maxLength={140} onChange={onChange} />
            <ButtonWrapper>
                <Upload>
                    + 파일
                    <InputFile type='file' multiple accept='image/*' onChange={(e) => handleAddFile(e)} />
                </Upload>
                <Button type='button' onClick={handleLocation}>+ 장소</Button>
            </ButtonWrapper>
            <InputWrapper>
                <Input type='text' placeholder='상세주소' {...register('address2', {
                    required: (currentPosition !== '' && watch('address2') === '') ? true : false
                })} />
                <ErrorMessage>
                    {errors.address2?.type === 'required' && '상세주소를 입력해주세요.'}
                </ErrorMessage>
                <Input type='number' placeholder='모임인원 (최소 2인 이상)' {...register('headcount', {
                    min: 2, max: 100
                })} />
                <DatePickerCustom>
                    <DatePicker
                        selected={gatheringDate}
                        onChange={(date) => setGatheringDate(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        filterTime={filterPassedTime}
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm aa"
                    />
                </DatePickerCustom>
                <Select name='accept' {...register('accept')}>
                    <option value='T'>누구나 모임</option>
                    <option value='F'>확인 후 모임</option>
                </Select>
            </InputWrapper>
            <ButtonWrapper>
                <SubmitBtn>글 쓰기</SubmitBtn>
            </ButtonWrapper>
        </Form>
        </>
     );
}

export default Message;
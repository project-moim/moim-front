import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div<{ position?: string }>`
    width: 120px;
    height: 120px;
    position: relative;
    display: ${(props: any) => props.position === '' ?  'none' : 'block'};
`;

const Button = styled.button`
    position: absolute;
    font-weight: 700;
    top: 4px;
    right: 4px;
    border: none;
    background: #F5D042;
    color: #fff;
    z-index: 2;
    &:hover {
        background: #0A174E;
    }
    &:active {
        background: #0A174E;
    }
`;

const { kakao }: any = window;

function Map({ currentPosition, setCurrentPosition }) {

    const getMap = () => {
        //지도를 담을 영역의 DOM 레퍼런스
        const container = document.getElementById('myMap');

        //지도를 생성할 때 필요한 기본 옵션
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
            level: 5 //지도의 레벨(확대, 축소 정도)
        };

        //지도 생성 및 객체 리턴
        const map = new kakao.maps.Map(container, options);
        return map;
    }

    const getAddress = (map, currentPosition) => {
        // 주소-좌표 변환 객체를 생성
        const geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        geocoder.addressSearch(`${currentPosition}`, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시
                // var infowindow = new kakao.maps.InfoWindow({
                //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${currentPosition}</div>`
                // });
                // infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동
                map.setCenter(coords);
            }
        });
    }

    const handleRemovePosition = () => { // 위치 정보 초기화
        setCurrentPosition('')
    }

    useEffect(() => {
        const map = getMap();

        getAddress(map, currentPosition);
    }, []);

    return ( 
        <MapContainer id='myMap' position={currentPosition}>
            <Button onClick={handleRemovePosition}>x</Button>
        </MapContainer>
     );
}

export default Map;
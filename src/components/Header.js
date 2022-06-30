import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MobileNav from './MobileNav';

const HeaderContainer = styled.header`
    width: 100%;
`;

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    @media screen and (max-width: 1440px) {
        width: 100vw;
    }
`;

const Nav = styled.nav`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    ul {
        display: flex;
        margin-right: 2em;
    }
    li {
        margin: 0 10px;
    }
`;

const Logo = styled.h1`
    width: 40px;
    height: 100%;
    margin-left: 2em;
    a {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    img {
        width: 100%;
        height: auto;
        margin-right: 8px;
    }
`;

function Header({ windowWidth }) {
    return ( 
        <HeaderContainer>
            <Container>
                <Nav>
                    <Logo>
                        <Link to='/'>
                            <img src='https://cdn.icon-icons.com/icons2/2972/PNG/512/instagram_logo_icon_186894.png' alt='logo' />
                            <div>MOIM</div>
                        </Link>
                    </Logo>
                    <ul>
                        <li>로그인</li>
                        <li>회원가입</li>
                    </ul>
                </Nav>
                {
                    windowWidth < 960 && // 960px 이하일 때 모바일 메뉴로 변경
                    <MobileNav />
                }
            </Container>
        </HeaderContainer>
     );
}

export default Header;
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
    /* border-bottom: 1px solid #eee; */
    ul {
        display: flex;
        margin-right: 2em;
        font-size: 0.9rem;
        font-weight: 500;
    }
    li {
        margin: 0 10px;
        > a {
            color: #555;
            &:hover {
                color: #888;
            }
        }
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
                            {/* <img src='https://cdn-icons-png.flaticon.com/512/2824/2824572.png' alt='logo' />s */}
                            <div>MOIM</div>
                        </Link>
                    </Logo>
                    <ul>
                        <li><Link to='/login'>로그인</Link></li>
                        <li><Link to='/signup'>회원가입</Link></li>
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
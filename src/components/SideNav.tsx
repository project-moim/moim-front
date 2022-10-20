import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { ReactComponent as LoginIcon } from "../assets/icon/sign-in-alt.svg";
import { ReactComponent as AppIcon } from "../assets/icon/apps.svg";
import { ReactComponent as UserIcon } from "../assets/icon/user-add.svg";

const SideNavigation = styled.div`
    width: 20vw;
`;

const Profile = styled.div`
    width: 90%;
    height: 60px;
    margin: 20px auto;
    border: 2px solid #3700B3;
    color: #444;
    border-radius: 10px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
`;

const Thumbnail = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    margin-right: 1em;
    overflow: hidden;
`;

const MenuList = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const Menu = styled.div`
    width: 100%;
    height: 48px;
    margin: 0 auto;
    margin-bottom: 10px;
    background: #3700B3;
    border-radius: 10px 10px 0 0;
    color: #fff;
    padding: 8px 24px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background: #6200EE;
        transform: translate(2px, -1px);
    }
`;

function SideNav() {

    const user = useSelector((state: RootState) => state.auth);

    return ( 
        <SideNavigation>
                {
                    user.token === null
                    ? <Link to='/login'>
                        <Menu style={{ width: "90%", background: "#03DAC6", borderRadius: "5px" }}>
                            <LoginIcon width="20px" height="20px" fill="#fff" style={{ marginRight: "16px" }} />
                            <p>로그인 하기</p>
                        </Menu>
                    </Link>
                    : <Link to={`/userinfo`}><Profile>
                        <Thumbnail>
                            <img src='https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' alt='user profile' />
                        </Thumbnail>
                        <p><strong>User</strong></p>
                    </Profile></Link>
                }
            <MenuList>
                <Menu>
                    <AppIcon fill="#fff" style={{ width: "20px", height: "20px", marginRight: "16px" }} />
                    <p>Home</p>
                </Menu>
                {
                    user.token !== null &&
                    <Menu>
                        <UserIcon fill="#fff" style={{ width: "20px", height: "20px", marginRight: "16px" }} />
                        <p>Following</p>
                    </Menu>
                }
            </MenuList>
        </SideNavigation>
     );
}

export default SideNav;
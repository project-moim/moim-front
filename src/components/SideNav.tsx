import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AppIcon } from "../assets/icon/apps.svg";
import { ReactComponent as UserIcon } from "../assets/icon/user-add.svg";

const SideNavigation = styled.div`
    width: 20vw;
`;

const Profile = styled.div`
    width: 90%;
    height: 100px;
    margin: 20px auto;
    background: #F5D042;
    color: #fff;
    border-radius: 30px;
    padding: 1em 2em;
    display: flex;
    align-items: center;
`;

const Thumbnail = styled.div`
    width: 64px;
    height: 64px;
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
    height: 52px;
    margin: 0 auto;
    margin-bottom: 10px;
    background: #0A174E;
    border-radius: 10px;
    color: #fff;
    padding: 0.5em 2em;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background: #112581;
    }
`;

function SideNav() {
    return ( 
        <SideNavigation>
            <Profile>
                <Thumbnail>
                    <img src='https://images.unsplash.com/photo-1542309667-2a115d1f54c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' alt='user profile' />
                </Thumbnail>
                <p>
                    <strong>User</strong><br/>
                    Hello!
                </p>
            </Profile>
            <MenuList>
                <Menu>
                    <AppIcon fill="#fff" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                    <p>Home</p>
                </Menu>
                <Menu>
                    <UserIcon fill="#fff" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                    <p>Following</p>
                </Menu>
            </MenuList>
        </SideNavigation>
     );
}

export default SideNav;
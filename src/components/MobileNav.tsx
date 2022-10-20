import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AppIcon } from "../assets/icon/apps.svg";
import { ReactComponent as UserIcon } from "../assets/icon/user-add.svg";
import { ReactComponent as LoginIcon } from "../assets/icon/sign-in-alt.svg";

const MobileNavigation = styled.nav`
    width: 100%;
    padding: 20px 0;
    border-top: 1px solid #ddd;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    ul {
        display: flex;
        justify-content: space-around;
    }
`;

function MobileNav() {
    return ( 
        <MobileNavigation>
            <ul>
                <li>
                    <AppIcon fill="#444" style={{ width: "20px", height: "20px", marginRight: "16px" }} />
                </li>
                <li>
                    <UserIcon fill="#444" style={{ width: "20px", height: "20px", marginRight: "16px" }} />
                </li>
                <li>
                    <AppIcon fill="#444" style={{ width: "20px", height: "20px", marginRight: "16px" }} />
                </li>
                <li>
                    <LoginIcon fill="#444" style={{ width: "20px", height: "20px", marginRight: "16px" }} />
                </li>
            </ul>
        </MobileNavigation>
     );
}

export default MobileNav;
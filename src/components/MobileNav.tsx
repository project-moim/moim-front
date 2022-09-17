import React from 'react';
import styled from 'styled-components';

const MobileNavigation = styled.nav`
    width: 100%;
    margin-top: 10px;
    ul {
        display: flex;
        justify-content: space-around;
    }
`;

const Icon = styled.div<{ url?: string }>`
    width: 24px;
    height: 24px;
    background: ${(props: any) => props.url || "url('../assets/images/icon/menu.png')"};
    background-repeat: no-repeat;
    background-size: cover;
`;

function MobileNav() {
    return ( 
        <MobileNavigation>
            <ul>
                <li>
                    <Icon url={"url('../assets/images/icon/user.png')"} />
                </li>
                <li>
                    <Icon />
                </li>
                <li>
                    <Icon  url={"url('../assets/images/icon/followers.png')"} />
                </li>
                <li>
                    <Icon  url={"url('../assets/images/icon/followers.png')"} />
                </li>
            </ul>
        </MobileNavigation>
     );
}

export default MobileNav;
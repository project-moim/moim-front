import React, { useMemo } from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UseResize from './hooks/useResize';
import SignUp from './pages/SignUp';
import Detail from './pages/Detail';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setCurrentUser } from './redux/authSlice';

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Noto Sans KR', sans-serif;
    /* font-size: 100%; */
    /* font: inherit; */
    vertical-align: baseline;
    box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
    display: block;
    }
    body {
        line-height: 1;
        color: #444;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        text-decoration: none;
        color: #444;
        font-family: 'Noto Sans KR', sans-serif;
    }
    img {
        width: 100%;
        height: auto;
    }
    textarea {
        font-family: 'Noto Sans KR', sans-serif;
        vertical-align: middle;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    // react-slick
    .slick-next:before, .slick-prev:before {
        color: #6200EE;
    }
    .slick-dots li.slick-active button:before {
        color: #6200EE;
    }
`;

function App() {

    const useAuth = () => {
        const currentUser = useSelector(setCurrentUser);
        return useMemo(() => ({ user: currentUser }), [currentUser]);
    }

    // user 정보가 없는 경우 로그인 화면으로 이동
    const RequireAuth = ({ children }) => {
       let { user } = useAuth();
       if(!user) {
        return <Navigate to='/login' replace={true} />
       }
       return children;
    }

    // 화면 사이즈 변경 감지
    const windowWidth: number = UseResize();

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Header windowWidth={windowWidth} />
                <Routes>
                    <Route path='/' element={<Main windowWidth={windowWidth} />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/post/*' element={<RequireAuth><Detail windowWidth={windowWidth} /></RequireAuth>} />
                    {/* <Route path='/post/*' element={<Detail windowWidth={windowWidth} />} /> */}
                    <Route path='/userinfo/*' element={<MyPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

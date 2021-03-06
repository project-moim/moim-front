import React from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UseResize from './hooks/useResize';
import SignUp from './pages/SignUp';
import Detail from './pages/Detail';

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
    // react-slick
    .slick-next:before, .slick-prev:before {
        color: #0A174E;
    }
    .slick-dots li.slick-active button:before {
        color: #0A174E;
    }
`;

function App() {

    // 화면 사이즈 변경 감지
    const windowWidth = UseResize();

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Header windowWidth={windowWidth} />
                <Routes>
                    <Route path='/' element={<Main windowWidth={windowWidth} />} />
                    <Route path='/signup' element={<SignUp windowWidth={windowWidth} />} />
                    <Route path='/detail' element={<Detail windowWidth={windowWidth} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

import React, { useEffect, useState } from 'react';

function UseResize() {

    const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);

    const handleResize = () => {
        let resizeWindow: any = null;
        clearTimeout(resizeWindow);
        resizeWindow = setTimeout(() => {
            setCurrentWidth(window.innerWidth);
            // console.log(currentWidth);
        }, 500);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [currentWidth])

    return currentWidth;
}

export default UseResize;
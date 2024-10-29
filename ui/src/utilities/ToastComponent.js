import React, {useState, useEffect} from 'react'
import { Toaster } from 'react-hot-toast'

function ToastComponent() {

    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => setIsMobile(window.innerWidth < 768);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);    
    }, []);


    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName="text-blue-500 md:text-white "
            containerStyle={{}}
            toastOptions={{
                duration: 5000,
                style: {
                    color: isMobile ? "black" : "white",
                    background: '#363636',
                    background: "rgba( 218, 218, 218, 0.1 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 1px )",
                    WebkitBackdropFilter: "blur( 1px )",
                    borderRadius: " 10px",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                },
                success: {
                    duration: 3000,
                    theme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                },
            }}
        />
    )
}

export default ToastComponent
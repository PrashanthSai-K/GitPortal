import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import React, { useRef, useState } from 'react'

function ConfirmPopupComponent({popUpMessage, buttonName, accept}) {

    const buttonRef = useRef(null);

    const [confirmVisible, setConfirmVisible] = useState(false);


    return (

        <div className=" flex justify-end w-full ">
            <ConfirmPopup visible={confirmVisible} onHide={() => setConfirmVisible(false)}
                accept={accept} reject={() => setConfirmVisible(false)}
                target={buttonRef.current}
                rejectClassName=" ml-5 rounded-lg px-6 py-1.5 overflow-hidden group bg-red-500 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                acceptClassName=" ml-5 rounded-lg px-6 py-1.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                message={popUpMessage} icon="pi pi-exclamation-triangle" />
            <Button ref={buttonRef}
                onClick={() => setConfirmVisible(true)} icon="pi pi-check"
                label={buttonName} type="button"
                className=" ml-5 rounded-lg px-6 py-1.5 overflow-hidden group bg-side-blue relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-side-blue text-white hover:ring-2 hover:ring-offset-2 hover:ring-side-blue transition-all ease-out duration-300"
            />
        </div>
    )
}

export default ConfirmPopupComponent

import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function SuccessToast() {

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
    }

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <Button label="Success" severity="success" onClick={showSuccess} />
        </div>
    )
}

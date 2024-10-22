
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function ErrorToast() {
    const toast = useRef(null);

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
    }
    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <Button label="Error" severity="danger" onClick={showError} />
        </div>
    )
}

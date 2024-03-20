import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCodeDisplay = () => {
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        axios.get('https://event-backend.isdemo.in/api/v1/qrcode')
            .then(response => {
                setQrCode(response.data.qrcode);
            })
            .catch(error => {
                console.error('There was an error fetching the QR code:', error);
            });
    }, []);

    return (
        <div>
            {qrCode ? <img src={qrCode} alt="QR Code" /> : <p>Loading QR code...</p>}
        </div>
    );
}

export default QRCodeDisplay;

import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = ({ onScan }) => {
    const [error, setError] = useState('');

    const handleScan = (data) => {
        if (data) {
            onScan(data.text);
        }
    };

    const handleError = (err) => {
        setError(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <div>
            <QrReader
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default QRScanner;

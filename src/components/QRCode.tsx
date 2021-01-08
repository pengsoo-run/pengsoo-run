import React from 'react';
import QR from 'qrcode.react';

interface QRCodeProps {
  url: string;
}

function QRCode({ url }: QRCodeProps) {
  return (
    <QR
      value={url}
      size={300}
      bgColor={'transparent'}
      fgColor='#ffffff'
      imageSettings={{
        src: 'lobby/peng-hi.png',
        width: 80,
        height: 80,
        excavate: true,
      }}
      level='Q'
      style={{ margin: '10px' }}
    />
  );
}

export default QRCode;

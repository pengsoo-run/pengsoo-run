import React from 'react';
import QR from 'qrcode.react';

interface QRCodeProps {
  url: string;
}

function QRCode({ url }: QRCodeProps) {
  console.log('✅   QRCode   url', url);
  return (
    <QR
      value={url}
      size={300}
      bgColor={'transparent'}
      fgColor='#FFFFFF'
      imageSettings={{
        src: 'welcome/peng-hi.png',
        width: 80,
        height: 80,
        excavate: true,
      }}
      level='Q'
      style={{ margin: '5px 10px' }}
    />
  );
}

export default QRCode;


import React from 'react';
import { Oficio } from '../types';
import { HospitalLogoIcon } from './icons/HospitalLogoIcon';

interface PrintableOficioProps {
  oficio: Oficio;
}

export const PrintableOficio: React.FC<PrintableOficioProps> = ({ oficio }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', options);
  };

  return (
    <div className="printable-oficio-container" style={{ margin: '2cm' }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2cm' }}>
        <HospitalLogoIcon className="w-12 h-12 text-blue-600" />
        <div className="oficio-no" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>OFICIO No. {oficio.oficioNo}</div>
      </div>

      <div className="date" style={{ textAlign: 'right', marginBottom: '1cm' }}>
        {formatDate(oficio.fechaEmision)}
      </div>

      <div className="recipient" style={{ marginBottom: '1cm' }}>
        <p style={{ margin: 0, lineHeight: '1.4' }}><strong>{oficio.destinatarioNombre}</strong></p>
        <p style={{ margin: 0, lineHeight: '1.4' }}>{oficio.destinatarioCargo}</p>
        <p style={{ margin: 0, lineHeight: '1.4' }}>{oficio.destinatarioOrganizacion}</p>
        <p style={{ margin: 0, lineHeight: '1.4', marginTop: '0.5cm' }}>P R E S E N T E</p>
      </div>

      <div className="subject" style={{ fontWeight: 'bold', marginBottom: '1cm' }}>
        ASUNTO: {oficio.asunto}
      </div>

      <div className="body-content" style={{ lineHeight: '1.6', textAlign: 'justify', marginBottom: '2cm', whiteSpace: 'pre-wrap' }}>
        {oficio.cuerpo}
      </div>

      <div className="footer" style={{ textAlign: 'center', marginTop: '3cm' }}>
        <p style={{ margin: 0, lineHeight: '1.4' }}>Atentamente,</p>
        <div className="firmante" style={{ fontWeight: 'bold', borderTop: '1px solid #000', display: 'inline-block', paddingTop: '5px', marginTop: '1cm' }}>
          {oficio.firmante}
        </div>
      </div>
    </div>
  );
};

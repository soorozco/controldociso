
import React, { useState } from 'react';
import { Oficio } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { OficioTable } from './OficioTable';
import { OficioModal } from './OficioModal';
import { getNextOficioNumber } from '../data/documents';

interface OficiosPageProps {
  oficios: Oficio[];
  onSaveOficio: (oficio: Oficio) => void;
}

export const OficiosPage: React.FC<OficiosPageProps> = ({ oficios, onSaveOficio }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOficio, setEditingOficio] = useState<Oficio | undefined>(undefined);

  const handleOpenModal = (oficio?: Oficio) => {
    setEditingOficio(oficio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOficio(undefined);
  };

  const handleSave = (oficio: Oficio) => {
    onSaveOficio(oficio);
    handleCloseModal();
  };

  const handleNewOficio = () => {
    const newOficioNumber = getNextOficioNumber(oficios);
    setEditingOficio({
      id: `of-${Date.now()}`,
      oficioNo: newOficioNumber,
      fechaEmision: new Date().toISOString().split('T')[0],
      destinatarioNombre: '',
      destinatarioCargo: '',
      destinatarioOrganizacion: '',
      asunto: '',
      cuerpo: '',
      firmante: '',
      estado: 'Borrador',
    });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Oficios</h1>
        <button 
          onClick={handleNewOficio}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">
          <PlusIcon className="w-5 h-5"/>
          Nuevo Oficio
        </button>
      </div>

      <OficioTable 
        oficios={oficios} 
        onEdit={handleOpenModal} 
      />
      
      {isModalOpen && (
        <OficioModal
          oficio={editingOficio}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

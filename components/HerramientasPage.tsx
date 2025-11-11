


import React, { useRef } from 'react';
import { Documento, Formato, AccionCorrectiva, Revision, IndicadorCategoria, DocumentoExterno, Auditoria, JsonImportData, Oficio } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { UploadIcon } from './icons/UploadIcon';

interface HerramientasPageProps {
  onImport: (data: JsonImportData) => void;
  documents: Documento[];
  formats: Formato[];
  acciones: AccionCorrectiva[];
  revisiones: Revision[];
  indicadores: IndicadorCategoria[];
  documentosExternos: DocumentoExterno[];
  auditorias: Auditoria[];
  oficios: Oficio[]; // Added oficios prop
}

export const HerramientasPage: React.FC<HerramientasPageProps> = ({
  onImport,
  documents,
  formats,
  acciones,
  revisiones,
  indicadores,
  documentosExternos,
  auditorias,
  oficios, // Destructure oficios
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportAll = () => {
    const data: JsonImportData = {
        documentos: documents,
        formatos: formats,
        accionesCorrectivas: acciones,
        revisiones: revisiones,
        documentosExternos: documentosExternos,
        auditorias: auditorias,
        indicadores: indicadores,
        oficios: oficios, // Include oficios in export
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sgc-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const text = e.target?.result;
              if (typeof text !== 'string') throw new Error("File could not be read");
              const data = JSON.parse(text);
              onImport(data);
          } catch (error) {
              console.error("Error parsing JSON file:", error);
              alert('Error al importar el archivo. Verifique el formato del JSON.');
          }
      };
      reader.readAsText(file);
      if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Herramientas de Datos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-3">Exportar Datos</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
            Crea un archivo de respaldo único en formato JSON con todos los datos del sistema (documentos, acciones, auditorías, indicadores, etc.). Este archivo puede ser utilizado para restaurar la información en el futuro.
          </p>
          <button 
            onClick={handleExportAll} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <DownloadIcon className="w-5 h-5" /> Exportar Todo (JSON)
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-3">Importar Datos</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
            Añade datos al sistema desde un archivo de respaldo JSON. Los datos importados se agregarán a los existentes; no se eliminará ninguna información actual. Asegúrese de que el archivo tiene el formato correcto generado por este sistema.
          </p>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
          <button 
            onClick={handleImportClick} 
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors dark:bg-green-700 dark:hover:bg-green-600"
          >
            <UploadIcon className="w-5 h-5" /> Importar desde JSON
          </button>
        </div>
      </div>
    </div>
  );
};
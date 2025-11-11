

import React, { useState } from 'react';
import { Documento, Formato, DocumentoExterno } from '../types';
import { Tabs } from './Tabs';
import { DocumentTable } from './DocumentTable';
import { FormatTable } from './FormatTable';
import { Dashboard } from './Dashboard';
import { CorrelationMatrix } from './CorrelationMatrix';
import { ChangeMatrix } from './ChangeMatrix';
import { NewDocumentModal } from './NewDocumentModal';
import { DocumentosExternosTable } from './DocumentosExternosTable';

interface GestorDocumentalPageProps {
  documents: Documento[];
  formats: Formato[];
  documentosExternos: DocumentoExterno[];
  onSaveDocument: (documento: Documento) => void;
  onSaveFormat: (formato: Formato) => void;
  onSaveDocumentoExterno: (documento: DocumentoExterno) => void;
}

export const GestorDocumentalPage: React.FC<GestorDocumentalPageProps> = ({
  documents,
  formats,
  documentosExternos,
  onSaveDocument,
  onSaveFormat,
  onSaveDocumentoExterno
}) => {
  const TABS = ['Dashboard', 'Documentos', 'Formatos', 'Documentos Externos', 'Matriz de Correlación', 'Matriz de Cambios'];
  const [activeTab, setActiveTab] = useState(TABS[1]);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);

  const allDocs = [...documents, ...formats];
  
  const handleSaveNewDocument = (doc: Documento) => {
    onSaveDocument(doc);
    setIsNewDocModalOpen(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Gestor Documental</h1>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} tabs={TABS} />
      <div className="mt-8">
        {activeTab === 'Dashboard' && <Dashboard documents={allDocs} />}
        {activeTab === 'Documentos' && <DocumentTable documents={documents} onSave={onSaveDocument} onNewDocument={() => setIsNewDocModalOpen(true)} />}
        {activeTab === 'Formatos' && <FormatTable formats={formats} onSave={onSaveFormat} documents={documents} allDocs={allDocs} />}
        {activeTab === 'Documentos Externos' && <DocumentosExternosTable documentos={documentosExternos} onSave={onSaveDocumentoExterno} />}
        {activeTab === 'Matriz de Correlación' && <CorrelationMatrix documents={documents} />}
        {activeTab === 'Matriz de Cambios' && <ChangeMatrix documents={documents} />}
      </div>

      {isNewDocModalOpen && (
        <NewDocumentModal 
          onClose={() => setIsNewDocModalOpen(false)}
          onSave={handleSaveNewDocument}
          areas={[...new Set(allDocs.map(d => d.area))]}
          docTypes={[...new Set(allDocs.map(d => d.tipoDocumento))]}
          allDocs={allDocs}
        />
      )}
    </div>
  );
};

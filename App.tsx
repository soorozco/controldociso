
import React, { useState } from 'react';
import { Documento, Formato, JsonImportData, AccionCorrectiva, Revision } from './types';
import { initialDocuments, initialFormats, initialAcciones, initialRevisiones } from './data/documents';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GestorDocumentalPage } from './components/GestorDocumentalPage';
import { AccionesCorrectivasPage } from './components/AccionesCorrectivasPage';
import { RevisionesPage } from './components/RevisionesPage';


const App: React.FC = () => {
    const [documents, setDocuments] = useState<Documento[]>(initialDocuments);
    const [formats, setFormats] = useState<Formato[]>(initialFormats);
    const [acciones, setAcciones] = useState<AccionCorrectiva[]>(initialAcciones);
    const [revisiones, setRevisiones] = useState<Revision[]>(initialRevisiones);
    
    const [currentPage, setCurrentPage] = useState('Gestor Documental');

    const handleImport = (data: JsonImportData) => {
        if (data.documentos) setDocuments(prev => [...prev, ...data.documentos!]);
        if (data.formatos) setFormats(prev => [...prev, ...data.formatos!]);
        if (data.accionesCorrectivas) setAcciones(prev => [...prev, ...data.accionesCorrectivas!]);
        if (data.revisiones) setRevisiones(prev => [...prev, ...data.revisiones!]);
        alert('Datos importados correctamente!');
    };

    const handleSaveDocument = (docToSave: Documento) => {
        setDocuments(docs => {
            const index = docs.findIndex(d => d.id === docToSave.id);
            if (index > -1) {
                const newDocs = [...docs];
                newDocs[index] = docToSave;
                return newDocs;
            }
            return [...docs, docToSave];
        });
    };

    const handleSaveFormat = (formatToSave: Formato) => {
        setFormats(fmts => {
            const index = fmts.findIndex(f => f.id === formatToSave.id);
            if (index > -1) {
                const newFmts = [...fmts];
                newFmts[index] = formatToSave;
                return newFmts;
            }
            return [...fmts, formatToSave];
        });
    };
    
    const handleSaveAccion = (accionToSave: AccionCorrectiva) => {
        setAcciones(accs => {
            const index = accs.findIndex(a => a.id === accionToSave.id);
            if (index > -1) {
                const newAccs = [...accs];
                newAccs[index] = accionToSave;
                return newAccs;
            }
            return [...accs, accionToSave];
        });
    };

    const handleSaveRevision = (revisionToSave: Revision) => {
        setRevisiones(revs => {
            const index = revs.findIndex(r => r.id === revisionToSave.id);
            if (index > -1) {
                const newRevs = [...revs];
                newRevs[index] = revisionToSave;
                return newRevs;
            }
            return [...revs, revisionToSave];
        });
    };
    
    const renderPage = () => {
        switch (currentPage) {
            case 'Gestor Documental':
                return <GestorDocumentalPage documents={documents} formats={formats} onSaveDocument={handleSaveDocument} onSaveFormat={handleSaveFormat} />;
            case 'Acciones Correctivas':
                return <AccionesCorrectivasPage acciones={acciones} onSave={handleSaveAccion} />;
            case 'Revisiones por la Dirección':
                return <RevisionesPage revisiones={revisiones} onSave={handleSaveRevision} />;
            default:
                return <GestorDocumentalPage documents={documents} formats={formats} onSaveDocument={handleSaveDocument} onSaveFormat={handleSaveFormat} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onImport={handleImport} documents={documents} formats={formats} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
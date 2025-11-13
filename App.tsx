

import React, { useState } from 'react';
import { Documento, Formato, JsonImportData, AccionCorrectiva, Revision, IndicadorCategoria, DocumentoExterno, Auditoria, HallazgoAuditoria, Oficio } from './types';
import { initialDocuments, initialFormats, initialAcciones, initialRevisiones, initialDocumentosExternos, initialOficios } from './data/documents';
import { initialIndicadores } from './data/indicadores';
import { initialAuditorias } from './data/audits';
import { TopNavBar } from './components/TopNavBar';
import { GestorDocumentalPage } from './components/GestorDocumentalPage';
import { AccionesCorrectivasPage } from './components/AccionesCorrectivasPage';
import { RevisionesPage } from './components/RevisionesPage';
import { IndicadoresPage } from './components/IndicadoresPage';
import { AuditoriasPage } from './components/AuditoriasPage';
import { HerramientasPage } from './components/HerramientasPage';
import { OficiosPage } from './components/OficiosPage';
import { getNextAccionCorrectivaCode, areaCodes } from './data/codingRules';


const App: React.FC = () => {
    const [documents, setDocuments] = useState<Documento[]>(initialDocuments);
    const [formats, setFormats] = useState<Formato[]>(initialFormats);
    const [acciones, setAcciones] = useState<AccionCorrectiva[]>(initialAcciones);
    const [revisiones, setRevisiones] = useState<Revision[]>(initialRevisiones);
    const [indicadores, setIndicadores] = useState<IndicadorCategoria[]>(initialIndicadores);
    const [documentosExternos, setDocumentosExternos] = useState<DocumentoExterno[]>(initialDocumentosExternos);
    const [auditorias, setAuditorias] = useState<Auditoria[]>(initialAuditorias);
    const [oficios, setOficios] = useState<Oficio[]>(initialOficios);
    
    const [currentPage, setCurrentPage] = useState('Gestor Documental');

    const handleImport = (data: JsonImportData) => {
        if (data.documentos) setDocuments(prev => [...prev, ...data.documentos!]);
        if (data.formatos) setFormats(prev => [...prev, ...data.formatos!]);
        if (data.accionesCorrectivas) setAcciones(prev => [...prev, ...data.accionesCorrectivas!]);
        if (data.revisiones) setRevisiones(prev => [...prev, ...data.revisiones!]);
        if (data.documentosExternos) setDocumentosExternos(prev => [...prev, ...data.documentosExternos!]);
        if (data.auditorias) setAuditorias(prev => [...prev, ...data.auditorias!]);
        if (data.indicadores) setIndicadores(prev => [...prev, ...data.indicadores!]);
        if (data.oficios) setOficios(prev => [...prev, ...data.oficios!]); // Handle imported oficios
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
    
    const handleSaveDocumentoExterno = (docToSave: DocumentoExterno) => {
        setDocumentosExternos(docs => {
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
    
    const handleSaveAuditoria = (auditoriaToSave: Auditoria) => {
        setAuditorias(auds => {
            const index = auds.findIndex(a => a.id === auditoriaToSave.id);
            if (index > -1) {
                const newAuds = [...auds];
                newAuds[index] = auditoriaToSave;
                return newAuds;
            }
            return [...auds, auditoriaToSave];
        });
    };

    const handleGenerateAccionFromHallazgo = (hallazgo: HallazgoAuditoria, auditoriaId: string) => {
        // Need to determine the area for the new action based on the audited area.
        const actionArea = hallazgo.areaAuditada; // Assuming areaAuditada matches an area in areaCodes
        
        // Ensure the area code exists, if not, use a fallback.
        const areaCodeExists = Object.keys(areaCodes).includes(actionArea);
        if (!areaCodeExists) {
            alert(`Error: Área de auditoría "${actionArea}" no reconocida para generar el código de acción.`);
            console.warn(`Area "${actionArea}" not found in areaCodes for generating action.`);
        }

        const newAccionId = `ac-${Date.now()}`;
        const newAccion: AccionCorrectiva = {
            id: newAccionId,
            // Generate the code here, as the action is being created
            codigo: getNextAccionCorrectivaCode(actionArea, acciones), // Use `acciones` as `allAcciones`
            descripcion: `Derivada de auditoría (Hallazgo: ${hallazgo.id}): ${hallazgo.descripcion}`,
            causaRaiz: '',
            acciones: [],
            responsableApertura: hallazgo.auditorResponsable,
            fechaApertura: new Date().toISOString().split('T')[0],
            estado: 'Abierta',
            area: actionArea, 
        };

        handleSaveAccion(newAccion);

        // Link the hallazgo to the new accion
        const updatedHallazgo = { ...hallazgo, accionCorrectivaId: newAccion.id };
        const auditoria = auditorias.find(a => a.id === auditoriaId);
        if (auditoria) {
            const updatedAuditoria = {
                ...auditoria,
                hallazgos: auditoria.hallazgos.map(h => h.id === hallazgo.id ? updatedHallazgo : h)
            };
            handleSaveAuditoria(updatedAuditoria);
        }
        
        alert(`Acción Correctiva ${newAccion.codigo} generada.`);
    };

    const handleSaveIndicadores = (categoriaId: string, indicadorId: string, newRegistros: any[]) => {
        setIndicadores(prev => {
            return prev.map(cat => {
                if (cat.id === categoriaId) {
                    return {
                        ...cat,
                        indicadores: cat.indicadores.map(ind => {
                            if (ind.id === indicadorId) {
                                return { ...ind, registros: newRegistros };
                            }
                            return ind;
                        })
                    };
                }
                return cat;
            });
        });
    };

    const handleSaveOficio = (oficioToSave: Oficio) => {
        setOficios(prev => {
            const index = prev.findIndex(o => o.id === oficioToSave.id);
            if (index > -1) {
                const newOficios = [...prev];
                newOficios[index] = oficioToSave;
                return newOficios;
            }
            return [...prev, oficioToSave];
        });
    };
    
    const renderPage = () => {
        switch (currentPage) {
            case 'Gestor Documental':
                return <GestorDocumentalPage 
                            documents={documents} 
                            formats={formats} 
                            documentosExternos={documentosExternos}
                            onSaveDocument={handleSaveDocument} 
                            onSaveFormat={handleSaveFormat} 
                            onSaveDocumentoExterno={handleSaveDocumentoExterno}
                        />;
            case 'Acciones Correctivas':
                return <AccionesCorrectivasPage acciones={acciones} onSave={handleSaveAccion} allAcciones={acciones} />;
            case 'Revisiones por la Dirección':
                return <RevisionesPage revisiones={revisiones} onSave={handleSaveRevision} />;
            case 'Indicadores':
                return <IndicadoresPage categorias={indicadores} onSave={handleSaveIndicadores} />;
            case 'Auditoría Interna':
                return <AuditoriasPage 
                            auditorias={auditorias} 
                            onSave={handleSaveAuditoria} 
                            onGenerateAccion={handleGenerateAccionFromHallazgo}
                        />;
            case 'Oficios':
                return <OficiosPage 
                            oficios={oficios}
                            onSaveOficio={handleSaveOficio}
                        />;
            case 'Herramientas':
                return <HerramientasPage
                            onImport={handleImport}
                            documents={documents}
                            formats={formats}
                            acciones={acciones}
                            revisiones={revisiones}
                            indicadores={indicadores}
                            documentosExternos={documentosExternos}
                            auditorias={auditorias}
                            oficios={oficios} // Pass oficios for export
                        />;
            default:
                 return <GestorDocumentalPage 
                            documents={documents} 
                            formats={formats} 
                            documentosExternos={documentosExternos}
                            onSaveDocument={handleSaveDocument} 
                            onSaveFormat={handleSaveFormat} 
                            onSaveDocumentoExterno={handleSaveDocumentoExterno}
                        />;
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
            <TopNavBar 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <main className="pt-16">
                <div className="container mx-auto px-6 py-8">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default App;
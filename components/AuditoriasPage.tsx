import React, { useState } from 'react';
import { Auditoria, HallazgoAuditoria } from '../types';
import { Tabs } from './Tabs';
import { ProcedimientoAuditoriaTab } from './ProcedimientoAuditoriaTab';
import { ProgramaAuditoriasTab } from './ProgramaAuditoriasTab';

interface AuditoriasPageProps {
  auditorias: Auditoria[];
  onSave: (auditoria: Auditoria) => void;
  onGenerateAccion: (hallazgo: HallazgoAuditoria, auditoriaId: string) => void;
}

export const AuditoriasPage: React.FC<AuditoriasPageProps> = ({ auditorias, onSave, onGenerateAccion }) => {
  const TABS = ['Procedimiento de Auditoría', 'Programa de Auditorías'];
  const [activeTab, setActiveTab] = useState(TABS[1]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Auditoría Interna</h1>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} tabs={TABS} />
      <div className="mt-8">
        {activeTab === 'Procedimiento de Auditoría' && <ProcedimientoAuditoriaTab />}
        {activeTab === 'Programa de Auditorías' && 
            <ProgramaAuditoriasTab 
                auditorias={auditorias} 
                onSave={onSave} 
                onGenerateAccion={onGenerateAccion}
            />}
      </div>
    </div>
  );
};
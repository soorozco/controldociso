import React from 'react';

const SectionTitle: React.FC<{ number: string, title: string }> = ({ number, title }) => (
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">{number} {title}</h2>
);

const SubSectionTitle: React.FC<{ number: string, title: string }> = ({ number, title }) => (
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">{number} {title}</h3>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="mb-2 ml-4">{children}</li>
);

export const ProcedimientoAuditoriaTab: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 prose dark:prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-center mb-6">Guía de Auditoría Interna (ISO 9001:2015 & ISO 19011:2018)</h1>

            <SectionTitle number="1." title="Objetivo General y Propósito" />
            <p>El propósito de la auditoría interna es proporcionar información imparcial y objetiva sobre la conformidad y eficacia del Sistema de Gestión de la Calidad (SGC). Sirve para determinar si el SGC:</p>
            <ul>
                <ListItem>Es conforme con los requisitos propios de la organización (ej. procedimientos, políticas).</ListItem>
                <ListItem>Es conforme con los requisitos de la norma ISO 9001:2015.</ListItem>
                <ListItem>Se implementa y mantiene de manera eficaz.</ListItem>
                <ListItem>Identifica áreas de riesgo y oportunidades de mejora.</ListItem>
            </ul>

            <SectionTitle number="2." title="Requisitos Previos y Condiciones Necesarias" />
            <SubSectionTitle number="2.1" title="Programa de Auditorías" />
            <p>Debe existir un programa que planifique las auditorías a realizar en un periodo definido (ej. anual), considerando la importancia de los procesos, los cambios que les afecten y los resultados de auditorías previas.</p>
            <SubSectionTitle number="2.2" title="Criterios y Alcance Definidos" />
            <p>Para cada auditoría, se deben definir claramente los criterios (contra qué se audita) y el alcance (qué procesos o áreas se van a auditar).</p>
            <SubSectionTitle number="2.3" title="Competencia e Independencia del Auditor" />
            <p>Los auditores deben ser seleccionados para asegurar la objetividad y la imparcialidad. No deben auditar su propio trabajo. Deben ser competentes en base a educación, formación y experiencia.</p>
            
            <SectionTitle number="3." title="Fases del Proceso de Auditoría Interna" />
            <SubSectionTitle number="3.1" title="Planeación de la Auditoría" />
            <p>El auditor líder elabora un <strong>Plan de Auditoría</strong> detallado, que incluye: objetivos, alcance, criterios, fechas, horarios, áreas a auditar, miembros del equipo auditor y roles. Se comunica a los auditados con antelación.</p>
            <SubSectionTitle number="3.2" title="Preparación y Lista de Verificación" />
            <p>El equipo auditor revisa la documentación pertinente (procedimientos, manuales, etc.) y prepara listas de verificación (checklists) como guía para recopilar evidencia.</p>
            <SubSectionTitle number="3.3" title="Ejecución de la Auditoría" />
            <ul>
                <ListItem><strong>Reunión de Apertura:</strong> Se presenta el equipo auditor, se confirma el plan, el alcance y los canales de comunicación.</ListItem>
                <ListItem><strong>Recopilación de Evidencia:</strong> Mediante entrevistas, observación de actividades y revisión de registros.</ListItem>
                <ListItem><strong>Identificación de Hallazgos:</strong> La evidencia se evalúa contra los criterios para identificar conformidades y no conformidades.</ListItem>
            </ul>
             <SubSectionTitle number="3.4" title="Registro de Hallazgos" />
            <p>Los hallazgos se documentan formalmente. Tipos comunes:</p>
            <ul>
                <ListItem><strong>No Conformidad:</strong> Incumplimiento de un requisito. Puede ser <em>Mayor</em> (afecta la capacidad del SGC) o <em>Menor</em> (fallo aislado).</ListItem>
                <ListItem><strong>Observación:</strong> Situación que podría derivar en una no conformidad si no se corrige.</ListItem>
                <ListItem><strong>Oportunidad de Mejora:</strong> Sugerencia para mejorar el desempeño del proceso.</ListItem>
            </ul>
            <SubSectionTitle number="3.5" title="Reunión de Cierre" />
            <p>Se presentan los hallazgos y conclusiones a la dirección y a los responsables de las áreas auditadas. Se acuerdan los plazos para presentar los planes de acción.</p>
            <SubSectionTitle number="3.6" title="Elaboración del Informe de Auditoría" />
            <p>Se emite un informe formal que resume todo el proceso, incluyendo el plan, los hallazgos detallados, las conclusiones y las fortalezas identificadas.</p>
            <SubSectionTitle number="3.7" title="Seguimiento de Acciones Correctivas" />
            <p>El auditor es responsable de verificar que las acciones tomadas para corregir las no conformidades sean eficaces. Este seguimiento se vincula con el módulo de <strong>Acciones Correctivas</strong>.</p>

            <SectionTitle number="4." title="Documentos y Registros Requeridos" />
             <ul>
                <ListItem><strong>Plan Anual de Auditorías:</strong> Evidencia la planificación general.</ListItem>
                <ListItem><strong>Plan de Auditoría Específico:</strong> Detalla la logística de una auditoría individual.</ListItem>
                <ListItem><strong>Listas de Verificación:</strong> Guía para el auditor (opcional pero recomendado).</ListItem>
                <ListItem><strong>Formato de No Conformidades:</strong> Registro formal de cada hallazgo.</ListItem>
                <ListItem><strong>Informe Final de Auditoría:</strong> Registro completo y oficial de la auditoría.</ListItem>
                <ListItem><strong>Registros de Asistencia:</strong> A las reuniones de apertura y cierre.</ListItem>
            </ul>

            <SectionTitle number="5." title="Roles y Responsabilidades" />
             <ul>
                <ListItem><strong>Auditor Líder:</strong> Responsable de planificar, conducir y reportar la auditoría.</ListItem>
                <ListItem><strong>Auditados:</strong> Personal del área auditada. Deben cooperar y proporcionar la evidencia solicitada.</ListItem>
                <ListItem><strong>Dirección:</strong> Asegura que los resultados se revisen y se tomen las acciones necesarias.</ListItem>
                <ListItem><strong>Responsable de Calidad:</strong> Gestiona el programa de auditorías y asegura la competencia de los auditores.</ListItem>
            </ul>
            
             <SectionTitle number="6." title="Principios de Auditoría (ISO 19011)" />
             <p>Las auditorías deben basarse en los siguientes principios para ser una herramienta eficaz:</p>
             <ul>
                <li><strong>Integridad:</strong> Fundamento del profesionalismo.</li>
                <li><strong>Presentación imparcial:</strong> Obligación de reportar con veracidad y exactitud.</li>
                <li><strong>Debido cuidado profesional:</strong> Aplicación de diligencia y juicio.</li>
                <li><strong>Confidencialidad:</strong> Seguridad de la información.</li>
                <li><strong>Independencia:</strong> Base para la imparcialidad.</li>
                <li><strong>Enfoque basado en evidencia:</strong> Método racional para alcanzar conclusiones fiables.</li>
            </ul>

        </div>
    );
};

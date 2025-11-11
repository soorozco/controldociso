

import React, { useState, useMemo } from 'react';
import { Indicador, RegistroTiempoEspera, RegistroInfeccionesNosocomiales, RegistroNacimientosCesareas, RegistroTratoDignoEnfermeria, RegistroPrevencionCaidas, RegistroMinistracionMedicamentos, RegistroClinicoNotasEnfermeria, RegistroVenoclisisInstalada, RegistroEncuestaSatisfaccion, RegistroEventoAdverso, CalificacionSatisfaccion } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { IndicadorTiempoEsperaForm } from './IndicadorTiempoEsperaForm';
import { IndicadorTiempoEsperaSummary } from './IndicadorTiempoEsperaSummary';
import { IndicadorInfeccionesForm } from './IndicadorInfeccionesForm';
import { IndicadorInfeccionesSummary } from './IndicadorInfeccionesSummary';
import { IndicadorCesareasForm } from './IndicadorCesareasForm';
import { IndicadorCesareasSummary } from './IndicadorCesareasSummary';
import { IndicadorTratoDignoForm } from './IndicadorTratoDignoForm';
import { IndicadorTratoDignoSummary } from './IndicadorTratoDignoSummary';
import { IndicadorPrevencionCaidasForm } from './IndicadorPrevencionCaidasForm';
import { IndicadorPrevencionCaidasSummary } from './IndicadorPrevencionCaidasSummary';
import { IndicadorMinistracionMedicamentosForm } from './IndicadorMinistracionMedicamentosForm';
import { IndicadorMinistracionMedicamentosSummary } from './IndicadorMinistracionMedicamentosSummary';
import { IndicadorRegistroClinicoForm } from './IndicadorRegistroClinicoForm';
import { IndicadorRegistroClinicoSummary } from './IndicadorRegistroClinicoSummary';
import { IndicadorVenoclisisInstaladaForm } from './IndicadorVenoclisisInstaladaForm';
import { IndicadorVenoclisisInstaladaSummary } from './IndicadorVenoclisisInstaladaSummary';
import { IndicadorSatisfaccionForm } from './IndicadorSatisfaccionForm';
import { IndicadorSatisfaccionSummary } from './IndicadorSatisfaccionSummary';
import { IndicadorEventosAdversosForm } from './IndicadorEventosAdversosForm'; // NEW
import { IndicadorEventosAdversosTable } from './IndicadorEventosAdversosTable'; // NEW
import { IndicadorEventosAdversosSummary } from './IndicadorEventosAdversosSummary'; // NEW
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';


interface IndicadorDetailViewProps {
    // FIX: Use Indicador<any> here as this component handles all types of indicators
    indicador: Indicador<any>;
    onBack: () => void;
    onSave: (newRegistros: any[]) => void;
}

const TiempoEsperaTable: React.FC<{ registros: RegistroTiempoEspera[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                {['Fecha', 'Turno', 'Género', 'Hora Solicitud', 'Hora Entrada', 'Minutos de Espera'].map(header => (
                    <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.turno}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.genero}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.solicitudHora}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.entradaHora}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{reg.minutosEspera}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const totalInfecciones = (reg: RegistroInfeccionesNosocomiales) => 
    reg.bacteriemias.casos + reg.neumonias.casos + reg.sitioQuirurgico.casos + reg.viasUrinarias.casos;

const InfeccionesTable: React.FC<{ registros: RegistroInfeccionesNosocomiales[] }> = ({ registros }) => (
     <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                {['Mes', 'Área', 'Total Infecciones', 'Bacteriemias', 'Neumonías', 'Sitio Qx.', 'Vías Urinarias'].map(header => (
                    <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.mes}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.area}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{totalInfecciones(reg)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.bacteriemias.casos}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.neumonias.casos}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.sitioQuirurgico.casos}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.viasUrinarias.casos}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const CesareasTable: React.FC<{ registros: RegistroNacimientosCesareas[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                {['Mes', 'Turno', 'Total Nacimientos', 'Vaginales', 'Cesáreas', '% Cesáreas'].map(header => (
                    <th key={header} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.mes}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.turno}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.totalNacimientos}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.vaginales}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.cesareas}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{reg.porcentajeCesareas.toFixed(1)}%</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const tratoDignoQuestions = {
    q1: '1. Saludo amable',
    q2: '2. Se presenta',
    q3: '3. Usa su nombre',
    q4: '4. Explica cuidados',
    q5: '5. Estancia agradable',
    q6: '6. Cuida intimidad',
    q7: '7. Da seguridad',
    q8: '8. Trato respetuoso',
    q9: '9. Enseña cuidados',
    q10: '10. Continuidad',
    q11: '11. Satisfecho'
};

const TratoDignoTable: React.FC<{ registros: RegistroTratoDignoEnfermeria[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Expediente</th>
                {Object.values(tratoDignoQuestions).map((q, index) => (
                    <th key={index} scope="col" title={q} className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{index + 1}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.numeroExpediente}</td>
                    <td className="text-center">{reg.saludoAmable ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.sePresenta ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.usaNombre ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.explicaCuidados ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.estanciaAgradable ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.cuidaIntimidad ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.daSeguridad ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.tratoRespetuoso ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.ensenanzaCuidados ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.continuidadCuidados ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.satisfechoTrato ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const PrevencionCaidasTable: React.FC<{ registros: RegistroPrevencionCaidas[] }> = ({ registros }) => (
     <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Expediente</th>
                 {['1', '2', '3', '4', '5', '6', '7'].map((q) => (
                    <th key={q} scope="col" className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{q}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.numeroExpediente}</td>
                    <td className="text-center">{reg.valoraRiesgo ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.establecePlan ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.utilizaRecursos ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.informaPaciente ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.orientaEquipo ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.revaloraAjusta ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.registraIncidente ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const MinistracionMedicamentosTable: React.FC<{ registros: RegistroMinistracionMedicamentos[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Expediente</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Clave Enf.</th>
                {['1', '2', '3', '4', '5', '6', '7'].map((q) => (
                    <th key={q} scope="col" className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{q}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.numeroExpediente}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.claveEnfermeria}</td>
                    <td className="text-center">{reg.verificaDatosOrden ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.verificaNombrePresentacion ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.verificaCaducidad ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.verificaDosisHora ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.hablaYExplica ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.cercioraIngestion ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.registraTermino ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const RegistroClinicoTable: React.FC<{ registros: RegistroClinicoNotasEnfermeria[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Expediente</th>
                {['1', '2', '3', '4', '5', '6', '7', '8'].map((q) => (
                    <th key={q} scope="col" className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100" title={`Criterio ${q}`}>{q}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.numeroExpediente}</td>
                    <td className="text-center">{reg.identificacionCorrecta ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.datosObjetivos ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.describeEstadoIngreso ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.registraPlan ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.describeEvolucion ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.continuidadTurno ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.detectaFactoresRiesgo ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.documentaPlanAlta ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const VenoclisisInstaladaTable: React.FC<{ registros: RegistroVenoclisisInstalada[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Expediente</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Clave Enf.</th>
                {['<24h', 'Norm.', '<72h', 'Resid.', 'Limpio', 'Fijo', 'Cerrado'].map((q, i) => (
                    <th key={q} scope="col" className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100" title={`Criterio ${i + 1}`}>{q}</th>
                ))}
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.numeroExpediente}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.claveEnfermeria}</td>
                    <td className="text-center">{reg.solucionMenos24h ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.membreteNormativo ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.equipoMenos72h ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.equipoLibreResiduos ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.sitioPuncionLimpio ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.cateterFijoLimpio ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                    <td className="text-center">{reg.circuitoCerrado ? <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const scoreColorMap: Record<CalificacionSatisfaccion, string> = {
    'Excelente': 'bg-green-700',
    'Bueno': 'bg-green-500',
    'Regular': 'bg-yellow-500',
    'Malo': 'bg-orange-500',
    'Pésimo': 'bg-red-500'
};
const ScoreDot: React.FC<{ score: CalificacionSatisfaccion }> = ({ score }) => (
    <div className="flex justify-center items-center">
        <span className={`h-4 w-4 rounded-full ${scoreColorMap[score]}`} title={score}></span>
    </div>
);
const EncuestaSatisfaccionTable: React.FC<{ registros: RegistroEncuestaSatisfaccion[] }> = ({ registros }) => (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Paciente</th>
                {[...Array(11)].map((_, i) => (
                    <th key={i} scope="col" className="px-2 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100" title={`Pregunta ${i + 1}`}>{i + 1}</th>
                ))}
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Recomienda</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {registros.map((reg) => (
                <tr key={reg.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.fecha}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.paciente}</td>
                    <td><ScoreDot score={reg.tramitesIngreso} /></td>
                    <td><ScoreDot score={reg.informacionNormas} /></td>
                    <td><ScoreDot score={reg.tiempoEsperaAtencion} /></td>
                    <td><ScoreDot score={reg.atencionEnfermeria} /></td>
                    <td><ScoreDot score={reg.atencionPersonalMedico} /></td>
                    <td><ScoreDot score={reg.confidencialidadPrivacidad} /></td>
                    <td><ScoreDot score={reg.higieneLimpieza} /></td>
                    <td><ScoreDot score={reg.vigilanciaInterna} /></td>
                    <td><ScoreDot score={reg.calidadAlimentos} /></td>
                    <td><ScoreDot score={reg.servicioGeneral} /></td>
                    <td><ScoreDot score={reg.tramitesEgreso} /></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{reg.recomendaria}</td>
                </tr>
            ))}
        </tbody>
    </table>
);



const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export const IndicadorDetailView: React.FC<IndicadorDetailViewProps> = ({ indicador, onBack, onSave }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [monthFilter, setMonthFilter] = useState('all');
    
    // Updated to include new indicator 'ind-srea-01'
    const dateBasedIndicators = ['ind-te-02', 'ind-tde-02', 'ind-pcph-02', 'ind-mmvoe-02', 'ind-rcne-02', 'ind-vcvi-02', 'ind-es-01', 'ind-srea-01'];

    const uniqueMonths = useMemo(() => {
        let months: Set<string> = new Set();
        // FIX: Explicitly cast `indicador.registros` to `any[]` to satisfy the linter
        const records: any[] = indicador.registros;

        if (dateBasedIndicators.includes(indicador.id)) {
            records.forEach(reg => {
                let dateString = '';
                if ('fecha' in reg && typeof reg.fecha === 'string') {
                    dateString = reg.fecha;
                } else if ('fechaea' in reg && typeof reg.fechaea === 'string') { // For Eventos Adversos
                    dateString = reg.fechaea;
                }

                if (dateString) {
                    const date = new Date(dateString + 'T00:00:00'); // Use T00:00:00 to avoid timezone issues
                    const monthName = date.toLocaleString('es-MX', { month: 'long', timeZone: 'UTC' });
                    const year = date.getUTCFullYear();
                    months.add(`${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`);
                }
            });
        } else {
             records.forEach(reg => {
                if ('mes' in reg && typeof reg.mes === 'string') {
                    months.add(reg.mes);
                }
            });
        }
        
        return Array.from(months).sort((a, b) => {
            const parseMonthYear = (s: string) => {
                const parts = s.split(' ');
                if (parts.length === 2) {
                    const monthIndex = meses.indexOf(parts[0].toLowerCase());
                    const year = parseInt(parts[1], 10);
                    if (monthIndex !== -1 && !isNaN(year)) {
                        return new Date(year, monthIndex).getTime();
                    }
                }
                return 0; // Invalid date, push to beginning
            };
            return parseMonthYear(b) - parseMonthYear(a);
        });
    }, [indicador.registros, indicador.id]);
    
    const filteredRegistros = useMemo(() => {
        if (monthFilter === 'all') return indicador.registros;

        if (dateBasedIndicators.includes(indicador.id)) {
             return indicador.registros.filter((reg: any) => { // Cast reg to any here for type safety
                let dateString = '';
                if ('fecha' in reg && typeof reg.fecha === 'string') {
                    dateString = reg.fecha;
                } else if ('fechaea' in reg && typeof reg.fechaea === 'string') {
                    dateString = reg.fechaea;
                }

                if (dateString) {
                    const date = new Date(dateString + 'T00:00:00'); // Use T00:00:00 to avoid timezone issues
                    const monthName = date.toLocaleString('es-MX', { month: 'long', timeZone: 'UTC' });
                    const year = date.getUTCFullYear();
                    const formattedMonth = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
                    return formattedMonth === monthFilter;
                }
                return false;
            });
        }
        return indicador.registros.filter((reg: any) => 'mes' in reg && reg.mes === monthFilter); // Cast reg to any
    }, [indicador.registros, monthFilter, indicador.id]);


    const handleSaveRegistro = (newRegistro: any) => {
        const newRegistros = [...indicador.registros, newRegistro];
        onSave(newRegistros);
        setIsFormOpen(false);
    }
    
    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeftIcon className="w-5 h-5"/>
                Volver a Indicadores
            </button>

            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{indicador.nombre}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">{indicador.descripcion}</p>
                </div>
                 <div className="flex gap-2 shrink-0">
                    <button onClick={() => setIsSummaryOpen(true)} className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700">
                        Ver Resumen
                    </button>
                    <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">
                        <PlusIcon className="w-5 h-5" />
                        Nuevo Registro
                    </button>
                </div>
            </div>
             <div className="flex justify-end items-center my-4">
                <label htmlFor="monthFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Filtrar por Mes:</label>
                <select 
                    id="monthFilter"
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="w-48 appearance-none bg-white dark:bg-gray-700 pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    <option value="all">Todos los Meses</option>
                    {uniqueMonths.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
            </div>

            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                           {indicador.id === 'ind-te-02' && <TiempoEsperaTable registros={filteredRegistros as RegistroTiempoEspera[]} />}
                           {indicador.id === 'ind-in-02' && <InfeccionesTable registros={filteredRegistros as RegistroInfeccionesNosocomiales[]} />}
                           {indicador.id === 'ind-c-02' && <CesareasTable registros={filteredRegistros as RegistroNacimientosCesareas[]} />}
                           {indicador.id === 'ind-tde-02' && <TratoDignoTable registros={filteredRegistros as RegistroTratoDignoEnfermeria[]} />}
                           {indicador.id === 'ind-pcph-02' && <PrevencionCaidasTable registros={filteredRegistros as RegistroPrevencionCaidas[]} />}
                           {indicador.id === 'ind-mmvoe-02' && <MinistracionMedicamentosTable registros={filteredRegistros as RegistroMinistracionMedicamentos[]} />}
                           {indicador.id === 'ind-rcne-02' && <RegistroClinicoTable registros={filteredRegistros as RegistroClinicoNotasEnfermeria[]} />}
                           {indicador.id === 'ind-vcvi-02' && <VenoclisisInstaladaTable registros={filteredRegistros as RegistroVenoclisisInstalada[]} />}
                           {indicador.id === 'ind-es-01' && <EncuestaSatisfaccionTable registros={filteredRegistros as RegistroEncuestaSatisfaccion[]} />}
                           {indicador.id === 'ind-srea-01' && <IndicadorEventosAdversosTable registros={filteredRegistros as RegistroEventoAdverso[]} />} {/* NEW */}
                        </div>
                    </div>
                </div>
            </div>
            
            {isFormOpen && indicador.id === 'ind-te-02' && (
                <IndicadorTiempoEsperaForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
             {isFormOpen && indicador.id === 'ind-in-02' && (
                <IndicadorInfeccionesForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-c-02' && (
                <IndicadorCesareasForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-tde-02' && (
                <IndicadorTratoDignoForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-pcph-02' && (
                <IndicadorPrevencionCaidasForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-mmvoe-02' && (
                <IndicadorMinistracionMedicamentosForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-rcne-02' && (
                <IndicadorRegistroClinicoForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-vcvi-02' && (
                <IndicadorVenoclisisInstaladaForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
             {isFormOpen && indicador.id === 'ind-es-01' && (
                <IndicadorSatisfaccionForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}
            {isFormOpen && indicador.id === 'ind-srea-01' && ( // NEW
                <IndicadorEventosAdversosForm onClose={() => setIsFormOpen(false)} onSave={handleSaveRegistro} />
            )}

            
            {isSummaryOpen && indicador.id === 'ind-te-02' && (
                <IndicadorTiempoEsperaSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroTiempoEspera[]} />
            )}
            {isSummaryOpen && indicador.id === 'ind-in-02' && (
                <IndicadorInfeccionesSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroInfeccionesNosocomiales[]} />
            )}
            {isSummaryOpen && indicador.id === 'ind-c-02' && (
                <IndicadorCesareasSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroNacimientosCesareas[]} />
            )}
             {isSummaryOpen && indicador.id === 'ind-tde-02' && (
                <IndicadorTratoDignoSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroTratoDignoEnfermeria[]} />
            )}
             {isSummaryOpen && indicador.id === 'ind-pcph-02' && (
                <IndicadorPrevencionCaidasSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroPrevencionCaidas[]} />
            )}
             {isSummaryOpen && indicador.id === 'ind-mmvoe-02' && (
                <IndicadorMinistracionMedicamentosSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroMinistracionMedicamentos[]} />
            )}
             {isSummaryOpen && indicador.id === 'ind-rcne-02' && (
                <IndicadorRegistroClinicoSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroClinicoNotasEnfermeria[]} />
            )}
            {isSummaryOpen && indicador.id === 'ind-vcvi-02' && (
                <IndicadorVenoclisisInstaladaSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroVenoclisisInstalada[]} />
            )}
             {isSummaryOpen && indicador.id === 'ind-es-01' && (
                <IndicadorSatisfaccionSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroEncuestaSatisfaccion[]} />
            )}
            {isSummaryOpen && indicador.id === 'ind-srea-01' && ( // NEW
                <IndicadorEventosAdversosSummary onClose={() => setIsSummaryOpen(false)} registros={filteredRegistros as RegistroEventoAdverso[]} />
            )}
        </div>
    );
};
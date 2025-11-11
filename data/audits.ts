import { Auditoria } from '../types';

export const initialAuditorias: Auditoria[] = [
  {
    id: 'aud-1',
    codigo: 'AI-2024-01',
    fechaInicio: '2024-09-02',
    fechaFin: '2024-09-04',
    objetivo: 'Verificar la conformidad del proceso de Admisión Hospitalaria con el procedimiento PR-AH-01 y los requisitos de la norma ISO 9001:2015.',
    alcance: 'Abarca desde la recepción del paciente en el mostrador de admisión hasta la asignación de habitación y la creación del expediente clínico inicial.',
    criterios: 'ISO 9001:2015 (Cláusulas 8.2, 8.5.1), PR-AH-01 (Procedimiento de Admisión), NOM-004-SSA3-2012.',
    auditorLider: 'Ana García (Calidad)',
    equipoAuditor: ['Luis Mendez (Enfermería)'],
    estado: 'Completada',
    hallazgos: [
      {
        id: 'hall-1-1',
        tipo: 'No Conformidad Menor',
        descripcion: 'En 2 de 10 expedientes revisados, no se encontró evidencia de la firma del "Consentimiento Informado para la Hospitalización" (FT-AH-02) al momento del ingreso.',
        evidencia: 'Expedientes #10245 y #10248, revisados el 02/09/2024. Ausencia del formato FT-AH-02.',
        requisitoIncumplido: 'ISO 9001:2015 - 8.2.3 Revisión de los requisitos para los productos y servicios',
        areaAuditada: 'Admisión Hospitalaria',
        auditorResponsable: 'Luis Mendez',
        fechaDeteccion: '2024-09-02',
        accionCorrectivaId: 'ac-2' // Link to an existing corrective action
      },
      {
        id: 'hall-1-2',
        tipo: 'Observación',
        descripcion: 'El personal de admisión utiliza post-its para anotar datos temporales del paciente antes de ingresarlos al sistema, lo cual podría representar un riesgo para la confidencialidad de la información.',
        evidencia: 'Observación directa en el mostrador de admisión el 02/09/2024 a las 10:30 hrs.',
        requisitoIncumplido: 'ISO 9001:2015 - 7.1.4 Ambiente para la operación de los procesos',
        areaAuditada: 'Admisión Hospitalaria',
        auditorResponsable: 'Ana García',
        fechaDeteccion: '2024-09-02',
      }
    ],
  },
  {
    id: 'aud-2',
    codigo: 'AI-2024-02',
    fechaInicio: '2024-10-15',
    fechaFin: '2024-10-16',
    objetivo: 'Evaluar la gestión y control de medicamentos en el servicio de Farmacia.',
    alcance: 'Desde la recepción de medicamentos del proveedor hasta la dispensación a los servicios de hospitalización.',
    criterios: 'ISO 9001:2015 (Cláusula 8.5.2, 8.5.3), PR-FA-01, NOM-072-SSA1-2012.',
    auditorLider: 'Carlos Ruiz (Auditor Externo)',
    equipoAuditor: ['Ana García (Calidad)'],
    estado: 'Planificada',
    hallazgos: [],
  },
];

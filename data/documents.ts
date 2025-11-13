
import { Documento, Formato, AccionCorrectiva, Revision, DocumentoExterno, Oficio } from '../types';
import { areaCodes, getNextSequentialNumber } from './codingRules';

export const initialDocuments: Documento[] = [
  {
    id: 'doc-1',
    codigo: 'PROC-001',
    nombre: 'Procedimiento de Control de Documentos',
    version: 3,
    fechaAprobacion: '2023-05-15',
    area: 'Calidad',
    tipoDocumento: 'Procedimiento',
    estado: 'Vigente',
    archivo: 'docs/PROC-001.pdf',
    relaciones: ['FORM-001', 'FORM-002'],
    controlCambios: [
      { Numero: '3', Fecha: '2023-05-15', 'Descripcion del Cambio': 'Actualización según auditoría interna.', 'Realizado por': 'Auditoría', 'Aprobado por': 'Gerencia Calidad' },
      { Numero: '2', Fecha: '2022-01-20', 'Descripcion del Cambio': 'Añadido control de formatos.', 'Realizado por': 'Analista Calidad', 'Aprobado por': 'Gerencia Calidad' },
    ],
  },
  {
    id: 'doc-2',
    codigo: 'MAN-CAL-001',
    nombre: 'Manual de Calidad',
    version: 5,
    fechaAprobacion: '2024-01-10',
    area: 'Dirección',
    tipoDocumento: 'Manual',
    estado: 'Vigente',
    archivo: 'docs/MAN-CAL-001.pdf',
  },
  {
    id: 'doc-3',
    codigo: 'INST-005',
    nombre: 'Instrucción de Limpieza de Equipos',
    version: 1,
    fechaAprobacion: '2021-11-01',
    area: 'Producción',
    tipoDocumento: 'Instrucción',
    estado: 'Obsoleto',
    archivo: 'docs/INST-005.pdf',
  },
];

export const initialFormats: Formato[] = [
  {
    id: 'form-1',
    codigo: 'FORM-001',
    nombre: 'Solicitud de Creación de Documento',
    version: 2,
    fechaAprobacion: '2023-05-15',
    area: 'Calidad',
    tipoDocumento: 'Formato',
    estado: 'Vigente',
    archivo: 'forms/FORM-001.pdf',
    documentoPadreCodigo: 'PROC-001',
  },
  {
    id: 'form-2',
    codigo: 'FORM-002',
    nombre: 'Listado Maestro de Documentos',
    version: 4,
    fechaAprobacion: '2024-02-01',
    area: 'Calidad',
    tipoDocumento: 'Formato',
    estado: 'Vigente',
    archivo: 'forms/FORM-002.xlsx',
    documentoPadreCodigo: 'PROC-001',
  },
];

export const initialDocumentosExternos: DocumentoExterno[] = [
  {
    id: 'de-1',
    codigo: 'DE-REG-01',
    nombre: 'NOM-004-SSA3-2012, Del expediente clínico.',
    tipoDocumento: 'Norma',
    areaResponsable: 'Calidad',
    fuenteEmisor: 'Secretaría de Salud (SSA)',
    codigoEmisor: 'NOM-004-SSA3-2012',
    fechaEmisionOriginal: '2012-10-15',
    fechaRecepcionRegistro: '2018-01-20',
    version: 'DOF 15/10/2012',
    estado: 'Vigente',
    periodicidadRevision: 'Cada 5 años o por actualización del DOF',
    fechaUltimaRevisionInterna: '2023-11-10',
    proximaRevisionProgramada: '2024-11-10',
    ubicacion: 'Intranet SGC > Normatividad',
    responsableCustodia: 'Jefatura de Calidad',
    documentosRelacionados: ['PROC-005', 'PROC-008'],
    observaciones: 'Norma fundamental para la gestión de todos los registros clínicos.',
    fechaVerificacionVigencia: '2023-11-10',
    evidenciaVerificacion: 'Consulta en sitio web del Diario Oficial de la Federación.',
    validadoPor: 'Dr. A. Martinez (Director Médico)',
  },
  {
    id: 'de-2',
    codigo: 'DE-IB-05',
    nombre: 'Manual de Operación y Mantenimiento - Bomba de Infusión Alaris PC',
    tipoDocumento: 'Manual',
    areaResponsable: 'Ingeniería Biomédica',
    fuenteEmisor: 'Becton, Dickinson and Company (BD)',
    codigoEmisor: 'BD-ALARIS-PC-MAN-OP-2021',
    fechaEmisionOriginal: '2021-06-01',
    fechaRecepcionRegistro: '2021-08-15',
    version: 'Rev. C',
    estado: 'Vigente',
    periodicidadRevision: 'Cuando el fabricante notifique una actualización',
    ubicacion: 'Archivo físico en taller de Biomédica y copia digital en servidor.',
    responsableCustodia: 'Jefe de Ing. Biomédica',
    validadoPor: 'Ing. R. Soto',
  }
];

export const initialAcciones: AccionCorrectiva[] = [
  {
    id: 'ac-1',
    codigo: 'AC-CA-001',
    descripcion: 'No se está registrando la temperatura de la cámara frigorífica #3.',
    causaRaiz: 'El termómetro del equipo está descalibrado y el personal no fue re-entrenado en el procedimiento de verificación.',
    acciones: [
      { descripcion: 'Calibrar termómetro de cámara #3', responsable: 'J. Pérez (Mantenimiento)', fechaPrevista: '2024-08-15', completada: true },
      { descripcion: 'Re-entrenar a personal de turno en PROC-PROD-012', responsable: 'M. Gomez (Producción)', fechaPrevista: '2024-08-20', completada: false },
    ],
    responsableApertura: 'A. López (Calidad)',
    fechaApertura: '2024-08-10',
    estado: 'En Proceso',
    area: 'Calidad',
  },
  {
    id: 'ac-2',
    codigo: 'AC-AD-001',
    descripcion: 'Etiquetado incorrecto en lote de producción 23-11-B.',
    causaRaiz: 'Error humano al seleccionar la etiqueta en el sistema de impresión.',
    acciones: [
        { descripcion: 'Implementar sistema de escaneo de código de producto para seleccionar etiqueta.', responsable: 'L. Torres (Sistemas)', fechaPrevista: '2024-01-30', completada: true },
        { descripcion: 'Retirar y re-etiquetar lote afectado.', responsable: 'M. Gomez (Producción)', fechaPrevista: '2023-12-05', completada: true }
    ],
    responsableApertura: 'C. Reyes (Administración)',
    fechaApertura: '2023-12-01',
    estado: 'Verificada',
    fechaCierre: '2024-02-15',
    area: 'Administración / Compras',
  }
];

export const initialRevisiones: Revision[] = [
    {
        id: 'rev-2025-09-15',
        fecha: '2025-09-15',
        tipo: 'Dirección',
        responsable: 'Hna. Maria de Jesus Garcia Castro (Dirección General)',
        objetivos: 'Evaluar el desempeño del SGC, la conformidad de los procesos y la satisfacción del cliente para el periodo Septiembre 2024 - Septiembre 2025.',
        estado: 'Completada',
        estadoAccionesAnteriores: `Reforzar registro de eventos adversos y producto no conforme (Agosto 2025): Cumplido. Se consolidó la base de datos y se generaron análisis mensuales.
Actualizar matriz de riesgos por servicio (En curso): Cumplido parcialmente. Falta actualización de áreas administrativas.
Implementar seguimiento mensual a indicadores IAAS (Agosto 2025): Cumplido. Se obtuvieron tasas mensuales con base en egresos UTI.
Incrementar la participación de usuarios en encuestas de satisfacción (En curso): Bajo retorno digital, se reforzará con encuesta en punto de egreso.`,
        resumenCambios: `Internos:
- Actualización de procedimientos del Sistema de Gestión de Calidad (SGC).
- Reestructuración del comité de calidad y seguridad del paciente.
- Implementación de acciones correctivas derivadas de quejas recurrentes en Imagenología.
Externos:
- Ajuste de requisitos derivados de auditorías internas y lineamientos estatales 2025.
- En curso la alineación con los indicadores INDICAS y los nuevos criterios de la Secretaría de Salud Jalisco.`,
        desempenoEficaciaSGC: `Satisfacción del usuario: Promedio general de satisfacción ≥ 85%. Áreas mejor evaluadas: hospitalización y enfermería. Áreas con oportunidad: Imagenología (reportes de retrasos y trato).
Retroalimentación de las partes interesadas (Interna): Personal administrativo y clínico reporta mejor flujo en emisión de recetas oncológicas y registro de eventos adversos.
Retroalimentación de las partes interesadas (Externa): Clientes institucionales reportaron insatisfacción en oportunidad de estudios de imagenología (reducción del 70% de derivaciones).`,
        cumplimientoObjetivosPrevios: `Reducir la tasa de infecciones UTI a < 5%: Parcialmente cumplido (5.56 %).
Mejorar satisfacción del usuario ≥ 90%: No alcanzado (promedio 85%).
Disminuir tiempo promedio de ingreso < 10 min: Cumplido según registro de "Indicador Tiempo Ingreso" (promedio 8.7 min).`,
        seguimientoAuditorias: `Nutrición: Suministro de lácteos a paciente con indicación médica de dieta libre de lácteos, por falta de verificación entre enfermería y nutrición.
Imagenología / Capital Humano: Queja formal de cliente por negativa a realizar estudios, diferimientos de citas y trato inadecuado del técnico radiólogo.`,
        adecuacionRecursos: `Recursos humanos limitados en Imagenología y UTI.
Equipos biomédicos con más de 8 años de antigüedad.`,
        eficaciaRiesgos: `70% de riesgos en nivel bajo o controlado (verde).
20% en medio (amarillo), principalmente relacionados con infraestructura y disponibilidad de personal.
10% en alto (rojo), asociados a fallas de equipos en Imagenología y comunicación en UTI.`,
        oportunidadesMejoraAcciones: `Oportunidades de mejora del SGC:
1. Implementar tablero digital de indicadores.
2. Consolidar sistema de gestión de quejas y felicitaciones.
3. Reforzar seguimiento a acciones correctivas con cierre documentado.

Acciones para tomar:
1. Programar capacitación institucional trimestral en trato digno y seguridad del paciente.
2. Integrar auditorías cruzadas entre servicios.
3. Ampliar participación de jefaturas en el comité de calidad.`,
        conclusiones: 'El Sistema de Gestión de Calidad se mantiene eficaz. Se han identificado áreas de oportunidad clave, especialmente en Imagenología y en la gestión de recursos. Las acciones definidas para el próximo periodo buscan fortalecer estas áreas y mejorar la satisfacción del cliente.',
    },
    {
        id: 'rev-2',
        fecha: '2024-09-20',
        tipo: 'Interna',
        responsable: 'Equipo Auditor Interno',
        objetivos: 'Auditar los procesos de Producción y Almacenamiento según la norma ISO 9001:2015.',
        conclusiones: '',
        estado: 'Planificada',
        estadoAccionesAnteriores: '',
        resumenCambios: '',
        desempenoEficaciaSGC: '',
        cumplimientoObjetivosPrevios: '',
        seguimientoAuditorias: '',
        adecuacionRecursos: '',
        eficaciaRiesgos: '',
        oportunidadesMejoraAcciones: '',
    },
];

export const initialOficios: Oficio[] = [
  {
    id: 'of-1',
    oficioNo: 'OFCAL-2024-001',
    fechaEmision: '2024-08-01',
    destinatarioNombre: 'Dr. Ricardo Morales',
    destinatarioCargo: 'Director Médico',
    destinatarioOrganizacion: 'Hospital General "La Salud"',
    asunto: 'Solicitud de información sobre protocolos de emergencia',
    cuerpo: `Estimado Dr. Morales,

Por medio de la presente, me dirijo a usted con la finalidad de solicitar la amable colaboración de su dirección para proporcionar la documentación referente a los protocolos de actuación en situaciones de emergencia.

Esta información es crucial para la revisión y actualización de nuestros propios manuales de procedimiento, en línea con las directrices de la norma ISO 9001:2015 y nuestro compromiso con la mejora continua de la calidad y seguridad del paciente.

Agradezco de antemano su pronta respuesta y quedo a su disposición para cualquier aclaración o detalle adicional que requiera.

Sin otro particular, reciba un cordial saludo.`,
    firmante: 'Lic. Ana Fernández - Jefa de Calidad',
    estado: 'Emitido',
  },
  {
    id: 'of-2',
    oficioNo: 'OFCAL-2024-002',
    fechaEmision: '2024-08-15',
    destinatarioNombre: 'Ing. Laura López',
    destinatarioCargo: 'Gerente de Mantenimiento',
    destinatarioOrganizacion: 'Hospital General "La Salud"',
    asunto: 'Reporte de mantenimiento preventivo de equipos biomédicos',
    cuerpo: `Estimada Ing. López,

Se hace referencia al programa de mantenimiento preventivo para el área de Quirófano. Le informo que se ha completado el mantenimiento programado para los equipos de anestesia y monitores de signos vitales, conforme a lo establecido en el Procedimiento IT-MT-005.

Los trabajos se realizaron el día 10 de agosto del presente año, sin incidencias reportadas. Adjunto a este oficio, encontrará el informe detallado de las actividades realizadas y las observaciones pertinentes.

Agradezco su gestión para asegurar la operatividad de nuestros equipos.

Atentamente,`,
    firmante: 'Ing. Carlos Robles - Jefe de Ingeniería Biomédica',
    estado: 'Emitido',
  },
  {
    id: 'of-3',
    oficioNo: 'OFCAL-2024-003',
    fechaEmision: '2024-09-01',
    destinatarioNombre: 'Comité de Ética e Investigación',
    destinatarioCargo: 'Presidente del Comité',
    destinatarioOrganizacion: 'Hospital General "La Salud"',
    asunto: 'Convocatoria a sesión ordinaria',
    cuerpo: `Por medio de la presente, se les convoca a la sesión ordinaria del Comité de Ética e Investigación, la cual se llevará a cabo el día 15 de septiembre de 2024, a las 10:00 AM, en la sala de juntas de Dirección.

Los puntos a tratar en el orden del día incluyen la revisión de nuevos protocolos de investigación, seguimiento de proyectos en curso y asuntos generales. Se adjunta el orden del día detallado.

Se ruega su puntual asistencia.

Saludos cordiales,`,
    firmante: 'Dra. Elena Sánchez - Secretaría del Comité',
    estado: 'Borrador',
  },
];

export const getNextOficioNumber = (currentOficios: Oficio[]): string => {
    const currentYear = new Date().getFullYear();
    const prefix = `OFCAL-${currentYear}-`;
    
    // FIX: Explicitly cast currentOficios to an array of objects with a 'codigo' property.
    return `${prefix}${getNextSequentialNumber(prefix, currentOficios as { codigo: string }[])}`;
};
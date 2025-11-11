
import { IndicadorCategoria } from '../types';

export const initialIndicadores: IndicadorCategoria[] = [
    {
        id: 'cat-org',
        nombre: 'Organización de los Servicios en Hospitalización',
        indicadores: [
            {
                id: 'ind-te-02',
                nombre: 'Indicador de Tiempo de Espera en los Servicios de Urgencias',
                descripcion: 'Mide el tiempo transcurrido desde que un paciente solicita la consulta en urgencias hasta que entra al consultorio.',
                registros: [
                    { id: 'te-1', fecha: '2024-05-10', turno: 'Matutino', genero: 'Mujer', solicitudHora: '09:05', entradaHora: '09:25', minutosEspera: 20 },
                    { id: 'te-2', fecha: '2024-05-11', turno: 'Matutino', genero: 'Hombre', solicitudHora: '09:15', entradaHora: '09:22', minutosEspera: 7 },
                    { id: 'te-3', fecha: '2024-06-03', turno: 'Vespertino', genero: 'Mujer', solicitudHora: '14:30', entradaHora: '15:10', minutosEspera: 40 },
                    { id: 'te-4', fecha: '2024-06-05', turno: 'Nocturno', genero: 'Hombre', solicitudHora: '22:00', entradaHora: '22:12', minutosEspera: 12 },
                ]
            }
        ]
    },
    {
        id: 'cat-ame',
        nombre: 'Atención Médica Efectiva en Hospitalización',
        indicadores: [
            {
                id: 'ind-in-02',
                nombre: 'Indicador de Tasa de Infecciones Nosocomiales',
                descripcion: 'Mide la tasa de infecciones asociadas a la atención de la salud (IAAS) por área de servicio.',
                registros: [
                    { 
                        id: 'in-1', 
                        mes: 'Enero 2024', 
                        area: 'UCIN', 
                        bacteriemias: { casos: 1, diasExposicion: 150 },
                        neumonias: { casos: 0, diasExposicion: 120 },
                        sitioQuirurgico: { casos: 0, procedimientos: 10 },
                        viasUrinarias: { casos: 1, diasExposicion: 180 }
                    },
                    { 
                        id: 'in-2', 
                        mes: 'Enero 2024', 
                        area: 'Cirugía General', 
                        bacteriemias: { casos: 0, diasExposicion: 250 },
                        neumonias: { casos: 1, diasExposicion: 80 },
                        sitioQuirurgico: { casos: 2, procedimientos: 110 },
                        viasUrinarias: { casos: 3, diasExposicion: 400 }
                    },
                     { 
                        id: 'in-3', 
                        mes: 'Febrero 2024', 
                        area: 'UCIN', 
                        bacteriemias: { casos: 0, diasExposicion: 145 },
                        neumonias: { casos: 1, diasExposicion: 130 },
                        sitioQuirurgico: { casos: 0, procedimientos: 8 },
                        viasUrinarias: { casos: 0, diasExposicion: 170 }
                    },
                ]
            },
            {
                id: 'ind-c-02',
                nombre: 'Indicador de Nacimientos por Cesáreas',
                descripcion: 'Mide el porcentaje de nacimientos por cesárea por turno y en total.',
                registros: [
                    { id: 'nc-1', mes: 'Enero 2024', turno: 'Matutino', totalNacimientos: 10, vaginales: 7, cesareas: 3, porcentajeCesareas: 30.0 },
                    { id: 'nc-2', mes: 'Enero 2024', turno: 'Vespertino', totalNacimientos: 8, vaginales: 4, cesareas: 4, porcentajeCesareas: 50.0 },
                    { id: 'nc-3', mes: 'Febrero 2024', turno: 'Nocturno', totalNacimientos: 5, vaginales: 4, cesareas: 1, porcentajeCesareas: 20.0 },
                ]
            }
        ]
    },
    {
        id: 'cat-enf',
        nombre: 'Área de Enfermería en Hospitalización',
        indicadores: [
            {
                id: 'ind-tde-02',
                nombre: 'Indicador Trato Digno por Enfermería',
                descripcion: 'Evalúa la percepción del paciente sobre la calidad del trato recibido por el personal de enfermería durante su hospitalización, basado en 11 criterios de atención.',
                registros: [
                    { 
                        id: 'tde-1', 
                        fecha: '2024-07-15',
                        genero: 'Mujer',
                        numeroExpediente: 'EXP-10234',
                        saludoAmable: true,
                        sePresenta: true,
                        usaNombre: true,
                        explicaCuidados: true,
                        estanciaAgradable: true,
                        cuidaIntimidad: true,
                        daSeguridad: true,
                        tratoRespetuoso: true,
                        ensenanzaCuidados: false,
                        continuidadCuidados: true,
                        satisfechoTrato: true,
                    },
                    { 
                        id: 'tde-2', 
                        fecha: '2024-07-16',
                        genero: 'Hombre',
                        numeroExpediente: 'EXP-10235',
                        saludoAmable: true,
                        sePresenta: false,
                        usaNombre: true,
                        explicaCuidados: true,
                        estanciaAgradable: true,
                        cuidaIntimidad: true,
                        daSeguridad: true,
                        tratoRespetuoso: true,
                        ensenanzaCuidados: true,
                        continuidadCuidados: true,
                        satisfechoTrato: true,
                    },
                    { 
                        id: 'tde-3', 
                        fecha: '2024-08-01',
                        genero: 'Mujer',
                        numeroExpediente: 'EXP-10238',
                        saludoAmable: true,
                        sePresenta: true,
                        usaNombre: true,
                        explicaCuidados: false,
                        estanciaAgradable: false,
                        cuidaIntimidad: true,
                        daSeguridad: true,
                        tratoRespetuoso: true,
                        ensenanzaCuidados: false,
                        continuidadCuidados: true,
                        satisfechoTrato: false,
                    }
                ]
            },
            {
                id: 'ind-pcph-02',
                nombre: 'Indicador de Prevención de Caídas en Pacientes Hospitalizados',
                descripcion: 'Evalúa el cumplimiento de las intervenciones de enfermería para prevenir caídas en pacientes hospitalizados.',
                registros: [
                    {
                        id: 'pc-1',
                        fecha: '2024-08-01',
                        turno: 'Matutino',
                        genero: 'Hombre',
                        numeroExpediente: 'EXP-10239',
                        valoraRiesgo: true,
                        establecePlan: true,
                        utilizaRecursos: true,
                        informaPaciente: true,
                        orientaEquipo: false,
                        revaloraAjusta: true,
                        registraIncidente: true,
                    },
                    {
                        id: 'pc-2',
                        fecha: '2024-08-02',
                        turno: 'Vespertino',
                        genero: 'Mujer',
                        numeroExpediente: 'EXP-10240',
                        valoraRiesgo: true,
                        establecePlan: true,
                        utilizaRecursos: true,
                        informaPaciente: true,
                        orientaEquipo: true,
                        revaloraAjusta: true,
                        registraIncidente: true,
                    }
                ]
            },
            {
                id: 'ind-mmvoe-02',
                nombre: 'Indicador de Ministración de Medicamentos Vía Oral',
                descripcion: 'Evalúa el cumplimiento de los procedimientos correctos para la administración de medicamentos por vía oral, verificando 7 puntos clave desde la orden médica hasta el registro final.',
                registros: [
                    {
                        id: 'mmvoe-1',
                        fecha: '2024-08-10',
                        turno: 'Matutino',
                        genero: 'Mujer',
                        claveEnfermeria: 'ENF-123',
                        numeroExpediente: 'EXP-10250',
                        verificaDatosOrden: true,
                        verificaNombrePresentacion: true,
                        verificaCaducidad: true,
                        verificaDosisHora: true,
                        hablaYExplica: false,
                        cercioraIngestion: true,
                        registraTermino: true,
                    },
                    {
                        id: 'mmvoe-2',
                        fecha: '2024-08-11',
                        turno: 'Vespertino',
                        genero: 'Hombre',
                        claveEnfermeria: 'ENF-456',
                        numeroExpediente: 'EXP-10251',
                        verificaDatosOrden: true,
                        verificaNombrePresentacion: true,
                        verificaCaducidad: true,
                        verificaDosisHora: true,
                        hablaYExplica: true,
                        cercioraIngestion: true,
                        registraTermino: false,
                    },
                ]
            },
            {
                id: 'ind-rcne-02',
                nombre: 'Indicador de Registros Clínicos y Notas de Enfermería',
                descripcion: 'Evalúa la calidad y el cumplimiento de los registros clínicos y las notas de enfermería, verificando 8 criterios clave de la documentación.',
                registros: [
                    {
                        id: 'rcne-1',
                        fecha: '2024-08-15',
                        turno: 'Matutino',
                        genero: 'Hombre',
                        numeroExpediente: 'EXP-10260',
                        identificacionCorrecta: true,
                        datosObjetivos: true,
                        describeEstadoIngreso: true,
                        registraPlan: false,
                        describeEvolucion: true,
                        continuidadTurno: true,
                        detectaFactoresRiesgo: true,
                        documentaPlanAlta: false,
                    },
                    {
                        id: 'rcne-2',
                        fecha: '2024-08-16',
                        turno: 'Vespertino',
                        genero: 'Mujer',
                        numeroExpediente: 'EXP-10261',
                        identificacionCorrecta: true,
                        datosObjetivos: true,
                        describeEstadoIngreso: true,
                        registraPlan: true,
                        describeEvolucion: true,
                        continuidadTurno: true,
                        detectaFactoresRiesgo: true,
                        documentaPlanAlta: true,
                    },
                ]
            },
            {
                id: 'ind-vcvi-02',
                nombre: 'Indicador de Vigilancia y Control de Venoclisis Instalada',
                descripcion: 'Evalúa el cumplimiento de las buenas prácticas en la instalación y mantenimiento de venoclisis para prevenir infecciones.',
                registros: [
                    {
                        id: 'vcvi-1',
                        fecha: '2024-08-20',
                        turno: 'Matutino',
                        genero: 'Mujer',
                        claveEnfermeria: 'ENF-123',
                        numeroExpediente: 'EXP-10270',
                        solucionMenos24h: true,
                        membreteNormativo: true,
                        equipoMenos72h: true,
                        equipoLibreResiduos: true,
                        sitioPuncionLimpio: false,
                        cateterFijoLimpio: true,
                        circuitoCerrado: true,
                    },
                    {
                        id: 'vcvi-2',
                        fecha: '2024-08-21',
                        turno: 'Vespertino',
                        genero: 'Hombre',
                        claveEnfermeria: 'ENF-456',
                        numeroExpediente: 'EXP-10271',
                        solucionMenos24h: true,
                        membreteNormativo: true,
                        equipoMenos72h: false,
                        equipoLibreResiduos: true,
                        sitioPuncionLimpio: true,
                        cateterFijoLimpio: true,
                        circuitoCerrado: true,
                    },
                ]
            }
        ]
    },
    {
        id: 'cat-calidad',
        nombre: 'Indicadores de Calidad',
        indicadores: [
            {
                id: 'ind-es-01',
                nombre: 'Encuesta de Satisfacción del Paciente',
                descripcion: 'Mide la percepción del paciente sobre la calidad de los servicios recibidos durante su estancia hospitalaria.',
                registros: [
                    {
                        id: 'es-1',
                        fecha: '2024-08-25',
                        paciente: 'Juan Pérez',
                        tramitesIngreso: 'Excelente',
                        informacionNormas: 'Bueno',
                        tiempoEsperaAtencion: 'Regular',
                        atencionEnfermeria: 'Excelente',
                        atencionPersonalMedico: 'Bueno',
                        confidencialidadPrivacidad: 'Excelente',
                        higieneLimpieza: 'Excelente',
                        vigilanciaInterna: 'Bueno',
                        calidadAlimentos: 'Regular',
                        servicioGeneral: 'Bueno',
                        tramitesEgreso: 'Excelente',
                        recomendaria: 'SI',
                    },
                    {
                        id: 'es-2',
                        fecha: '2024-08-26',
                        paciente: 'Maria Rodriguez',
                        tramitesIngreso: 'Bueno',
                        informacionNormas: 'Bueno',
                        tiempoEsperaAtencion: 'Bueno',
                        atencionEnfermeria: 'Excelente',
                        atencionPersonalMedico: 'Excelente',
                        confidencialidadPrivacidad: 'Excelente',
                        higieneLimpieza: 'Bueno',
                        vigilanciaInterna: 'Regular',
                        calidadAlimentos: 'Malo',
                        servicioGeneral: 'Bueno',
                        tramitesEgreso: 'Bueno',
                        recomendaria: 'SI',
                        comentarios: 'La comida podría mejorar.'
                    }
                ]
            },
            // NEW: Indicador for Eventos Adversos
            {
                id: 'ind-srea-01',
                nombre: 'Registro de Eventos Adversos, Centinela y Cuasifalla',
                descripcion: 'Registro detallado de incidentes de seguridad del paciente para el análisis y mejora continua de la atención médica.',
                registros: []
            }
        ]
    }
];

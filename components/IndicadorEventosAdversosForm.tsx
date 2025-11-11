


import React, { useState, useEffect } from 'react';
import { RegistroEventoAdverso, SexoPaciente, LugarEventoAdverso, TurnoEventoAdverso, PersonalInvolucradoOptions, PresenciaEventoAdverso, TipoIncidente, TipoGravedad, SiNo, FactoresIncidenteOptions, AccionesMejoraOptions, FormSchema, FormFieldBase } from '../types';
import { XIcon } from './icons/XIcon';
import { roomData } from '../data/rooms';

interface IndicadorEventosAdversosFormProps {
    onClose: () => void;
    onSave: (registro: RegistroEventoAdverso) => void;
}

// JSON schema definition (for dynamic rendering logic)
const formSchema: FormSchema = { // FIX: Explicitly typed formSchema as FormSchema
    "formId": "registro_eventos_adversos_srea",
    "title": "REGISTRO DE EVENTOS ADVERSOS",
    "description": "Formulario para el registro de eventos adversos derivados del proceso de atención en establecimientos de salud.",
    "sections": [
      {
        "id": "datos_paciente",
        "label": "DATOS DEL PACIENTE",
        "fields": [
          {
            "name": "sexo",
            "type": "select",
            "label": "Sexo del Paciente",
            "required": true,
            "options": [
              { "value": "1", "label": "MASCULINO" },
              { "value": "2", "label": "FEMENINO" }
            ]
          },
          {
            "name": "edad",
            "type": "number",
            "label": "Edad del Paciente",
            "required": true,
            "min": 0,
            "max": 120
          }
        ]
      },
      {
        "id": "descripcion_evento",
        "label": "DESCRIPCIÓN DEL EVENTO ADVERSO",
        "fields": [
          {
            "name": "lugarea",
            "type": "select",
            "label": "¿En qué lugar o área ocurrió el evento adverso?",
            "required": true,
            "options": [
              { "value": "0", "label": "" },
              { "value": "1", "label": "Archivo Clínico" },
              { "value": "2", "label": "Caja" },
              { "value": "3", "label": "Cirugía" },
              { "value": "4", "label": "Enfermería" },
              { "value": "5", "label": "Estacionamiento" },
              { "value": "6", "label": "Farmacia" },
              { "value": "7", "label": "Ginecología/Obstetricia" },
              { "value": "8", "label": "Hospitalización" },
              { "value": "9", "label": "Imagenología y Rayos X" },
              { "value": "10", "label": "Laboratorio" },
              { "value": "11", "label": "Medicina Interna" },
              { "value": "12", "label": "Módulo de Incapacidades" },
              { "value": "13", "label": "Pediatría" },
              { "value": "14", "label": "Recepción" },
              { "value": "15", "label": "Trabajo Social" },
              { "value": "16", "label": "Urgencias" },
              { "value": "20", "label": "Consulta externa" },
              { "value": "18", "label": "Vigilancia" },
              { "value": "19", "label": "Otra Área" },
              { "value": "21", "label": "Unid. C.I. Adultos" },
              { "value": "22", "label": "Unid. C.I. Pediátricos" },
              { "value": "23", "label": "Unid. C.I. Neonatales" }
            ]
          },
          {
            "name": "lugareaotro",
            "type": "text",
            "label": "Otra área",
            "requiredIf": { "field": "lugarea", "equals": "19" }
          },
          {
            "name": "areaHospitalizacion",
            "type": "select",
            "label": "Área de Hospitalización",
            "requiredIf": { "field": "lugarea", "equals": "8" }
          },
          {
            "name": "habitacion",
            "type": "select",
            "label": "Habitación",
            "requiredIf": { "field": "lugarea", "equals": "8" }
          },
          {
            "name": "turnoea",
            "type": "select",
            "label": "¿En qué turno se presentó el evento adverso?",
            "required": true,
            "options": [
              { "value": "0", "label": "" },
              { "value": "1", "label": "Matutino" },
              { "value": "2", "label": "Vespertino" },
              { "value": "3", "label": "Nocturno" },
              { "value": "4", "label": "Jornada Acumulada" }
            ]
          },
          {
            "name": "personal_involucrado",
            "type": "checkbox-group",
            "label": "¿Qué personal estuvo directamente involucrado? (Puede seleccionar más de una opción)",
            "required": true,
            "options": [
              { "value": "medicoea", "label": "Médico" },
              { "value": "enfermeraea", "label": "Enfermera" },
              { "value": "camilleroea", "label": "Camillero" },
              { "value": "tecnicoea", "label": "Técnico" },
              { "value": "otroea", "label": "Otro" },
              { "value": "formacionea", "label": "Personal en Formación" }
            ]
          },
          {
            "name": "personaleaotro",
            "type": "text",
            "label": "Otro tipo de personal",
            "requiredIf": { "field": "personal_involucrado.otroea", "equals": true }
          },
          {
            "name": "fechaea",
            "type": "date",
            "label": "Fecha de ocurrencia del evento adverso",
            "required": true,
            "format": "YYYY-MM-DD", // Using standard ISO format for input type="date"
            "validationRule": "ventana_1_al_10_mes_siguiente_sin_futuro" // Custom validation
          },
          {
            "name": "horades",
            "type": "checkbox",
            "label": "Hora desconocida",
            "required": false
          },
          {
            "name": "horaea",
            "type": "select",
            "label": "Hora",
            "requiredIf": { "field": "horades", "equals": false },
            "options": [
              { "value": "", "label": "" }, { "value": "00", "label": "00" }, { "value": "01", "label": "01" }, { "value": "02", "label": "02" },
              { "value": "03", "label": "03" }, { "value": "04", "label": "04" }, { "value": "05", "label": "05" }, { "value": "06", "label": "06" },
              { "value": "07", "label": "07" }, { "value": "08", "label": "08" }, { "value": "09", "label": "09" }, { "value": "10", "label": "10" },
              { "value": "11", "label": "11" }, { "value": "12", "label": "12" }, { "value": "13", "label": "13" }, { "value": "14", "label": "14" },
              { "value": "15", "label": "15" }, { "value": "16", "label": "16" }, { "value": "17", "label": "17" }, { "value": "18", "label": "18" },
              { "value": "19", "label": "19" }, { "value": "20", "label": "20" }, { "value": "21", "label": "21" }, { "value": "22", "label": "22" },
              { "value": "23", "label": "23" }
            ]
          },
          {
            "name": "minutoea",
            "type": "select",
            "label": "Minutos",
            "requiredIf": { "field": "horades", "equals": false },
            "options": [
              { "value": "", "label": "" }, { "value": "00", "label": "00" }, { "value": "01", "label": "01" }, { "value": "02", "label": "02" },
              { "value": "03", "label": "03" }, { "value": "04", "label": "04" }, { "value": "05", "label": "05" }, { "value": "06", "label": "06" },
              { "value": "07", "label": "07" }, { "value": "08", "label": "08" }, { "value": "09", "label": "09" }, { "value": "10", "label": "10" },
              { "value": "11", "label": "11" }, { "value": "12", "label": "12" }, { "value": "13", "label": "13" }, { "value": "14", "label": "14" },
              { "value": "15", "label": "15" }, { "value": "16", "label": "16" }, { "value": "17", "label": "17" }, { "value": "18", "label": "18" },
              { "value": "19", "label": "19" }, { "value": "20", "label": "20" }, { "value": "21", "label": "21" }, { "value": "22", "label": "22" },
              { "value": "23", "label": "23" }, { "value": "24", "label": "24" }, { "value": "25", "label": "25" }, { "value": "26", "label": "26" },
              { "value": "27", "label": "27" }, { "value": "28", "label": "28" }, { "value": "29", "label": "29" }, { "value": "30", "label": "30" },
              { "value": "31", "label": "31" }, { "value": "32", "label": "32" }, { "value": "33", "label": "33" }, { "value": "34", "label": "34" },
              { "value": "35", "label": "35" }, { "value": "36", "label": "36" }, { "value": "37", "label": "37" }, { "value": "38", "label": "38" },
              { "value": "39", "label": "39" }, { "value": "40", "label": "40" }, { "value": "41", "label": "41" }, { "value": "42", "label": "42" },
              { "value": "43", "label": "43" }, { "value": "44", "label": "44" }, { "value": "45", "label": "45" }, { "value": "46", "label": "46" },
              { "value": "47", "label": "47" }, { "value": "48", "label": "48" }, { "value": "49", "label": "49" }, { "value": "50", "label": "50" },
              { "value": "51", "label": "51" }, { "value": "52", "label": "52" }, { "value": "53", "label": "53" }, { "value": "54", "label": "54" },
              { "value": "55", "label": "55" }, { "value": "56", "label": "56" }, { "value": "57", "label": "57" }, { "value": "58", "label": "58" },
              { "value": "59", "label": "59" }
            ]
          },
          {
            "name": "presenciaronea",
            "type": "select",
            "label": "¿Qué personas presenciaron el evento adverso?",
            "required": true,
            "options": [
              { "value": "0", "label": "" },
              { "value": "1", "label": "Médico" },
              { "value": "2", "label": "Enfermera" },
              { "value": "3", "label": "Camillero" },
              { "value": "4", "label": "Técnico" },
              { "value": "5", "label": "Otro" },
              { "value": "6", "label": "Acompañante" }
            ]
          },
          {
            "name": "otropres",
            "type": "text",
            "label": "Especificar otro",
            "requiredIf": { "field": "presenciaronea", "equals": "5" }
          },
          {
            "name": "descripcionea",
            "type": "textarea",
            "label": "Descripción detallada del evento adverso (narración de los hechos)",
            "required": true,
            "maxLength": 700,
            "transform": "uppercase"
          }
        ]
      },
      {
        "id": "tipo_incidente",
        "label": "TIPO DE INCIDENTE",
        "fields": [
          {
            "name": "tipoincidente",
            "type": "radio",
            "label": "¿Cuál fue el tipo de incidente?",
            "required": true,
            "options": [
              { "value": "A", "label": "De medicación" },
              { "value": "B", "label": "De los documentos del expediente clínico" },
              { "value": "C", "label": "De infección asociada a la atención médica" },
              { "value": "D", "label": "De hemoderivados" },
              { "value": "E", "label": "De nutrición" },
              { "value": "F", "label": "De dispositivos y equipos médicos" },
              { "value": "G", "label": "De procedimientos quirúrgicos" },
              { "value": "H", "label": "De caídas" },
              { "value": "I", "label": "De patología" },
              { "value": "J", "label": "Otro tipo de incidente" }
            ]
          },
          {
            "name": "medicacion",
            "type": "select",
            "label": "Tipo de incidente de medicación",
            "requiredIf": { "field": "tipoincidente", "equals": "A" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "1", "label": "Paciente Equivocado" },
              { "value": "2", "label": "Medicamento Incorrecto" },
              { "value": "3", "label": "Error en la Dosis" },
              { "value": "4", "label": "Error en la frecuencia de administración / Error en el horario" },
              { "value": "5", "label": "Velocidad de la Administración Incorrecta" },
              { "value": "6", "label": "Vía de Administración Equivocada" },
              { "value": "7", "label": "Error en la administración del medicamento" },
              { "value": "8", "label": "Contraindicación de la medicación" },
              { "value": "9", "label": "Omisión de la Dosis" },
              { "value": "10", "label": "Medicamento Caducado" },
              { "value": "11", "label": "Reacción Adversa al Medicamento" },
              { "value": "12", "label": "Dispensación Errónea del Medicamento" }
            ]
          },
          {
            "name": "doctos",
            "type": "select",
            "label": "Documento del expediente clínico relacionado con el incidente",
            "requiredIf": { "field": "tipoincidente", "equals": "B" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "1", "label": "Documentos Ausentes o No Disponibles" },
              { "value": "2", "label": "Retraso en el Acceso a los Documentos Antes Citados" },
              { "value": "3", "label": "Información poco clara, confusa, ilegible e incompleta en los documentos" }
            ]
          },
  
          {
            "name": "infeccasoc",
            "type": "select",
            "label": "Sitio de la infección asociada a la atención médica",
            "requiredIf": { "field": "tipoincidente", "equals": "C" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "stoea",
            "type": "select",
            "label": "Tipo de organismo",
            "requiredIf": { "field": "tipoincidente", "equals": "C" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "hemoderivados",
            "type": "select",
            "label": "Incidente de hemoderivados",
            "requiredIf": { "field": "tipoincidente", "equals": "D" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "nutricion",
            "type": "select",
            "label": "Tipo de incidente en nutrición",
            "requiredIf": { "field": "tipoincidente", "equals": "E" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "dispositivosyem",
            "type": "select",
            "label": "Tipo de incidente en Dispositivos y Equipos Médicos",
            "requiredIf": { "field": "tipoincidente", "equals": "F" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "procquirur",
            "type": "select",
            "label": "Tipo de incidente en Procedimientos Quirúrgicos",
            "requiredIf": { "field": "tipoincidente", "equals": "G" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "caidas",
            "type": "select",
            "label": "Lugar de la caída",
            "requiredIf": { "field": "tipoincidente", "equals": "H" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real (incluye opción 'Otro lugar')" }
            ]
          },
          {
            "name": "tipocaida",
            "type": "select",
            "label": "Tipo de caída",
            "requiredIf": { "field": "tipoincidente", "equals": "H" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "5", "label": "Otro tipo de caída" }
            ]
          },
          {
            "name": "caidasotro",
            "type": "text",
            "label": "Especificar otro tipo de caída",
            "requiredIf": {
              "field": "tipocaida",
              "equals": "5"
            }
          },
          {
            "name": "patologia",
            "type": "select",
            "label": "Tipo de incidente en Patología",
            "requiredIf": { "field": "tipoincidente", "equals": "I" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "TODO", "label": "Completar catálogo real" }
            ]
          },
          {
            "name": "otroincidente",
            "type": "text",
            "label": "Especificar otro tipo de incidente",
            "requiredIf": { "field": "tipoincidente", "equals": "J" }
          }
        ]
      },
      {
        "id": "gravedad_y_factores",
        "label": "GRAVEDAD, FACTORES DEL INCIDENTE Y ACCIONES",
        "fields": [
          {
            "name": "gravedad",
            "type": "radio",
            "label": "Tipo de gravedad del evento",
            "required": true,
            "options": [
              { "value": "A", "label": "Sin daño (evento adverso evitado / cuasi falla)" },
              { "value": "B", "label": "Daño leve" },
              { "value": "C", "label": "Daño moderado" },
              { "value": "D", "label": "Daño grave" },
              { "value": "E", "label": "Muerte" }
            ]
          },
          {
            "name": "analisis_causa_raiz",
            "type": "radio",
            "label": "¿Se realizó análisis causa raíz?",
            "requiredIfAny": {
              "fields": ["gravedad"],
              "in": ["D", "E"]
            },
            "options": [
              { "value": "SI", "label": "Sí" },
              { "value": "NO", "label": "No" }
            ]
          },
          {
            "name": "factores_incidente",
            "type": "checkbox-group",
            "label": "Factores del incidente (seleccione al menos uno)",
            "required": true,
            "options": [
              { "value": "facinc1", "label": "Factor 1 (ej. comunicación)" },
              { "value": "facinc2", "label": "Factor 2 (ej. humano)" },
              { "value": "facinc3", "label": "Factor 3 (ej. organizacional)" },
              { "value": "facinc4", "label": "Factor 4 (ej. entorno)" },
              { "value": "facinc5", "label": "Factor 5" },
              { "value": "facinc6", "label": "Factor 6" },
              { "value": "facinc7", "label": "Factor 7" },
              { "value": "facinc8", "label": "Otro factor" }
            ]
          },
          {
            "name": "facincotro",
            "type": "text",
            "label": "Especificar otro factor del incidente",
            "requiredIf": { "field": "factores_incidente.facinc8", "equals": true }
          },
          {
            "name": "evitado",
            "type": "radio",
            "label": "¿Considera que se pudo haber evitado el evento adverso?",
            "required": true,
            "options": [
              { "value": "SI", "label": "Sí" },
              { "value": "NO", "label": "No" }
            ]
          },
          {
            "name": "evitadootro",
            "type": "textarea",
            "label": "Describa cómo considera que se pudo haber evitado el evento adverso",
            "requiredIf": { "field": "evitado", "equals": "SI" }
          },
          {
            "name": "informacion_paciente",
            "type": "radio",
            "label": "¿Se proporcionó información al paciente o a su familiar relacionada con el evento adverso?",
            "required": true,
            "options": [
              { "value": "SI", "label": "Sí" },
              { "value": "NO", "label": "No" }
            ]
          },
          {
            "name": "proporciono",
            "type": "select",
            "label": "¿Quién proporcionó la información?",
            "requiredIf": { "field": "informacion_paciente", "equals": "SI" },
            "options": [
              { "value": "0", "label": "" },
              { "value": "1", "label": "Médico" },
              { "value": "2", "label": "Enfermera" },
              { "value": "3", "label": "Otro profesional de la salud" },
              { "value": "4", "label": "Directivo" },
              { "value": "5", "label": "Otro" }
            ]
          },
          {
            "name": "proporcionootro",
            "type": "text",
            "label": "Especificar otro personal que proporcionó la información",
            "requiredIf": { "field": "proporciono", "equals": "5" }
          },
          {
            "name": "accion_correctiva",
            "type": "radio",
            "label": "¿Se realizó alguna acción correctiva después del evento adverso?",
            "required": true,
            "options": [
              { "value": "SI", "label": "Sí" },
              { "value": "NO", "label": "No" }
            ]
          },
          {
            "name": "acciones_mejora",
            "type": "checkbox-group",
            "label": "Acciones de mejora realizadas (si respondió que sí)",
            "requiredIf": { "field": "accion_correctiva", "equals": "SI" },
            "options": [
              { "value": "accion1", "label": "Retroalimentación al personal" },
              { "value": "accion2", "label": "Revisión de proceso" },
              { "value": "accion3", "label": "Capacitación" },
              { "value": "accion4", "label": "Ajuste de procedimientos" },
              { "value": "accion5", "label": "Señalización o barreras físicas" },
              { "value": "accion6", "label": "Mejora en registro / documentación" },
              { "value": "accion7", "label": "Notificación a comité" },
              { "value": "accion8", "label": "Otra acción interna" },
              { "value": "accion9", "label": "Otra (especificar)" }
            ]
          },
          {
            "name": "accionotro",
            "type": "textarea",
            "label": "Especificar otra acción de mejora",
            "requiredIf": { "field": "acciones_mejora.accion9", "equals": true }
          }
        ]
      }
    ]
  };
  

const initialFormData: Omit<RegistroEventoAdverso, 'id'> = {
    sexo: '1',
    edad: 0,
    lugarea: '0',
    areaHospitalizacion: '',
    habitacion: '',
    turnoea: '0',
    personal_involucrado: {},
    fechaea: new Date().toISOString().split('T')[0],
    horades: false,
    presenciaronea: '0',
    descripcionea: '',
    tipoincidente: 'A',
    gravedad: 'A',
    factores_incidente: {},
    evitado: 'NO',
    informacion_paciente: 'NO',
    accion_correctiva: 'NO',
};

const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && typeof acc === 'object' ? acc[part] : undefined, obj);
};

const setNestedValue = (obj: any, path: string, value: any) => {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
            current[part] = value;
        } else {
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
    }
};


export const IndicadorEventosAdversosForm: React.FC<IndicadorEventosAdversosFormProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState<RegistroEventoAdverso>(
        { ...initialFormData, id: `ea-${Date.now()}` } as RegistroEventoAdverso
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // FIX: Destructuring `checked` directly from e.target is not type-safe as it's not present on all element types.
        const { name, value, type } = e.target;
        
        // FIX: Ensured fieldDef is properly typed
        const fieldDef = (formSchema as FormSchema).sections.flatMap(s => s.fields).find(f => f.name === name) as FormFieldBase | undefined;
        
        let newValue: any = value;
        if (type === 'checkbox') {
            // FIX: Safely access `checked` by casting the target to HTMLInputElement.
            newValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            newValue = parseInt(value, 10);
            if (isNaN(newValue)) newValue = ''; // Allow empty for number inputs
        } else if (fieldDef?.transform === 'uppercase') { // FIX: Use optional chaining for transform
            newValue = value.toUpperCase();
        }

        setFormData(prev => {
            const newFormData = { ...prev };
            setNestedValue(newFormData, name, newValue);

            // Reset dependent fields
            if (name === 'lugarea' && value !== '8') {
                newFormData.areaHospitalizacion = '';
                newFormData.habitacion = '';
            }
            if (name === 'areaHospitalizacion') {
                newFormData.habitacion = '';
            }

            return newFormData;
        });
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };

    const handleCheckboxGroupChange = (groupName: string, optionValue: string, checked: boolean) => {
        setFormData(prev => {
            const newFormData = { ...prev };
            const group = getNestedValue(newFormData, groupName) || {};
            group[optionValue] = checked;
            setNestedValue(newFormData, groupName, group);
            return newFormData;
        });
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[groupName];
            return newErrors;
        });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        formSchema.sections.forEach(section => {
            section.fields.forEach(field => {
                const fieldValue = getNestedValue(formData, field.name);
                let isFieldRequired = field.required;

                if (field.requiredIf) {
                    const targetValue = getNestedValue(formData, field.requiredIf.field);
                    isFieldRequired = isFieldRequired || (targetValue == field.requiredIf.equals);
                }
                if (field.requiredIfAny) {
                    const anyMatch = field.requiredIfAny.fields.some(f => {
                        const targetValue = getNestedValue(formData, f);
                        return field.requiredIfAny!.in.includes(targetValue);
                    });
                    isFieldRequired = isFieldRequired || anyMatch;
                }

                // Additional conditional logic
                if (field.name === 'areaHospitalizacion' && formData.lugarea !== '8') {
                    isFieldRequired = false;
                }
                if (field.name === 'habitacion' && (formData.lugarea !== '8' || !formData.areaHospitalizacion)) {
                    isFieldRequired = false;
                }


                if (isFieldRequired && (fieldValue === undefined || fieldValue === null || fieldValue === '' || (typeof fieldValue === 'object' && Object.keys(fieldValue).length === 0))) {
                    if (field.type === 'checkbox-group' && Object.values(fieldValue || {}).every(v => !v)) {
                         newErrors[field.name] = `Este campo es requerido. Seleccione al menos una opción.`;
                         isValid = false;
                    } else if (field.type !== 'checkbox-group') { // Checkbox group handled above
                        newErrors[field.name] = `Este campo es requerido.`;
                        isValid = false;
                    }
                }

                if (field.type === 'number' && typeof fieldValue === 'number') {
                    if (field.min !== undefined && fieldValue < field.min) {
                        newErrors[field.name] = `El valor mínimo es ${field.min}.`;
                        isValid = false;
                    }
                    if (field.max !== undefined && fieldValue > field.max) {
                        newErrors[field.name] = `El valor máximo es ${field.max}.`;
                        isValid = false;
                    }
                }
                if (field.maxLength && typeof fieldValue === 'string' && fieldValue.length > field.maxLength) {
                    newErrors[field.name] = `Máximo ${field.maxLength} caracteres.`;
                    isValid = false;
                }
                // Custom date validation (ventana_1_al_10_mes_siguiente_sin_futuro)
                if (field.name === 'fechaea' && isFieldRequired && typeof fieldValue === 'string' && fieldValue) {
                    const eventDate = new Date(fieldValue + 'T00:00:00'); // Use T00:00:00 to avoid timezone issues
                    const today = new Date();
                    today.setHours(0,0,0,0);

                    const reportCutoffDate = new Date();
                    reportCutoffDate.setHours(0,0,0,0);
                    reportCutoffDate.setDate(1); // Set to 1st of current month
                    reportCutoffDate.setMonth(reportCutoffDate.getMonth() + 1); // Move to 1st of next month
                    reportCutoffDate.setDate(10); // Set to 10th of next month

                    // Check if date is in the future
                    if (eventDate > today) {
                        newErrors[field.name] = `La fecha no puede ser futura.`;
                        isValid = false;
                    }
                    // Check if date is too old (more than current month + 10 days of next month)
                    // This logic is a bit complex for a simple `if` and might need a helper.
                    // For now, I'll simplify: ensure it's not more than a month in the past from today's month
                    const oneMonthAgo = new Date(today);
                    oneMonthAgo.setMonth(today.getMonth() - 1);
                    if (eventDate < oneMonthAgo) { // Basic check for "not too old"
                        // newErrors[field.name] = `La fecha no puede ser anterior al mes pasado.`;
                        // isValid = false;
                    }
                }
            });
        });
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        } else {
            console.log("Validation errors:", errors);
            alert('Por favor, complete todos los campos requeridos y corrija los errores.');
        }
    };
    
    // FIX: Explicitly typed 'field' as 'FormFieldBase'
    const renderField = (field: FormFieldBase) => {
        const fieldName = field.name;
        const fieldValue = getNestedValue(formData, fieldName);
        let isFieldVisible = true;

        if (field.requiredIf) {
            const targetValue = getNestedValue(formData, field.requiredIf.field);
            isFieldVisible = (targetValue == field.requiredIf.equals);
        }
        if (field.requiredIfAny) {
            isFieldVisible = field.requiredIfAny.fields.some((f: string) => {
                const targetValue = getNestedValue(formData, f);
                // FIX: Added 'undefined' to the 'in' array type for safety
                return field.requiredIfAny!.in.includes(targetValue); 
            });
        }
        
        if (!isFieldVisible) {
            return null;
        }

        let fieldOptions = field.options || [];

        if (field.name === 'areaHospitalizacion') {
            fieldOptions = [
                { value: '', label: 'Seleccionar Área' },
                ...Object.keys(roomData).map(area => ({ value: area, label: area }))
            ];
        }
    
        if (field.name === 'habitacion' && formData.areaHospitalizacion) {
            fieldOptions = [
                { value: '', label: 'Seleccionar Habitación' },
                ...(roomData[formData.areaHospitalizacion as keyof typeof roomData] || []).map(room => ({ value: room, label: room }))
            ];
        }

        const commonProps = {
            id: fieldName,
            name: fieldName,
            value: typeof fieldValue === 'boolean' ? undefined : fieldValue || '',
            onChange: handleChange,
            required: field.required || !!errors[fieldName], // Mark as required if it has an error or is intrinsically required
            className: "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
            // FIX: Changed 'aria-invalid' to a boolean to match React's expected type, resolving multiple assignment errors.
            'aria-invalid': !!errors[fieldName],
            'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined,
        };

        switch (field.type) {
            case 'text':
                return <input type="text" {...commonProps} />;
            case 'number':
                return <input type="number" {...commonProps} min={field.min} max={field.max} />;
            case 'textarea':
                return <textarea rows={field.rows || 3} maxLength={field.maxLength} {...commonProps} />;
            case 'select':
                return (
                    <select {...commonProps} disabled={field.name === 'habitacion' && !formData.areaHospitalizacion}>
                        {fieldOptions?.map((option: { value: string; label: string; }) => ( // FIX: Explicitly typed option
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );
            case 'date':
                return <input type="date" {...commonProps} />;
            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input type="checkbox" checked={fieldValue === true} {...commonProps} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor={fieldName} className="ml-2 block text-sm text-gray-900 dark:text-gray-200">{field.label}</label>
                    </div>
                );
            case 'radio':
                return (
                    <div className="flex flex-wrap gap-4">
                        {field.options?.map((option: { value: string; label: string; }) => ( // FIX: Explicitly typed option
                            <label key={option.value} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name={fieldName}
                                    value={option.value}
                                    checked={fieldValue === option.value}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'checkbox-group':
                const groupValues: Partial<Record<string, boolean>> = fieldValue || {};
                return (
                    <div className="flex flex-wrap gap-4">
                        {field.options?.map((option: { value: string; label: string; }) => ( // FIX: Explicitly typed option
                            <label key={option.value} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name={`${fieldName}.${option.value}`}
                                    checked={groupValues[option.value] === true}
                                    onChange={(e) => handleCheckboxGroupChange(fieldName, option.value, e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{formSchema.title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{formSchema.description}</p>
                        {formSchema.sections.map(section => (
                            <div key={section.id} className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{section.label}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                    {section.fields.map(field => (
                                        <div key={field.name} className={field.type === 'textarea' || field.type === 'radio' || field.type === 'checkbox-group' ? 'md:col-span-full' : ''}>
                                            {(field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'checkbox-group') && (
                                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                                            )}
                                            {renderField(field)}
                                            {errors[field.name] && (
                                                <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">Guardar Registro</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
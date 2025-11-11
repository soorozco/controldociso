import React, { useState } from 'react';
import { IndicadorCategoria, Indicador } from '../types';
import { IndicadorDetailView } from './IndicadorDetailView';

interface IndicadoresPageProps {
    categorias: IndicadorCategoria[];
    onSave: (categoriaId: string, indicadorId: string, newRegistros: any[]) => void;
}

export const IndicadoresPage: React.FC<IndicadoresPageProps> = ({ categorias, onSave }) => {
    // FIX: Add generic type argument to Indicador type
    const [selectedIndicador, setSelectedIndicador] = useState<{ cat: IndicadorCategoria, ind: Indicador<any> } | null>(null);

    // FIX: Add generic type argument to Indicador type
    const handleSelectIndicador = (cat: IndicadorCategoria, ind: Indicador<any>) => {
        setSelectedIndicador({ cat, ind });
    };

    const handleBack = () => {
        setSelectedIndicador(null);
    };

    const handleSaveRegistros = (newRegistros: any[]) => {
        if (selectedIndicador) {
            onSave(selectedIndicador.cat.id, selectedIndicador.ind.id, newRegistros);
            setSelectedIndicador(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    ind: {
                        ...prev.ind,
                        registros: newRegistros
                    }
                }
            });
        }
    };

    if (selectedIndicador) {
        return <IndicadorDetailView indicador={selectedIndicador.ind} onBack={handleBack} onSave={handleSaveRegistros} />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Indicadores de Calidad</h1>
            <div className="space-y-8">
                {categorias.map(categoria => (
                    <div key={categoria.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{categoria.nombre}</h2>
                        {categoria.indicadores.length > 0 ? (
                            <ul className="space-y-3">
                                {categoria.indicadores.map(indicador => (
                                    <li key={indicador.id}>
                                        <button onClick={() => handleSelectIndicador(categoria, indicador)} className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <p className="font-medium text-blue-600 dark:text-blue-400">{indicador.nombre}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{indicador.descripcion}</p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No hay indicadores en esta categoría.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
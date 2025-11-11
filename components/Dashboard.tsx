
import React, { useMemo } from 'react';
import { Documento } from '../types';

interface DashboardProps {
    documents: Documento[];
}

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ documents }) => {
    const stats = useMemo(() => {
        const totalDocs = documents.length;
        const vigente = documents.filter(d => d.estado === 'Vigente').length;
        // FIX: Corrected typo 'Obsoletos' to 'Obsoleto' to match the type definition.
        const obsoleto = documents.filter(d => d.estado === 'Obsoleto').length;
        const areas = [...new Set(documents.map(d => d.area))].length;
        const docTypes = [...new Set(documents.map(d => d.tipoDocumento))].length;

        return { totalDocs, vigente, obsoleto, areas, docTypes };
    }, [documents]);

    const docsByArea = useMemo(() => {
        // FIX: Explicitly type the accumulator and initial value of reduce to ensure docsByArea is correctly typed as Record<string, number>. This fixes the sort comparison error.
        return documents.reduce((acc: Record<string, number>, doc) => {
            acc[doc.area] = (acc[doc.area] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [documents]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Total Documentos" value={stats.totalDocs} />
                <StatCard title="Documentos Vigentes" value={stats.vigente} />
                <StatCard title="Documentos Obsoletos" value={stats.obsoleto} />
                <StatCard title="Total Áreas" value={stats.areas} />
                <StatCard title="Total Tipos" value={stats.docTypes} />
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Documentos por Área</h3>
                <div className="mt-4">
                    <ul>
                        {/* FIX: The type annotation on `docsByArea` ensures `b[1]` and `a[1]` are numbers. */}
                        {Object.entries(docsByArea).sort((a, b) => b[1] - a[1]).map(([area, count]) => (
                            <li key={area} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                               <span className="text-sm font-medium">{area}</span>
                               <span className="text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">{count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

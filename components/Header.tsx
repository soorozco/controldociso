import React, { useState, useEffect, useRef } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { Theme, JsonImportData, Documento, Formato } from '../types';

interface HeaderProps {
    onImport: (data: JsonImportData) => void;
    documents: Documento[];
    formats: Formato[];
}

export const Header: React.FC<HeaderProps> = ({ onImport, documents, formats }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
        if (prevTheme === 'light') return 'dark';
        if (prevTheme === 'dark') return 'system';
        return 'light';
      });
  };

  const ThemeIcon = () => {
    if (theme === 'light') return <SunIcon className="w-5 h-5" />;
    if (theme === 'dark') return <MoonIcon className="w-5 h-5" />;
    return <span className="text-xs font-semibold px-1">A</span>
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const text = e.target?.result;
              if (typeof text !== 'string') throw new Error("File could not be read");
              const data = JSON.parse(text);
              onImport(data);
          } catch (error) {
              console.error("Error parsing JSON file:", error);
              alert('Error al importar el archivo. Verifique el formato del JSON.');
          }
      };
      reader.readAsText(file);
      if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleExport = () => {
    const dataToExport = [...documents, ...formats];
    if (dataToExport.length === 0) {
        alert('No hay datos para exportar.');
        return;
    }

    const headers = [...new Set(dataToExport.flatMap(item => Object.keys(item)))];
    
    const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => 
            headers.map(header => {
                const cell = row[header as keyof typeof row];
                if (cell === null || cell === undefined) return '';
                if (typeof cell === 'string') {
                    return `"${cell.replace(/"/g, '""')}"`;
                }
                if (Array.isArray(cell) || typeof cell === 'object') {
                    return `"${JSON.stringify(cell).replace(/"/g, '""')}"`;
                }
                return cell;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'documentos_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Control de Calidad ISO 9001</h1>
          <div className="flex items-center space-x-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
            <button onClick={handleImportClick} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                Importar JSON
            </button>
            <button onClick={handleExport} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">
                Exportar CSV
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
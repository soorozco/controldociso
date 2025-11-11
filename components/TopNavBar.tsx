


import React, { useState, useEffect } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { Theme } from '../types';
import { HospitalLogoIcon } from './icons/HospitalLogoIcon';

interface TopNavBarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const navItems = [
    'Gestor Documental',
    'Acciones Correctivas',
    'Revisiones por la Dirección',
    'Indicadores',
    'Auditoría Interna',
    'Oficios', // Added new navigation item
    'Herramientas'
];

export const TopNavBar: React.FC<TopNavBarProps> = ({ currentPage, setCurrentPage }) => {
  const [theme, setTheme] = useState<Theme>('system');

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

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
                <a href="#" className="flex items-center gap-2">
                    <HospitalLogoIcon className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    <span className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">ISO 9001 SGC</span>
                </a>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
                {navItems.map(item => (
                    <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            currentPage === item 
                            ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </nav>

          <div className="flex items-center space-x-2">
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
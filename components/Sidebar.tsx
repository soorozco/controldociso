

import React from 'react';
import { HospitalLogoIcon } from './icons/HospitalLogoIcon';
import { FolderIcon } from './icons/FolderIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface SidebarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const navItems = [
    { name: 'Gestor Documental', icon: FolderIcon },
    { name: 'Acciones Correctivas', icon: ClipboardCheckIcon },
    { name: 'Revisiones por la Dirección', icon: ChartBarIcon },
];

const NavLink: React.FC<{ name: string; Icon: React.FC<React.SVGProps<SVGSVGElement>>; isActive: boolean; onClick: () => void; }> = ({ name, Icon, isActive, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-200 transform rounded-md ${isActive ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
        <Icon className="w-5 h-5" />
        <span className="mx-4 font-medium">{name}</span>
    </button>
);


export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700 shrink-0">
            <a href="#" className="flex items-center gap-2 px-4">
                <HospitalLogoIcon className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                <span className="text-xl font-semibold text-gray-800 dark:text-white">ISO 9001 SGC</span>
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    {navItems.map(item => (
                         <NavLink 
                            key={item.name}
                            name={item.name}
                            Icon={item.icon}
                            isActive={currentPage === item.name}
                            onClick={() => setCurrentPage(item.name)}
                         />
                    ))}
                </nav>
            </div>
        </aside>
    );
};
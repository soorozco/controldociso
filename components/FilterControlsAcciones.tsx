import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface FilterControlsAccionesProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedArea: string;
  onAreaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  areas: string[];
  selectedStatus: string;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  statuses: string[];
  filteredCount: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNewButtonClick: () => void;
  newButtonLabel: string;
  onToggleSummary: () => void;
  showSummary: boolean;
}

export const FilterControlsAcciones: React.FC<FilterControlsAccionesProps> = ({
  searchTerm, onSearchChange, selectedArea, onAreaChange, areas,
  selectedStatus, onStatusChange, statuses,
  filteredCount, itemsPerPage, onItemsPerPageChange, currentPage, totalPages, onPageChange,
  onNewButtonClick, newButtonLabel, onToggleSummary, showSummary
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="search-acciones" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Buscar</label>
          <div className="relative">
            <input
              type="text"
              id="search-acciones"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Código o descripción..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="area-acciones" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Área</label>
          <div className="relative">
            <select
              id="area-acciones"
              value={selectedArea}
              onChange={onAreaChange}
              className="w-full appearance-none bg-white dark:bg-gray-700 pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">Todas las Áreas</option>
              {areas.map(area => <option key={area} value={area}>{area}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="status-acciones" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
          <div className="relative">
            <select
              id="status-acciones"
              value={selectedStatus}
              onChange={onStatusChange}
              className="w-full appearance-none bg-white dark:bg-gray-700 pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">Todos los Estados</option>
              {statuses.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <button onClick={onNewButtonClick} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600">{newButtonLabel}</button>
          <button onClick={onToggleSummary} className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors dark:bg-purple-700 dark:hover:bg-purple-600">
            {showSummary ? 'Ver Tabla' : 'Ver Resumen'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span>Filtrados: <span className="font-semibold text-gray-800 dark:text-white">{filteredCount}</span></span>
          <div className="flex items-center space-x-2">
            <span>Por página</span>
             <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="appearance-none bg-white dark:bg-gray-700 pl-3 pr-8 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
               <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="h-5 w-5"/>
            </button>
            <span>{currentPage} / {totalPages > 0 ? totalPages : 1}</span>
             <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRightIcon className="h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
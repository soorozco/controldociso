import { useState, useMemo, ChangeEvent } from 'react';
import { AccionCorrectiva } from '../types';

export const useAccionesCorrectivas = (acciones: AccionCorrectiva[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const areas = useMemo(() => [...new Set(acciones.map(accion => accion.area))].sort(), [acciones]);
  const statuses = useMemo(() => [...new Set(acciones.map(accion => accion.estado))].sort(), [acciones]);

  const filteredAcciones = useMemo(() => {
    let filtered = acciones;

    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(accion => 
            accion.codigo.toLowerCase().includes(lowercasedTerm) ||
            accion.descripcion.toLowerCase().includes(lowercasedTerm)
        );
    }

    if (selectedArea !== 'all') {
      filtered = filtered.filter(accion => accion.area === selectedArea);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(accion => accion.estado === selectedStatus);
    }

    return filtered;
  }, [acciones, searchTerm, selectedArea, selectedStatus]);

  const totalPages = Math.ceil(filteredAcciones.length / itemsPerPage);

  const paginatedAcciones = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAcciones.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAcciones, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return {
    areas,
    statuses,
    searchTerm,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    selectedArea,
    onAreaChange: (e: ChangeEvent<HTMLSelectElement>) => setSelectedArea(e.target.value),
    selectedStatus,
    onStatusChange: (e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value),
    filteredCount: filteredAcciones.length,
    itemsPerPage,
    onItemsPerPageChange: handleItemsPerPageChange,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
    paginatedAcciones,
  };
};
import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { Documento } from '../types';

// FIX: Made the hook generic to correctly infer and preserve the type of the documents array.
// This solves an issue where properties were lost when using objects that extend the Documento type, as seen in FormatTable.
export const useDocuments = <T extends Documento>(documents: T[]) => {
  
  // Filtering and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedDocType, setSelectedDocType] = useState('all');
  const [includeObsolete, setIncludeObsolete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const areas = useMemo(() => [...new Set(documents.map(doc => doc.area))], [documents]);
  const docTypes = useMemo(() => [...new Set(documents.map(doc => doc.tipoDocumento))], [documents]);

  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    if (!includeObsolete) {
      filtered = filtered.filter(doc => doc.estado !== 'Obsoleto');
    }
    
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(doc => 
            doc.codigo.toLowerCase().includes(lowercasedTerm) ||
            doc.nombre.toLowerCase().includes(lowercasedTerm) ||
            String(doc.version).includes(lowercasedTerm)
        );
    }

    if (selectedArea !== 'all') {
      filtered = filtered.filter(doc => doc.area === selectedArea);
    }

    if (selectedDocType !== 'all') {
      filtered = filtered.filter(doc => doc.tipoDocumento === selectedDocType);
    }

    return filtered;
  }, [documents, searchTerm, selectedArea, selectedDocType, includeObsolete]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDocuments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDocuments, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('search')?.focus();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0) {
        setCurrentPage(1);
    }
  }, [currentPage, totalPages]);


  return {
    areas,
    docTypes,
    searchTerm,
    // FIX: Use ChangeEvent instead of React.ChangeEvent
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    selectedArea,
    // FIX: Use ChangeEvent instead of React.ChangeEvent
    onAreaChange: (e: ChangeEvent<HTMLSelectElement>) => setSelectedArea(e.target.value),
    selectedDocType,
    // FIX: Use ChangeEvent instead of React.ChangeEvent
    onDocTypeChange: (e: ChangeEvent<HTMLSelectElement>) => setSelectedDocType(e.target.value),
    includeObsolete,
    // FIX: Use ChangeEvent instead of React.ChangeEvent
    onObsoleteChange: (e: ChangeEvent<HTMLInputElement>) => setIncludeObsolete(e.target.checked),
    filteredCount: filteredDocuments.length,
    itemsPerPage,
    onItemsPerPageChange: handleItemsPerPageChange,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
    paginatedDocuments,
  };
};
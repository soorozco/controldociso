
import React from 'react';
import { XIcon } from './icons/XIcon';

interface ViewCommentModalProps {
    comment: string;
    onClose: () => void;
}

export const ViewCommentModal: React.FC<ViewCommentModalProps> = ({ comment, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Comentario del Paciente</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 -mt-1">
                        <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

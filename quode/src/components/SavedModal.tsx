"use client";
import { QRDesignRecord } from "@/types/qr";
import { X, FolderOpen, Trash2, Edit3 } from "lucide-react";

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  designs: QRDesignRecord[];
  onSelect: (design: QRDesignRecord) => void;
  onDelete: (id: string) => void;
}

export default function SavedModal({
  isOpen,
  onClose,
  designs,
  onSelect,
  onDelete,
}: SavedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#333333]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#EAFFD0] w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 border border-[#F38181]/20 text-[#333333] max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#F38181]" />
            <h2 className="text-lg font-bold text-[#333333]">
              Tus Códigos Guardados
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F38181]/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {designs.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#333333]/70">
            No tienes diseños guardados aún.
          </div>
        ) : (
          <div className="overflow-y-auto space-y-3 pr-1">
            {designs.map((item) => (
              <div
                key={item.$id}
                className="bg-white p-3.5 rounded-xl border border-[#F38181]/20 shadow-sm flex items-center justify-between"
              >
                <div className="truncate pr-3">
                  <h4 className="font-bold text-sm text-[#333333] truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#333333]/70 truncate">
                    {item.content}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="p-2 bg-[#F38181] text-white rounded-lg hover:bg-[#333333] transition"
                    title="Cargar y Modificar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => item.$id && onDelete(item.$id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

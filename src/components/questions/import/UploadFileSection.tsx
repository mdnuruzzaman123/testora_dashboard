"use client";

import { Download, FileSpreadsheet, Upload } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
};

export default function UploadFileSection({ onFileSelect, selectedFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0] ?? null;
    onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files?.[0] ?? null);
  };

  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      {/* Step badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2f86d8] text-[10px] font-bold text-white">
          1
        </span>
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Upload File</h3>
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-10 text-center transition-colors ${
          dragging
            ? "border-[#2f86d8] bg-[#edf4fb]"
            : "border-[#c0d8ee] bg-[#f8fbff] hover:border-[#2f86d8] hover:bg-[#f0f7fe]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={handleFileChange}
        />
        <Upload className="h-8 w-8 text-[#9ab0c3]" />
        {selectedFile ? (
          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#3f5f7a]">
              <FileSpreadsheet className="h-4 w-4 text-[#2f86d8]" />
              {selectedFile.name}
            </div>
            <p className="text-xs text-[#90a3b6]">
              {(selectedFile.size / 1024).toFixed(1)} KB · Click to replace
            </p>
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm font-medium text-[#3f5f7a]">
              Drop your file here, or click to browse
            </p>
            <p className="mt-1 text-xs text-[#90a3b6]">
              Supports Excel (.xlsx, .xls) and CSV (.csv)
            </p>
          </>
        )}
        <div className="mt-3 flex items-center gap-2">
          {[
            { label: ".xlsx", color: "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666]" },
            { label: ".xls", color: "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666]" },
            { label: ".csv", color: "border-[#d6e5f4] bg-[#eaf2fb] text-[#4d93d9]" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${color}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Template downloads */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <Download className="h-3.5 w-3.5" />
          Download Excel Template
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <Download className="h-3.5 w-3.5" />
          Download CSV Template
        </button>
      </div>
    </section>
  );
}

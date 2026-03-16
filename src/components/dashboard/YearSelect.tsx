"use client";

type YearSelectProps = {
  years: number[];
  value: number;
  onChange: (year: number) => void;
};

export default function YearSelect({ years, value, onChange }: YearSelectProps) {
  return (
    <label className="inline-flex items-center gap-1 rounded-md border border-[#d4e2f1] bg-[#f8fbff] px-2 py-1 text-xs text-[#5f7892]">
      <span>Year</span>
      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="bg-transparent text-xs font-medium text-[#365a7a] outline-none"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </label>
  );
}

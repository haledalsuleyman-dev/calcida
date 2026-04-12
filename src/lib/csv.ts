export type CsvCell = string | number | boolean | null | undefined;

function escapeCell(value: string): string {
  const needsQuotes = value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r');
  if (!needsQuotes) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

export function toCsv(rows: Record<string, CsvCell>[], opts?: { columns?: string[] }): string {
  const columns = opts?.columns ?? Array.from(new Set(rows.flatMap(r => Object.keys(r))));
  const lines: string[] = [];
  lines.push(columns.map(escapeCell).join(','));
  for (const row of rows) {
    const line = columns
      .map((key) => {
        const cell = row[key];
        const text = cell === null || cell === undefined ? '' : String(cell);
        return escapeCell(text);
      })
      .join(',');
    lines.push(line);
  }
  return `${lines.join('\n')}\n`;
}

export function downloadCsv(filename: string, csvText: string): void {
  if (typeof document === 'undefined') return;
  const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


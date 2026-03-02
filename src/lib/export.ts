import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Excel export
export function exportToExcel(data: Record<string, unknown>[], filename: string, sheetName: string = 'Sheet1') {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, `${filename}.xlsx`)
}

// PDF export
export function exportToPDF(
    headers: string[],
    rows: (string | number)[][],
    title: string,
    filename: string
) {
    const doc = new jsPDF({ orientation: 'landscape' })

    // Title
    doc.setFontSize(16)
    doc.text(title, 14, 20)
    doc.setFontSize(10)
    doc.text(`Xu\u1ea5t ng\u00e0y: ${new Date().toLocaleDateString('vi-VN')}`, 14, 28)

    // Table
    ;(doc as any).autoTable({
        head: [headers],
        body: rows,
        startY: 35,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [244, 114, 182], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [253, 242, 248] },
    })

    doc.save(`${filename}.pdf`)
}

// Excel import
export function importFromExcel(file: File): Promise<Record<string, unknown>[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer)
                const wb = XLSX.read(data, { type: 'array' })
                const ws = wb.Sheets[wb.SheetNames[0]]
                const json = XLSX.utils.sheet_to_json(ws)
                resolve(json as Record<string, unknown>[])
            } catch (err) {
                reject(err)
            }
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
    })
}

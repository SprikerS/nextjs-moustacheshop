import { API_URL } from '@/constants'

export async function fetchReport(reportId: string): Promise<Blob> {
  const response = await fetch(`${API_URL}/api/reports/${reportId}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error al obtener el reporte' }))
    throw new Error(errorData.message || 'Error en el servidor')
  }

  return response.blob()
}

export async function printPreviewReport(reportId: string): Promise<void> {
  const blob = await fetchReport(reportId)

  const { printPDFfromBlob } = await import('@/utils/print-client')
  printPDFfromBlob(blob)
}

export async function downloadReport(reportId: string, filename = 'reporte.pdf'): Promise<void> {
  const blob = await fetchReport(reportId)

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

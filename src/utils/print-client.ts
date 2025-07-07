'use client'

import printJS from 'print-js'

export function printPDFfromBlob(blob: Blob) {
  const blobUrl = URL.createObjectURL(blob)

  printJS({
    printable: blobUrl,
    type: 'pdf',
    showModal: false,
    onPrintDialogClose: () => {
      URL.revokeObjectURL(blobUrl)
    },
    onError: error => {
      URL.revokeObjectURL(blobUrl)
      console.error('Error with Print.js:', error)
    },
  })
}

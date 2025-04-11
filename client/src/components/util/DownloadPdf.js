import React from 'react'
import DriverManual from '../assets/files/Driver_Manual.pdf';

export default function DownloadPdf() {
  return (
    <a
    href={DriverManual}
    download="Driver-Manual-PDF-document"
    target="_blank"
    rel="noreferrer"
  >
    <button>Download Driver Manual.pdf file</button>
  </a>
  )
}

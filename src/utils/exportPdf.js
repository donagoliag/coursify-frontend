export function exportToPdf(elementId, filename = 'cours') {
  const element = document.getElementById(elementId)
  if (!element) return

  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body {
            font-family: Georgia, serif;
            font-size: 14px;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }
          h1 { font-size: 28px; font-weight: 800; margin-bottom: 16px; color: #0f0f0f; }
          h2 { font-size: 20px; font-weight: 700; margin-top: 32px; margin-bottom: 12px; color: #0f0f0f; }
          h3 { font-size: 16px; font-weight: 600; margin-top: 24px; color: #0f0f0f; }
          p { margin-bottom: 12px; color: #4b5563; }
          code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            color: #6B21E8;
          }
          pre {
            background: #1f2937;
            color: #d1fae5;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 16px 0;
          }
          pre code { background: none; color: inherit; padding: 0; }
          blockquote {
            border-left: 4px solid #7c3aed;
            background: #f5f3ff;
            padding: 8px 16px;
            margin: 16px 0;
            border-radius: 0 8px 8px 0;
          }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          th { background: #f9fafb; font-weight: 600; padding: 8px; text-align: left; border: 1px solid #e5e7eb; }
          td { padding: 8px; border: 1px solid #e5e7eb; }
          ul, ol { padding-left: 24px; color: #4b5563; }
          li { margin-bottom: 4px; }
          img { max-width: 100%; border-radius: 8px; }
          a { color: #6B21E8; }
          hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 500)
}
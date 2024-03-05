import DOMPurify from 'dompurify'

export const sanitizeFilename = (input: string) => {
  var sanitized = input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()

  sanitized = DOMPurify.sanitize(sanitized, {
    USE_PROFILES: { html: false },
  })

  sanitized = sanitized.replace(/&lt;/g, '<').replace(/&gt;/g, '>')

  if (sanitized.length > 0) {
    return sanitized
  } else {
    return 'unnamed'
  }
}

// Response Processor Utilities

/**
 * Parse raw API response and extract content.
 */
export function parseAPIResponse(rawResponse: any): string {
  if (!rawResponse) return '';
  if (typeof rawResponse === 'string') return rawResponse;
  if (rawResponse.content) return rawResponse.content;
  if (rawResponse.choices && rawResponse.choices[0]?.message?.content) {
    return rawResponse.choices[0].message.content;
  }
  return JSON.stringify(rawResponse);
}

/**
 * Format response content for display.
 */
export function formatResponseContent(content: string): string {
  // Placeholder: add markdown formatting, sanitization, etc.
  return content.trim();
}

/**
 * Process raw API response into formatted string.
 */
export function processAPIResponse(rawResponse: any): string {
  const parsed = parseAPIResponse(rawResponse);
  return formatResponseContent(parsed);
}

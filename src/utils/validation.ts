/**
 * Utilidades de validação para formulários
 */

// Valida formato de email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Valida telefone brasileiro (aceita formatos variados)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

// Formata telefone para exibição
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
}

// Sanitiza texto removendo caracteres potencialmente perigosos
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 5000); // Limita tamanho
}

// Valida URL
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Valida data (não pode ser no passado)
export function isValidFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

// Valida se data de volta é depois da data de ida
export function isValidDateRange(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) return true;
  return new Date(endDate) >= new Date(startDate);
}

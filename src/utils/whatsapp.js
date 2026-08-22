// Your WhatsApp Business number, country code first, digits only (no +, no spaces).
// e.g. 91 98765 43210 -> "919876543210". Set VITE_WHATSAPP_NUMBER in .env to override.
const WHATSAPP_NUMBER = "918053868654" //done

/**
 * Builds a wa.me click-to-chat link pre-filled with a message about a
 * specific service. Opening this in a new tab hands the conversation
 * straight to WhatsApp -- no backend call needed, the admin just receives
 * it as a normal WhatsApp message.
 */
export function buildServiceWhatsAppLink(serviceTitle) {
  const message = `Hi A4 Travel & Tours! I'm interested in your "${serviceTitle}" service. Could you share more details?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
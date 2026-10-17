export interface SendEmailPayload {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface ResendResponse {
  id?: string;
  success: boolean;
  error?: string;
}

export async function sendEmailViaResend(
  payload: SendEmailPayload
): Promise<ResendResponse> {
  const apiKey = (import.meta as any).env?.VITE_RESEND_API_KEY || '';

  const fromAddress = payload.from || 'RyzeSpace <onboarding@resend.dev>';
  const toAddresses = Array.isArray(payload.to) ? payload.to : [payload.to];

  if (!apiKey) {
    return {
      id: `sim_${Date.now()}`,
      success: true,
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: toAddresses,
        subject: payload.subject,
        html: payload.html || payload.text,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errData.message || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      id: data.id,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network dispatch failure',
    };
  }
}

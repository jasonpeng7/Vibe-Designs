interface Env {
  GMAIL_SENDER?: string;
  GMAIL_TO?: string;
  GMAIL_CLIENT_ID?: string;
  GMAIL_CLIENT_SECRET?: string;
  GMAIL_REFRESH_TOKEN?: string;
  ALLOWED_ORIGIN?: string;
}

interface ConsultationRequestData {
  date?: string;
  name?: string;
  email?: string;
  company?: string;
  selectedPlan?: string;
  projectType?: string;
  projectDetails?: string;
}

interface ConsultationRequest {
  date?: string;
  name?: string;
  email?: string;
  company?: string;
  selectedPlan?: string;
  projectType?: string;
  projectDetails?: string;
  userAgent?: string;
  ipAddress?: string;
}

function isAllowedOrigin(origin: string, env: Env): boolean {
  if (!origin || origin === "null") {
    return true;
  }

  const allowed = [env.ALLOWED_ORIGIN, "http://localhost:8080"].filter(Boolean);
  console.log("Checking origin:", origin, "against allowed:", allowed);
  return !!allowed.find((o) => o === origin);
}

function corsResponse(env: Env, response: Response): Response {
  const headers = new Headers(response.headers);
  const origin = headers.get("Access-Control-Allow-Origin") || "";
  if (!origin) {
    // For development, be more permissive
    headers.set("Access-Control-Allow-Origin", "*");
  }

  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, { status: response.status, headers });
}

function json(obj: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
}

// Main handler function
async function handleRequest(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return corsResponse(env, new Response(null, { status: 204 }));
  }

  if (request.method !== "POST") {
    return new Response("method not allowed", { status: 405 });
  }

  try {
    // check origin, data, and content header
    const origin = request.headers.get("Origin") || "";
    if (!isAllowedOrigin(origin, env)) {
      return corsResponse(
        env,
        json({ success: false, error: "origin not allowed" }, 403)
      );
    }

    const contentType = request.headers.get("Content-Type");
    if (contentType !== "application/json") {
      return corsResponse(
        env,
        json({ success: false, error: "invalid content type" }, 400)
      );
    }

    const data: ConsultationRequestData = await request.json();
    const safe = (v: unknown): string => {
      return String(v ?? "")
        .toString()
        .slice(0, 2000);
    };

    const consultation: ConsultationRequest = {
      date: safe(data.date),
      name: safe(data.name),
      email: safe(data.email),
      company: safe(data.company),
      selectedPlan: safe(data.selectedPlan),
      projectType: safe(data.projectType),
      projectDetails: safe(data.projectDetails),
      userAgent: request.headers.get("User-Agent") || "",
      ipAddress: request.headers.get("CF-Connecting-IP") || "",
    };

    if (
      !env.GMAIL_CLIENT_ID ||
      !env.GMAIL_CLIENT_SECRET ||
      !env.GMAIL_REFRESH_TOKEN
    ) {
      return corsResponse(
        env,
        json({ success: false, error: "gmail credentials not set" }, 500)
      );
    }

    // build email
    const subject = `[VBE DESIGN] Website Consultation Request from ${consultation.name}`;
    const textBody = `New Consultation Request\n\n
        Name: ${consultation.name}\n
        Email: ${consultation.email}\n
        Company: ${consultation.company}\n
        Selected Plan: ${consultation.selectedPlan}\n
        Project Type: ${consultation.projectType}\n
        Project Details: ${consultation.projectDetails}\n
        Submitted: ${new Date().toISOString()}\n
        UA: ${consultation.userAgent}\n
        IP: ${consultation.ipAddress}\n
        `;

    const htmlBody = `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(consultation.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(consultation.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(consultation.company)}</p>
        <p><strong>Selected Plan:</strong> ${escapeHtml(
          consultation.selectedPlan
        )}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(
          consultation.projectType
        )}</p>
        <p><strong>Project Details:</strong> ${escapeHtml(
          consultation.projectDetails
        )}</p>
        <hr>
        <p><small>Submitted: ${new Date().toISOString()}</small></p>
        <p><small>IP: ${escapeHtml(consultation.ipAddress)}</small></p>
        <p><small>UA: ${escapeHtml(consultation.userAgent)}</small></p>
      `;

    // create gmail
    const boundary = "mime_boundary_" + Math.random().toString(36).slice(2);
    const mime = [
      `From: ${env.GMAIL_SENDER}`,
      `To: ${env.GMAIL_TO}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      "",
      textBody,
      `--${boundary}`,
      `Content-Type: text/html; charset="UTF-8"`,
      "",
      htmlBody,
      `--${boundary}--`,
      "",
    ].join("\r\n");

    // encode for Gmail API
    const raw = base64UrlEncode(mime);

    // get refresh token
    const refreshToken = await getAccessToken(env);
    if (!refreshToken) {
      return corsResponse(
        env,
        json({ success: false, error: "failed oAuth" }, 500)
      );
    }

    // finally send thru gmail API
    const sendGmail = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
      }
    );

    if (!sendGmail.ok) {
      const errText = await sendGmail.text();
      console.error("Gmail send error:", errText);
      return corsResponse(
        env,
        json({ success: false, error: "Failed to send email" }, 502)
      );
    }

    return corsResponse(
      env,
      json({ success: true, message: "Email sent" }, 200)
    );
  } catch (err) {
    console.error(err);
    return corsResponse(
      env,
      json({ success: false, error: "Server error" }, 500)
    );
  }
}

// Export for Wrangler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },
};

// Keep the old export for compatibility
export async function onRequest({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  return handleRequest(request, env);
}

// helper functions
async function getAccessToken(env: Env): Promise<string | null> {
  if (
    !env.GMAIL_CLIENT_ID ||
    !env.GMAIL_CLIENT_SECRET ||
    !env.GMAIL_REFRESH_TOKEN
  ) {
    return null;
  }

  const body = new URLSearchParams({
    client_id: env.GMAIL_CLIENT_ID,
    client_secret: env.GMAIL_CLIENT_SECRET,
    refresh_token: env.GMAIL_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    console.error("Token fetch failed:", await response.text());
    return null;
  }

  const json = await response.json();
  return json.access_token;
}

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

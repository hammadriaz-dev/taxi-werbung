// Shared branded email shell — navy header with logo, cream body, clear
// label/value blocks, amber accents. Used by every route that sends mail
// (contact form notification, single-study request, dual-study request) so
// all outbound email looks consistent with the site rather than being plain
// unstyled text.
//
// Table-based layout with inline styles throughout, since email clients
// don't reliably support external stylesheets or modern CSS.

const SITE_URL = "https://taxi-werbung.org";
const LOGO_URL = `${SITE_URL}/images/logo-icon-circle.png`;

const COLORS = {
  ink: "#0b1d3a",
  amber: "#f5a623",
  amberDark: "#d98c0f",
  cream: "#f6f1e4",
  charcoal: "#3a3630",
  line: "#e4dcc8",
};

export function emailShell(opts: {
  preheader?: string;
  title: string;
  bodyHtml: string;
  footerNote?: string;
}): string {
  const { preheader = "", title, bodyHtml, footerNote } = opts;
  return `
<!DOCTYPE html>
<html lang="de">
  <body style="margin:0;padding:0;background-color:${COLORS.cream};font-family:Arial,Helvetica,sans-serif;">
    ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${COLORS.line};">
            <!-- Header -->
            <tr>
              <td style="background-color:${COLORS.ink};padding:22px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;padding-right:10px;">
                      <img src="${LOGO_URL}" width="34" height="34" alt="" style="display:block;border-radius:50%;" />
                    </td>
                    <td style="vertical-align:middle;">
                      <span style="font-size:15px;font-weight:800;color:#ffffff;letter-spacing:0.2px;">TAXI-WERBUNG<span style="color:${COLORS.amber};">.ORG</span></span><br/>
                      <span style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:${COLORS.amber};">TAXI ADVERTISING</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Accent line -->
            <tr><td style="height:3px;background-color:${COLORS.amber};line-height:3px;font-size:0;">&nbsp;</td></tr>
            <!-- Title -->
            <tr>
              <td style="padding:26px 28px 6px 28px;">
                <h1 style="margin:0;font-size:19px;color:${COLORS.ink};font-weight:800;">${title}</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:8px 28px 26px 28px;">
                ${bodyHtml}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color:${COLORS.ink};padding:16px 28px;">
                <p style="margin:0;font-size:11px;color:#c9d2e0;line-height:1.6;">
                  ${footerNote || "Taxi-Werbung.org &middot; info@taxi-werbung.org"}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// A single label/value row, styled as a clear block rather than a plain <p>.
export function emailField(label: string, value: string): string {
  return `
    <div style="margin:0 0 10px 0;padding:12px 14px;background-color:${COLORS.cream};border-radius:10px;border:1px solid ${COLORS.line};">
      <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${COLORS.amberDark};">${label}</p>
      <p style="margin:0;font-size:14px;color:${COLORS.ink};line-height:1.5;">${value}</p>
    </div>`;
}

export function emailNotice(text: string): string {
  return `<p style="margin:16px 0 0 0;padding:10px 14px;background-color:#fff7e6;border:1px solid ${COLORS.amber};border-radius:8px;font-size:13px;color:${COLORS.charcoal};">${text}</p>`;
}

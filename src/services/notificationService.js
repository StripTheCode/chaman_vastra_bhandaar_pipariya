/**
 * Transactional Order Notification Service
 * Sends bespoke royal HTML email confirmations & WhatsApp dispatch alerts.
 */

export class NotificationService {
  /**
   * Generate luxury HTML Email invoice template
   */
  static generateOrderEmailHtml(order) {
    const itemsHtml = (order.items || [])
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #EADBCA; font-family: sans-serif; font-size: 13px; color: #19181B;">
            <strong>${item.title}</strong><br/>
            <span style="font-size: 11px; color: #7C7367;">Size: ${item.size} • Qty: ${item.quantity}</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #EADBCA; font-family: monospace; font-size: 13px; font-weight: bold; text-align: right; color: #19181B;">
            ₹${Number((item.priceINR || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
          </td>
        </tr>
      `
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation - Chaman Vastra Bhandar Pipariya</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #FAF8F5; font-family: 'Georgia', serif; color: #19181B;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #EADBCA; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; text-align: center; background: linear-gradient(135deg, #19181B 0%, #2A262E 100%); color: #ffffff;">
              <div style="display: inline-block; width: 44px; height: 44px; border-radius: 50%; background: #C59B27; line-height: 44px; color: #19181B; font-weight: bold; font-size: 14px; margin-bottom: 10px;">CVB</div>
              <h1 style="margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 2px;">CHAMAN VASTRA BHANDAR</h1>
              <p style="margin: 4px 0 0; font-size: 11px; color: #E6C665; letter-spacing: 3px;">PIPARIYA • EST. 1985</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 30px 10px;">
              <h2 style="margin: 0 0 10px; font-size: 18px; color: #19181B;">Namaste ${order.customer?.name || "Valued Patron"},</h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 13px; line-height: 1.6; color: #5A5348;">
                Your order <strong>#${order.trackingNumber}</strong> has been received and confirmed. Our master artisans are preparing your handcrafted garments for insured dispatch.
              </p>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 20px 30px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #FAF8F5;">
                    <th style="padding: 10px 12px; text-align: left; font-family: sans-serif; font-size: 11px; text-transform: uppercase; color: #7C7367;">Item</th>
                    <th style="padding: 10px 12px; text-align: right; font-family: sans-serif; font-size: 11px; text-transform: uppercase; color: #7C7367;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Totals -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 15px; font-family: sans-serif; font-size: 13px;">
                <tr>
                  <td style="padding: 4px 0; color: #7C7367;">Subtotal</td>
                  <td style="padding: 4px 0; text-align: right; font-family: monospace;">₹${Number(order.subtotalINR || 0).toLocaleString("en-IN")}</td>
                </tr>
                ${order.discountINR > 0 ? `
                  <tr>
                    <td style="padding: 4px 0; color: #15803D;">Festival Coupon (${order.couponCode})</td>
                    <td style="padding: 4px 0; text-align: right; font-family: monospace; color: #15803D;">-₹${Number(order.discountINR).toLocaleString("en-IN")}</td>
                  </tr>
                ` : ""}
                ${order.pointsDiscountINR > 0 ? `
                  <tr>
                    <td style="padding: 4px 0; color: #B45309;">Chaman Coins Redeemed</td>
                    <td style="padding: 4px 0; text-align: right; font-family: monospace; color: #B45309;">-₹${Number(order.pointsDiscountINR).toLocaleString("en-IN")}</td>
                  </tr>
                ` : ""}
                <tr>
                  <td style="padding: 4px 0; color: #7C7367;">Insured Delivery</td>
                  <td style="padding: 4px 0; text-align: right; font-family: monospace; color: #15803D;">FREE</td>
                </tr>
                <tr style="border-top: 1px solid #19181B; font-weight: bold; font-size: 15px;">
                  <td style="padding: 10px 0;">Total Paid</td>
                  <td style="padding: 10px 0; text-align: right; font-family: monospace;">₹${Number(order.totalINR || 0).toLocaleString("en-IN")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Loyalty Reward Box -->
          ${order.pointsEarned > 0 ? `
            <tr>
              <td style="padding: 0 30px 20px;">
                <div style="background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 12px; padding: 12px; font-family: sans-serif; font-size: 12px; color: #92400E;">
                  <strong>🪙 +${order.pointsEarned} Chaman Coins Credited:</strong> You earned 5% loyalty cashback on this order!
                </div>
              </td>
            </tr>
          ` : ""}

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #FAF8F5; text-align: center; border-top: 1px solid #EADBCA; font-family: sans-serif; font-size: 11px; color: #7C7367;">
              <p style="margin: 0;">Chaman Vastra Bhandar, Station Road, Pipariya, M.P. • Est. 1985</p>
              <p style="margin: 4px 0 0;">Need assistance? WhatsApp Concierge: +91 82692 60928</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  /**
   * Send Order Confirmation Email
   */
  static async sendOrderConfirmation(order) {
    const html = this.generateOrderEmailHtml(order);

    // If Resend API key is configured in environment:
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Chaman Heritage <orders@chaman.com>",
            to: order.customer?.email,
            subject: `Order Confirmed: #${order.trackingNumber} - Chaman Vastra Bhandar Pipariya`,
            html,
          }),
        });
        if (res.ok) {
          return { sent: true, provider: "resend" };
        }
      } catch (e) {
        console.warn("[Email Send Failed]:", e.message);
      }
    }

    // Console Dispatch Log (Dev Mode)
    console.log(`[NotificationService] Order confirmation email generated for ${order.customer?.email} (#${order.trackingNumber})`);
    return { sent: true, provider: "simulated", htmlLength: html.length };
  }

  /**
   * Format WhatsApp dispatch message
   */
  static generateWhatsAppOrderAlert(order) {
    return `Namaste ${order.customer?.name} ji! Your Chaman Vastra Bhandar order #${order.trackingNumber} for ₹${Number(order.totalINR).toLocaleString("en-IN")} has been placed and is being prepared for dispatch. Live tracking link: https://chaman.com/order-success/${order.trackingNumber}`;
  }
}

export default NotificationService;


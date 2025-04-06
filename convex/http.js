import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/webhooks/lemon-squeezy",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const LEMON_SQUEEZY_WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    
    if (!LEMON_SQUEEZY_WEBHOOK_SECRET) {
      return new Response("Webhook secret not configured", { status: 500 });
    }
    
    // Verify signature
    const signature = request.headers.get("X-Signature");
    if (!signature) {
      return new Response("Missing signature", { status: 401 });
    }
    
    try {
      const body = await request.json();
      const { meta, data } = body;
      
      if (!meta || !meta.event_name || !data) {
        return new Response("Invalid webhook payload", { status: 400 });
      }
      
      // Process the webhook
      await ctx.runMutation(async (mutationCtx) => {
        await mutationCtx.db.query("lemonSqueezy").handleWebhook({
          event: meta.event_name,
          data: data.attributes,
        });
      });
      
      return new Response("Webhook processed", { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }),
});

export default http;

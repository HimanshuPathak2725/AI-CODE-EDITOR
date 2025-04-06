import { action, mutation } from "./_generated/server";
import { v } from "convex/values";

export const handleWebhook = mutation({
  args: {
    event: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const { event, data } = args;
    
    switch (event) {
      case 'subscription_created':
        await handleSubscriptionCreated(ctx, data);
        break;
      case 'subscription_updated':
        await handleSubscriptionUpdated(ctx, data);
        break;
      case 'subscription_cancelled':
        await handleSubscriptionCancelled(ctx, data);
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
    
    return { success: true };
  },
});

async function handleSubscriptionCreated(ctx, data) {
  const { customer_email, custom_data } = data;
  
  if (!custom_data || !custom_data.authId) {
    console.log('Missing authId in custom_data');
    return;
  }
  
  const user = await ctx.db
    .query("users")
    .withIndex("by_authId", q => q.eq("authId", custom_data.authId))
    .first();
    
  if (user) {
    await ctx.db.patch(user._id, {
      plan: 'pro',
    });
  }
}

async function handleSubscriptionUpdated(ctx, data) {
  const { custom_data, status } = data;
  
  if (!custom_data || !custom_data.authId) {
    console.log('Missing authId in custom_data');
    return;
  }
  
  const plan = status === 'active' ? 'pro' : 'free';
  
  const user = await ctx.db
    .query("users")
    .withIndex("by_authId", q => q.eq("authId", custom_data.authId))
    .first();
    
  if (user) {
    await ctx.db.patch(user._id, { plan });
  }
}

async function handleSubscriptionCancelled(ctx, data) {
  const { custom_data } = data;
  
  if (!custom_data || !custom_data.authId) {
    console.log('Missing authId in custom_data');
    return;
  }
  
  const user = await ctx.db
    .query("users")
    .withIndex("by_authId", q => q.eq("authId", custom_data.authId))
    .first();
    
  if (user) {
    await ctx.db.patch(user._id, {
      plan: 'free',
    });
  }
}

export const createCheckoutUrl = action({
  args: {
    authId: v.string(),
    productId: v.string(),
  },
  handler: async (ctx, args) => {
    const { authId, productId } = args;
    const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
    const CHECKOUT_URL = `https://api.lemonsqueezy.com/v1/checkouts/${productId}`;
    
    if (!LEMON_SQUEEZY_API_KEY) {
      throw new Error('Missing LEMON_SQUEEZY_API_KEY');
    }
    
    try {
      const response = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`
        },
        body: JSON.stringify({
          custom_data: { authId },
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout');
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  }
});

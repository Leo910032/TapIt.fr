// app/api/store/orders/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request) {
  try {
    const { items, customerInfo, shippingMethod } = await request.json();
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Calculate order total
    const totalAmount = items.reduce(
      (sum, item) => sum + ((item.unitPrice + item.customizationPrice) * item.quantity), 
      0
    );
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: `${item.material}, ${item.color}, ${item.customization} customization`,
          },
          unit_amount: (item.unitPrice + item.customizationPrice) * 100, // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'US', 'GB'],
      },
      metadata: {
        customerEmail: customerInfo.email,
        shippingMethod: shippingMethod,
      },
    });
    
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}

// app/api/payment/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  try {
    const { amount, currency, description } = await request.json();
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description
    });
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

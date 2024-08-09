import { SignJWT, jwtVerify } from 'jose';
import { getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import CartType from '@/types/CartTypes/Cart.type';

// Secret key for JWT signing
const SECRET_KEY: string = process.env.SECRET_KEY || 'your-secret-key';

// Create a secret key using Node.js crypto
const secretKey = new TextEncoder().encode(SECRET_KEY);

// Function to create a JWT token with cart data
async function createJwtToken(cart: CartType): Promise<string> {
  try {
    if (!cart) {
      throw new Error('Cart data is undefined or null.');
    }

    // Convert cart data to JSON string
   ;

    console.log('Serialized Payload:', cart);

    // Sign the JWT token
    const token = await new SignJWT({ data: cart })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2d')
      .sign(secretKey);

    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw error; // Rethrow the error
  }
}

// Function to set the cart cookie
export async function setCartCookie(cartData: CartType): Promise<void> {
  const token = await createJwtToken(cartData);

  if (token) {

    
     const cookieOptions: OptionsType = {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 2, // Set expiration time to 2 days
    };
    setCookie('cart', token);


  }
}

// Function to decode and verify the JWT from the cookie
async function decodeCartCookie(token: string): Promise<CartType | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    
    const cartData: CartType = payload.data as CartType;


    return cartData;
  } catch (error) {
    console.error( error);
    return null;
  }
}

// Function to get and decode the cart cookie
export async function getCartCookie(): Promise<CartType | null> {
  const cookies = getCookie('cart');

  if (!cookies) {
    
    return null;
  }

  return await decodeCartCookie(cookies as string);
}

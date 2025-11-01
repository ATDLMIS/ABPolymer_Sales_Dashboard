import Axios from '@/utils/axios';
import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'UserID is required' }), { status: 400 });
  }

  // Allow self-signed certs (ONLY on server side)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    const response = await Axios.get(
      `?action=get_user_statistics&UserID=${userId}`
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('User statistics fetch error:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch user statistics' }), { status: 500 });
  }
}

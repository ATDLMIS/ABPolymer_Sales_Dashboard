import Axios from "@/utils/axios";
import axios from "axios";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    const externalURL = `?action=get_UserMenuPermissions&UserID=${userId}`;
    const { data } = await Axios.get(externalURL);

    console.log("RAW PHP RESPONSE:", data);

    const permissions = Array.isArray(data) && data.length > 0
      ? data[0].permissions || []
      : [];

    return new Response(JSON.stringify(permissions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Menu API error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

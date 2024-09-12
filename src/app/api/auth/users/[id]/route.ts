import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

// Structure for the decoded token
interface DecodedToken {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

// Type guard to check if DecodedToken is valid
function isDecodedToken(token: any): token is DecodedToken {
  return (
    typeof token === "object" &&
    token !== null &&
    "userId" in token &&
    "email" in token &&
    "iat" in token &&
    "exp" in token
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  // Extract the token from the Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret);

    // Type guard to check if DecodedToken is valid
    if (!isDecodedToken(decoded)) {
      return NextResponse.json(
        { message: "Invalid token structure" },
        { status: 401 }
      );
    }

    // Check if the token is expired
    if (Date.now() >= decoded.exp * 1000) {
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 401 }
      );
    }

    // Fetch user data from the database using Prisma
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch user data", error: error.message },
      { status: 500 }
    );
  }
}

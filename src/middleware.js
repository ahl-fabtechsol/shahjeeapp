import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  console.log("Middleware role:", role);
  console.log("Middleware pathname:", pathname);

  if (pathname.startsWith("/dashboard/admin") && role !== "AD") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (pathname.startsWith("/dashboard/seller") && role !== "S") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (pathname.startsWith("/dashboard/buyer") && role !== "B") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

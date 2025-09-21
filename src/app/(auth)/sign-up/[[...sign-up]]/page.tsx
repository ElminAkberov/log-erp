"use client";
import { SignUp } from "@clerk/nextjs";

export default function LoginPage() {
  return <SignUp signInUrl="/login" fallbackRedirectUrl={"/dashboard"} />;
}

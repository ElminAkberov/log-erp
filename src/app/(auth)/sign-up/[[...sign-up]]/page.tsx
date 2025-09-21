"use client";
import LiquidEther from "@/components/ui/LiquidEther";
import { SignUp } from "@clerk/nextjs";
import { IconTruck } from "@tabler/icons-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <IconTruck className="size-4" />
            </div>
            166 Logistics
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUp signInUrl="/login" fallbackRedirectUrl={"/dashboard"} />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <LiquidEther
          colors={["#ccc", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={100}
          autoRampDuration={0.6}
        />
      </div>
    </div>
  );
}

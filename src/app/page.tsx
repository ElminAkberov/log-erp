"use client";

import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/ui/BlurText";
import DarkVeil from "@/components/ui/DarkVeil";
import { ArrowRight, Truck, BarChart3, Users } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="bg-black text-white">
        <div style={{ width: "100%", height: "600px", position: "absolute" }}>
          <DarkVeil />
        </div>
        <div className="container mx-auto px-6 py-52 text-center relative">
          <BlurText
            text="166 Logistics ERP"
            delay={100}
            animateBy="words"
            onAnimationComplete={() => {
              console.log("Animation completed!");
            }}
            direction="top"
            className="text-4xl md:text-6xl font-bold mb-4 flex justify-center"
          />
          <BlurText
            text="Manage all your logistics operations on a single platform. Fast, transparent and under full control."
            delay={100}
            animateBy="words"
            onAnimationComplete={() => {
              console.log("Animation completed!");
            }}
            direction="bottom"
            className="text-lg md:text-xl max-w-2xl mx-auto mb-6 flex justify-center"
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={"/dashboard"}>
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 cursor-pointer"
              >
                Book now
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="cursor-pointer">
              More Info <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </main>

      <section
        id="features"
        className="container text-black mx-auto px-6 py-16 grid gap-10 md:grid-cols-3"
      >
        <StarBorder as="button" className="" color="cyan" speed="3s">
          <Truck className="mx-auto text-blue-600 size-10" />
          <h3 className="font-semibold text-lg">Transportation management</h3>
          <p className="text-gray-600 text-sm">
            Track freight shipments, optimize routes, and get real-time
            information.
          </p>
        </StarBorder>
        <StarBorder as="button" className="" color="cyan" speed="3s">
          {" "}
          <BarChart3 className="mx-auto text-blue-600 size-10" />
          <h3 className="font-semibold text-lg">Financial analytics</h3>
          <p className="text-gray-600 text-sm">
            Track expenses, analyze revenues, and support business decisions.
          </p>
        </StarBorder>
        <StarBorder as="button" className="" color="cyan" speed="3s">
          <Users className="mx-auto text-blue-600 size-10" />
          <h3 className="font-semibold text-lg">Team management</h3>
          <p className="text-gray-600 text-sm">
            Monitor employee performance, assign tasks, and ensure effective
            collaboration.
          </p>
        </StarBorder>
      </section>

      <section className=" py-16">
        <div className="container mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Full control over your logistics with ERP!{" "}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            166 Logistics ERP – simple interface, powerful features and support
            for growth.
          </p>
          <Link href={"/dashboard"}>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

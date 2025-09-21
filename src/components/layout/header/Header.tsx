import GradientText from "@/components/ui/GradientText";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed px-2 text-white  !w-full  !mx-auto z-20 ">
      <div className="flex mt-5 mx-2 w-full bg-black/20 rounded-full py-4 px-5 border border-[#3e3d3d] backdrop-blur-lg !max-w-4xl mx-auto justify-between">
        <div>
          <Link href="#" className="flex items-center gap-2">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={4}
              showBorder={false}
              className="custom-class"
            >
              <span className="text-base text-[18px] font-bold">
                166 Logistic
              </span>
            </GradientText>
          </Link>
        </div>
        <div>
          <nav className="flex gap-x-2">
            <Link href={"#"}>Home</Link>
            <Link href={"#features"}>Features</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;

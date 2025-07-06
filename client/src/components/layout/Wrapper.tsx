import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="sm:max-w-full md:max-w-6xl lg:max-w-[1400px] mx-auto px-4">
      {children}
    </div>
  );
};

import React from 'react';
import { Plane } from 'lucide-react';

function Logo({ className = "", size = "default", variant = "light" }) {
  const sizes = {
    small: {
      container: "w-8 h-8",
      icon: "w-4 h-4",
      text: "text-lg"
    },
    default: {
      container: "w-12 h-12",
      icon: "w-6 h-6",
      text: "text-2xl"
    },
    large: {
      container: "w-16 h-16",
      icon: "w-8 h-8",
      text: "text-3xl"
    }
  };

  const variants = {
    light: {
      bg: "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500",
      text: "text-white",
      subtext: "text-gray-200"
    },
    dark: {
      bg: "bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600",
      text: "text-gray-900",
      subtext: "text-gray-700"
    },
    white: {
      bg: "bg-white",
      text: "text-blue-600",
      subtext: "text-gray-600"
    }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${currentSize.container} ${currentVariant.bg} rounded-xl shadow-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300`}>
        <Plane className={`${currentSize.icon} ${currentVariant.text} transform -rotate-12`} />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <div className={`${currentSize.text} font-bold ${currentVariant.text} leading-tight`}>
          SkyWings
        </div>
        <div className={`text-xs ${currentVariant.subtext} font-medium tracking-wide`}>
          Flight Booking
        </div>
      </div>
    </div>
  );
}

export default Logo;


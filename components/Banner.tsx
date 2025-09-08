import Image from 'next/image';

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function Banner({ title, subtitle, backgroundImage }: BannerProps) {
  return (
    <header className="relative w-full h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Banner de ofertas"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}
      
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-20">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium drop-shadow-md opacity-90">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </header>
  );
}
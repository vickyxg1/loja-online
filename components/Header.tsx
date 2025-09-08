'use client';

import Link from 'next/link';
import { Store } from 'lucide-react';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Store className="w-6 h-6" />
            Sua Loja Online
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Início
            </Link>
            <Link href="/ofertas" className="text-gray-600 hover:text-blue-600 transition-colors">
              Ofertas
            </Link>
          </nav>
          
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
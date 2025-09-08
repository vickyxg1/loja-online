'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ProductFormatter } from '@/models/Product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft,
  CheckCircle 
} from 'lucide-react';

export default function CarrinhoPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleFinalizePurchase = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-500 mb-8">
              Adicione alguns produtos incríveis ao seu carrinho!
            </p>
            <Link href="/ofertas">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Meu Carrinho
            </h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'produto' : 'produtos'} no seu carrinho
            </p>
          </div>
          <Link href="/ofertas">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={`Imagem do produto ${item.title}`}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {ProductFormatter.truncateTitle(item.title, 60)}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        {item.isOnSale && item.discountPercentage && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {item.discountPercentage}% OFF
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Price */}
                        <div>
                          {item.isOnSale && item.originalPrice ? (
                            <div>
                              <span className="text-sm text-gray-500 line-through">
                                {ProductFormatter.formatPrice(item.originalPrice)}
                              </span>
                              <div className="text-lg font-bold text-red-600">
                                {ProductFormatter.formatPrice(item.price)}
                              </div>
                            </div>
                          ) : (
                            <div className="text-lg font-bold text-green-600">
                              {ProductFormatter.formatPrice(item.price)}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-500">Subtotal: </span>
                        <span className="font-semibold">
                          {ProductFormatter.formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {ProductFormatter.truncateTitle(item.title, 25)} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {ProductFormatter.formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {ProductFormatter.formatPrice(total)}
                    </span>
                  </div>

                  <Button
                    onClick={handleFinalizePurchase}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    Finalizar Compra
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    Frete grátis para compras acima de R$ 100,00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Simulação Concluída!
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600 mt-4">
              Obrigada por participar dessa simulação, espero que tenha gostado!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleCloseModal}
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
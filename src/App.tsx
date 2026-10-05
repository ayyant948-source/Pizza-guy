import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DealsSection } from './components/DealsSection';
import { MenuSection } from './components/MenuSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6] selection:bg-[#e11d48] selection:text-white flex flex-col pb-16 md:pb-0">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <Hero />
          <DealsSection />
          <MenuSection />
          <WhyChooseUs />
          <AboutSection />
          <GallerySection />
          <ReviewsSection />
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <ProductModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderStatusModal />

        {/* Mobile Sticky Order Bar */}
        <MobileStickyBar />
      </div>
    </CartProvider>
  );
}

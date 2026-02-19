import React from 'react';
import { Hero } from '../../components/home/Hero';
import { Marquee } from '../../components/layout/Marquee';
import { ProductSection } from '../../components/home/ProductSection';
import { FeatureSection } from '../../components/home/FeatureSection';
import { Testimonials } from '../../components/home/Testimonials';
import { Product } from '../../types';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenScience: () => void;
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenScience, onAddToCart }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} onOpenScience={onOpenScience} />
      <Marquee />
      <ProductSection onAddToCart={onAddToCart} onNavigate={onNavigate} />
      <FeatureSection onOpenScience={onOpenScience} />
      <Testimonials />
    </>
  );
};

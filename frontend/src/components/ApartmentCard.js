import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Icons can be added here if desired, e.g.:
// import { MapPinIcon, HomeIcon, ArrowsPointingOutIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';

export default function ApartmentCard({ apartment }) {
  if (!apartment) {
    return null; // Or some placeholder/loading state
  }

  const {
    id,
    imageUrl: apartmentProvidedImageUrl,
    price,
    address,
    bedrooms,
    bathrooms,
    size,
    wwsPoints,
  } = apartment;

  let finalImageUrl;
  if (apartmentProvidedImageUrl && String(apartmentProvidedImageUrl).trim() !== '') {
    finalImageUrl = apartmentProvidedImageUrl;
  } else {
    const placeholderBaseUrl = 'https://source.unsplash.com/random/800x600/?apartment,building';
    // Use id for stability in placeholder, fallback to a random string if id is not available
    const imageSig = id || String(Math.random()).slice(2, 12); 
    finalImageUrl = `${placeholderBaseUrl}&sig=${imageSig}`;
  }

  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return 'N/A';
    return value.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <Link href={`/apartments/${id}`} className="card bg-white rounded-card shadow-card overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col group">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={finalImageUrl}
          alt={`Exterior view of ${address || 'apartment'}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="rounded-t-card group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover"
          priority={false} // Explicitly set priority to false unless it's LCP
        />
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-2xl font-bold font-secondary text-brand-primary">
            {formatCurrency(price)}
          </span>
          <span className="text-sm text-neutral-text-gray"> /mo</span>
        </div>
        <h3 className="text-lg font-semibold font-primary text-neutral-very-dark-gray truncate mb-1 group-hover:text-brand-secondary transition-colors" title={address || 'Address not available'}>
          {address || 'Address not available'}
        </h3>
        
        <div className="flex items-center text-sm text-neutral-text-gray mb-3 space-x-3 flex-wrap">
          <span>{typeof bedrooms === 'number' ? bedrooms : 'N/A'} bed(s)</span>
          <span className="text-neutral-border-gray">|</span>
          <span>{typeof bathrooms === 'number' ? bathrooms : 'N/A'} bath(s)</span>
          <span className="text-neutral-border-gray">|</span>
          <span>{typeof size === 'number' ? size : 'N/A'} m²</span>
        </div>

        <div className="mt-auto pt-3 border-t border-neutral-border-gray">
          {typeof wwsPoints === 'number' && !isNaN(wwsPoints) ? (
            <p className="text-sm text-brand-accent">
              WWS Points: <span className="font-semibold">{wwsPoints}</span>
            </p>
          ) : (
            <p className="text-sm text-neutral-placeholder-gray">WWS data pending</p>
          )}
        </div>
      </div>
    </Link>
  );
}

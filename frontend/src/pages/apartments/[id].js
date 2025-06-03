import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import WWSDisplay from '@/components/WWSDisplay';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, HomeIcon, TagIcon, ArrowsPointingOutIcon, BanknotesIcon } from '@heroicons/react/24/outline';

// Consistent data source for apartment details, aligning with homepage listings
const detailedMockApartments = [
  {
    id: '1',
    title: 'Modern Apartment in Amsterdam',
    address: '123 Main St, Amsterdam',
    price: 1200,
    size: 75,
    rooms: 3, // bedrooms (2) + 1 living area
    bedrooms: 2,
    bathrooms: 1,
    description: 'A beautiful and modern 2-bedroom apartment located in a prime area of Amsterdam. Features include a spacious living room, a fully equipped kitchen, and a lovely balcony. Close to public transport, shops, and parks.',
    images: [
      {
        alt: "Living room of modern apartment in Amsterdam",
        description: "Spacious and bright living area",
        url: "https://source.unsplash.com/800x600/?apartment,modern&sig=10"
      },
      {
        alt: "Kitchen of Amsterdam apartment",
        description: "Fully equipped modern kitchen",
        url: "https://source.unsplash.com/800x600/?kitchen,modern&sig=101"
      }
    ],
    wwsPoints: 140,
    maxRent: 1100,
    features: ['Balcony', 'Modern Kitchen', 'Elevator', 'Hardwood Floors', 'City View'],
    energyLabel: 'B'
  },
  {
    id: '2',
    title: 'Cozy Studio in Utrecht',
    address: '456 Oak Ave, Utrecht',
    price: 950,
    size: 50,
    rooms: 2, // bedroom/living area (1) + 1 (kitchenette might be in same room, but listed as 1 bed)
    bedrooms: 1,
    bathrooms: 1,
    description: 'Charming and cozy studio apartment in the heart of Utrecht. Perfect for a single professional or student. Comes with a compact kitchen and a comfortable living/sleeping area.',
    images: [
      {
        alt: "Cozy studio in Utrecht",
        description: "Well-designed studio space",
        url: "https://source.unsplash.com/800x600/?apartment,cozy&sig=11"
      },
      {
        alt: "Kitchenette in Utrecht studio",
        description: "Compact and functional kitchenette",
        url: "https://source.unsplash.com/800x600/?kitchenette&sig=111"
      }
    ],
    wwsPoints: 120,
    maxRent: 900,
    features: ['Close to Public Transport', 'City Center', 'Furnished Optional'],
    energyLabel: 'C'
  },
  {
    id: '3',
    title: 'Spacious Apartment in Rotterdam',
    address: '789 Pine Ln, Rotterdam',
    price: 1800,
    size: 100,
    rooms: 4, // bedrooms (3) + 1 living area
    bedrooms: 3,
    bathrooms: 2,
    description: 'A very spacious 3-bedroom apartment in Rotterdam, ideal for families. Features a large living room, two bathrooms, and modern amenities throughout. Located in a family-friendly neighborhood.',
    images: [
      {
        alt: "Living room of spacious apartment in Rotterdam",
        description: "Large and airy living room",
        url: "https://source.unsplash.com/800x600/?apartment,spacious&sig=12"
      },
      {
        alt: "Master bedroom in Rotterdam apartment",
        description: "Comfortable master bedroom with ample light",
        url: "https://source.unsplash.com/800x600/?bedroom,modern,large&sig=121"
      }
    ],
    wwsPoints: 180,
    maxRent: 1750,
    features: ['Modern Kitchen', 'Balcony', 'Elevator', 'Two Bathrooms', 'Pet-friendly'],
    energyLabel: 'A'
  }
];

export async function getStaticPaths() {
  const paths = detailedMockApartments.map(apartment => ({
    params: { id: apartment.id.toString() },
  }));
  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const apartment = detailedMockApartments.find(apt => apt.id.toString() === id.toString());

  if (!apartment) {
    return { notFound: true };
  }

  return {
    props: {
      initialApartment: apartment,
    },
  };
}

export default function ApartmentDetailPage({ initialApartment }) {
  const router = useRouter(); 
  const apartment = initialApartment; // Use prop directly, no need for state if not modified client-side
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen" aria-live="polite" aria-busy="true">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
        <span className="sr-only">Loading apartment details...</span>
      </div>
    );
  }
  
  if (!apartment) {
    // This case should ideally be handled by getStaticProps returning notFound: true, 
    // which Next.js then uses to render a 404 page.
    // However, as a safeguard if the component is somehow rendered without initialApartment:
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-semibold text-neutral-dark-gray">Apartment not found</h1>
            <p className="text-neutral-text-gray mt-2">The apartment details could not be loaded. It might have been removed or the link is incorrect.</p>
            <button type="button" onClick={() => router.push('/')} className="mt-6 btn-primary">
                Go to Homepage
            </button>
        </div>
    );
  }

  const nextImage = () => {
    if (!apartment.images || apartment.images.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % apartment.images.length);
  };

  const prevImage = () => {
    if (!apartment.images || apartment.images.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + apartment.images.length) % apartment.images.length);
  };

  return (
    <>
      <Head>
        <title>{`${apartment.title} | TransparentRent`}</title>
        <meta name="description" content={`Details for ${apartment.address}, priced at ${apartment.price} EUR per month.`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-card rounded-card overflow-hidden">
          {/* Image Gallery */}
          {apartment.images && apartment.images.length > 0 && (
            <div className="relative w-full h-64 md:h-96">
              <Image 
                src={apartment.images[currentImageIndex].url} 
                alt={apartment.images[currentImageIndex].alt || `${apartment.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                priority={currentImageIndex === 0}
              />
              {apartment.images.length > 1 && (
                <>
                  <button 
                    type="button"
                    onClick={prevImage} 
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button 
                    type="button"
                    onClick={nextImage} 
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {apartment.images.map((image, index) => (
                      <button 
                        type="button"
                        key={image.url || `gallery-dot-${index}`} 
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-brand-primary' : 'bg-neutral-border-gray opacity-70'} hover:opacity-100 hover:bg-brand-secondary transition-all`}
                        aria-label={`Go to image ${index + 1}`}
                        aria-current={index === currentImageIndex ? 'true' : 'false'}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2 font-secondary">{apartment.title}</h1>
            <div className="flex items-center text-neutral-text-gray mb-4">
              <MapPinIcon className="h-5 w-5 mr-2 text-brand-primary flex-shrink-0" />
              <p>{apartment.address}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center bg-neutral-light-gray p-4 rounded-lg">
                <BanknotesIcon className="h-8 w-8 text-brand-accent mr-3 flex-shrink-0" />
                <div>
                  <span className="text-sm text-neutral-text-gray">Price</span>
                  <p className="text-lg font-semibold text-neutral-dark-gray">
                    {apartment.price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} / month
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-neutral-light-gray p-4 rounded-lg">
                <ArrowsPointingOutIcon className="h-8 w-8 text-brand-accent mr-3 flex-shrink-0" />
                <div>
                  <span className="text-sm text-neutral-text-gray">Size</span>
                  <p className="text-lg font-semibold text-neutral-dark-gray">{apartment.size} m<sup className="text-xs">2</sup></p>
                </div>
              </div>
              <div className="flex items-center bg-neutral-light-gray p-4 rounded-lg">
                <HomeIcon className="h-8 w-8 text-brand-accent mr-3 flex-shrink-0" />
                <div>
                  <span className="text-sm text-neutral-text-gray">Rooms</span>
                  <p className="text-lg font-semibold text-neutral-dark-gray">{apartment.rooms}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-primary mb-3 font-secondary">Description</h2>
              <p className="text-neutral-text-gray leading-relaxed whitespace-pre-line">{apartment.description}</p>
            </div>

            {apartment.features && apartment.features.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-brand-primary mb-3 font-secondary">Features</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                        {apartment.features.map((feature, index) => (
                            <li key={`${feature}-${index}`} className="flex items-center text-neutral-text-gray">
                                <TagIcon className="h-5 w-5 mr-2 text-brand-accent flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {apartment.energyLabel && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-brand-primary mb-3 font-secondary">Energy Label</h2>
                     <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-brand-accent text-white shadow-sm`}>
                        Energy Label: {apartment.energyLabel}
                    </span>
                </div>
            )}

            <WWSDisplay points={apartment.wwsPoints} maxRent={apartment.maxRent} listedPrice={apartment.price} />

            <div className="mt-8 pt-6 border-t border-neutral-border-gray">
              <h2 className="text-2xl font-semibold text-brand-primary mb-3 font-secondary">Location</h2>
              {/* Placeholder for map integration */}
              <div className="bg-neutral-border-gray h-64 rounded-lg flex flex-col items-center justify-center text-neutral-text-gray">
                <MapPinIcon className="h-12 w-12 mb-2 text-neutral-placeholder-gray" />
                <p className="font-medium">Map View Unavailable</p>
                <p className="text-sm">Location: {apartment.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

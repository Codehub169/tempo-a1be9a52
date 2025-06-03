import Head from 'next/head';
import Image from 'next/image'; // Added import for Next/Image
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WWSDisplay from '@/components/WWSDisplay'; // Changed to alias path
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, HomeIcon, TagIcon, ArrowsPointingOutIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const mockApartment = {
  id: '123',
  title: 'Spacious Modern Apartment in City Center',
  address: '123 Main Street, Amsterdam, NL',
  price: 1800,
  size: 85, // sqm
  rooms: 3,
  description: 'A beautifully renovated 3-room apartment located in the vibrant heart of Amsterdam. Features include a modern kitchen, a large living room with plenty of natural light, two spacious bedrooms, and a balcony overlooking the city. Close to public transport, shops, and restaurants.',
  images: [
    {
        alt: "Living room of modern apartment",
        description: "Professional apartment gallery image",
        url: "https://source.unsplash.com/800x600/?apartment,gallery&sig=0"
    },
    {
        alt: "Modern kitchen in apartment",
        description: "Professional apartment gallery image",
        url: "https://source.unsplash.com/800x600/?apartment,gallery,modern&sig=1"
    },
    {
        alt: "Bedroom with large window",
        description: "Professional apartment gallery image",
        url: "https://source.unsplash.com/800x600/?apartment,gallery,clean&sig=2"
    }
  ],
  wwsPoints: 145,
  maxRent: 1750.50,
  features: ['Modern Kitchen', 'Balcony', 'Elevator', 'Hardwood Floors', 'City View', 'Pet-friendly'],
  energyLabel: 'A'
};

export default function ApartmentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      // Simulate API call to fetch apartment data by id
      // In a real app, replace this with actual data fetching logic
      const fetchApartmentData = async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // Find apartment in mock data or use a default mock if ID doesn't match
        // For this example, we'll always return the same mockApartment
        setApartment(mockApartment);
      };
      fetchApartmentData();
    }
  }, [id]);

  if (!apartment) {
    return (
      <div className="flex justify-center items-center min-h-screen" aria-live="polite" aria-busy="true">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
        <span className="sr-only">Loading apartment details...</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + apartment.images.length) % apartment.images.length);
  };

  return (
    <>
      <Head>
        <title>{`${apartment.title} | TransparentRent`}</title>
        <meta name="description" content={`Details for ${apartment.address}, priced at ${apartment.price} EUR per month.`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-card rounded-card overflow-hidden"> {/* Corrected rounded-lg-card to rounded-card */}
          {/* Image Gallery */}
          {apartment.images && apartment.images.length > 0 && (
            <div className="relative w-full h-64 md:h-96"> {/* Container for Image and absolute controls */}
              <Image 
                src={apartment.images[currentImageIndex].url} 
                alt={apartment.images[currentImageIndex].alt || `${apartment.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px" // Example sizes, adjust based on layout
                priority={currentImageIndex === 0} // Prioritize loading the first image
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
                        key={image.url || index} // Use URL if available and unique, else index
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
                        {apartment.features.map((feature) => (
                            <li key={feature} className="flex items-center text-neutral-text-gray">
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

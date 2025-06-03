import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WWSDisplay from '../../components/WWSDisplay';
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
        "alt": "apartment gallery image 1",
        "description": "Professional apartment gallery image",
        "url": "https://source.unsplash.com/800x600/?apartment,gallery&sig=0"
    },
    {
        "alt": "apartment gallery image 2",
        "description": "Professional apartment gallery image",
        "url": "https://source.unsplash.com/800x600/?apartment,gallery,modern&sig=1"
    },
    {
        "alt": "apartment gallery image 3",
        "description": "Professional apartment gallery image",
        "url": "https://source.unsplash.com/800x600/?apartment,gallery,clean&sig=2"
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

  // In a real app, you would fetch apartment data based on the ID
  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        setApartment(mockApartment);
      }, 500);
    }
  }, [id]);

  if (!apartment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
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
        <meta name="description" content={`Details for ${apartment.title}`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-card rounded-lg-card overflow-hidden">
          {/* Image Gallery */}
          {apartment.images && apartment.images.length > 0 && (
            <div className="relative">
              <img 
                src={apartment.images[currentImageIndex].url} 
                alt={`${apartment.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-64 md:h-96 object-cover transition-opacity duration-500 ease-in-out"
                loading="lazy"
              />
              {apartment.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {apartment.images.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-primary-500' : 'bg-neutral-300'} hover:bg-primary-300 transition-colors`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-2 font-secondary">{apartment.title}</h1>
            <div className="flex items-center text-neutral-600 mb-4">
              <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
              <p>{apartment.address}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center bg-neutral-100 p-4 rounded-lg">
                <BanknotesIcon className="h-8 w-8 text-accent-500 mr-3" />
                <div>
                  <span className="text-sm text-neutral-500">Price</span>
                  <p className="text-lg font-semibold text-neutral-700">
                    
                    {apartment.price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} / month
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-neutral-100 p-4 rounded-lg">
                <ArrowsPointingOutIcon className="h-8 w-8 text-accent-500 mr-3" />
                <div>
                  <span className="text-sm text-neutral-500">Size</span>
                  <p className="text-lg font-semibold text-neutral-700">{apartment.size} m
                    <span className="align-super text-xs">2</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-neutral-100 p-4 rounded-lg">
                <HomeIcon className="h-8 w-8 text-accent-500 mr-3" />
                <div>
                  <span className="text-sm text-neutral-500">Rooms</span>
                  <p className="text-lg font-semibold text-neutral-700">{apartment.rooms}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-600 mb-3 font-secondary">Description</h2>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{apartment.description}</p>
            </div>

            {apartment.features && apartment.features.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-primary-600 mb-3 font-secondary">Features</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {apartment.features.map((feature) => (
                            <li key={feature} className="flex items-center text-neutral-700">
                                <TagIcon className="h-5 w-5 mr-2 text-accent-500 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {apartment.energyLabel && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-primary-600 mb-3 font-secondary">Energy Label</h2>
                     <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-accent-500 text-white`}>
                        {apartment.energyLabel}
                    </span>
                </div>
            )}

            <WWSDisplay points={apartment.wwsPoints} maxRent={apartment.maxRent} listedPrice={apartment.price} />

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-primary-600 mb-3 font-secondary">Location</h2>
              {/* Placeholder for map integration */}
              <div className="bg-neutral-200 h-64 rounded-lg flex items-center justify-center text-neutral-500">
                <MapPinIcon className="h-12 w-12 mb-2" />
                <p>Map placeholder for {apartment.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

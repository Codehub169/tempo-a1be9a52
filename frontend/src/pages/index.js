import Head from 'next/head';
import Image from 'next/image';
import ApartmentCard from '@/components/ApartmentCard';

const mockApartments = [
  {
    id: '1',
    imageUrl: 'https://source.unsplash.com/800x600/?apartment,modern&sig=10',
    price: 1200,
    address: '123 Main St, Amsterdam',
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    wwsPoints: 140,
    maxRent: 1100,
  },
  {
    id: '2',
    imageUrl: 'https://source.unsplash.com/800x600/?apartment,cozy&sig=11',
    price: 950,
    address: '456 Oak Ave, Utrecht',
    bedrooms: 1,
    bathrooms: 1,
    size: 50,
    wwsPoints: 120,
    maxRent: 900,
  },
  {
    id: '3',
    imageUrl: 'https://source.unsplash.com/800x600/?apartment,spacious&sig=12',
    price: 1800,
    address: '789 Pine Ln, Rotterdam',
    bedrooms: 3,
    bathrooms: 2,
    size: 100,
    wwsPoints: 180,
    maxRent: 1750,
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>TransparentRent - Find Your Perfect Apartment</title>
        <meta
          name="description"
          content="Search for rental apartments in the Netherlands with transparent WWS point system calculations."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-brand-secondary/20 py-20 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://source.unsplash.com/800x600/?apartment,building,modern&sig=0"
            alt="Modern apartment building facade"
            fill
            priority
            className="opacity-30 object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-secondary text-brand-primary mb-4">
            Find Your Next Home, Transparently.
          </h1>
          <p className="text-lg md:text-xl text-neutral-dark-gray mb-8 max-w-2xl mx-auto">
            Discover apartments with clear, upfront WWS point system calculations for fair renting in the Netherlands.
          </p>
          <div className="max-w-xl mx-auto">
            <input 
              type="search" 
              placeholder="Search by city, neighborhood, or address..." 
              className="w-full px-6 py-4 rounded-lg shadow-md focus:ring-2 focus:ring-brand-primary focus:outline-none text-neutral-dark-gray placeholder-neutral-placeholder-gray"
            />
            {/* Future: Add search button or integrate with form */}
          </div>
        </div>
      </section>

      {/* Search and Filter Bar - Placeholder */}
      <section className="py-8 bg-neutral-light-gray sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <p className="text-neutral-dark-gray font-medium">Filters:</p>
            {/* Placeholder for filter dropdowns/buttons */}
            <button type="button" className="px-4 py-2 border border-neutral-border-gray rounded-md text-neutral-dark-gray hover:bg-neutral-border-gray transition-colors">Price</button>
            <button type="button" className="px-4 py-2 border border-neutral-border-gray rounded-md text-neutral-dark-gray hover:bg-neutral-border-gray transition-colors">Size</button>
            <button type="button" className="px-4 py-2 border border-neutral-border-gray rounded-md text-neutral-dark-gray hover:bg-neutral-border-gray transition-colors">Rooms</button>
          </div>
        </div>
      </section>

      {/* Apartment Listings Section */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-secondary font-semibold text-neutral-very-dark-gray mb-8">
          Featured Apartments
        </h2>
        {mockApartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockApartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Image 
              src="https://source.unsplash.com/800x600/?empty,sad&sig=13" 
              alt="No apartments found illustration" 
              width={300} 
              height={200} 
              className="mx-auto mb-4 rounded-lg"
            />
            <p className="text-xl text-neutral-dark-gray mb-2">No apartments found.</p>
            <p className="text-neutral-text-gray">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </>
  );
}

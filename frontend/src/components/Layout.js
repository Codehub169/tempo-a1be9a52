import React from 'react';

// A basic Layout component to wrap page content
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light-gray">
      {/* Future: Navbar or Header can be placed here */}
      {/* <header className="bg-brand-primary text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">TransparentRent</h1>
        </div>
      </header> */}

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Future: Footer can be placed here */}
      {/* <footer className="bg-neutral-dark-gray text-neutral-light-gray p-4 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} TransparentRent. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import MobileHeader from '../Navbar/MobileHeader';
import MobileNav from '../Navbar/MobileNav';
import Footer from '../Footer/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative w-full">
      <Navbar />
      <MobileHeader />
      <main className="flex-grow pb-[80px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default MainLayout;

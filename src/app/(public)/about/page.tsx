// import AboutSection from '@/components/about/About';
// import AboutHeader from '@/components/about/AboutHader';
import AboutSection from '@/components/comonLayout/about/About';
import AboutHeader from '@/components/comonLayout/about/AboutHader';
import React from 'react';

const page = () => {
   return (
      <div>
         <AboutHeader />
         <AboutSection />
      </div>
   );
};

export default page;
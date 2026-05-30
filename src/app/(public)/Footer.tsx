// import { Footer7 } from '@/components/footer/Footer';
// import ModernFooter from '@/components/footer/Footer';
import ModernFooter from '@/components/shared/footer/Footer';
import React from 'react';

const Footer = () => {
   return (
      <div>
         <ModernFooter
            contact={{
               email: "gaziur.tahmid@gmail.com",
               phone: "+880 1725 371 032",
               address: "Dhaka, Bangladesh",
            }}
         />
      </div>
   );
};

export default Footer;
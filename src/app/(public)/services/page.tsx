// import ProjectsSection from '@/components/projects/Project';
// import ServicesHeader from '@/components/service/servicehader';
// import ProjectsSection from '@/components/comonLayout/projects/Project';
import ProjectsSection from '@/components/ServicesHeader/projects/Project';
import ServicesHeader from '@/components/ServicesHeader/servicehader';
import React from 'react';

const page = () => {
   return (
      <div>
         <ServicesHeader />
         <ProjectsSection />
      </div>
   );
};

export default page;
// import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { fetchResume } from '@/components/comonLayout/resume/resumeActions';
import ResumeBuilder from '@/components/comonLayout/resume/ResumeBuilder';
import React from 'react';

const ResumePage = async () => {
   // const allResume = await fetchResume()
   // console.log(allResume,"all resume")
   return (
      <div>
        <ResumeBuilder />
      </div>
   );
};

export default ResumePage;
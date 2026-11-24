import { getMyResume } from '@/components/comonLayout/resume/resumeActions';
import Dashboard from '@/components/dashboard/userDashboard/UserDashboard';
import React from 'react';


const UserDashboard = async () => {
   const myResume = await getMyResume();
   const renderedAt = new Date().toISOString();
   // console.log("get my resume", myResume)
   return (
      <div>
         <Dashboard myResumes={myResume} renderedAt={renderedAt} />
      </div>
   );
};

export default UserDashboard;
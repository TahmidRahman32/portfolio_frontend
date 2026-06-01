import { getMyResume } from '@/components/comonLayout/resume/resumeActions';
import Dashboard from '@/components/dashboard/userDashboard/UserDashboard';
import React from 'react';


const UserDashboard = async () => {

   const myResume = await getMyResume();
   // console.log("get my resume", myResume)
   return (
      <div>
         <Dashboard  myResumes={myResume} />
      </div>
   );
};

export default UserDashboard;
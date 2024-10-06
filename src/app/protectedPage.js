"use client";

import { useState , useEffect } from 'react';



const ProtectedPage = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [iseReady, setIsReady] = useState(true);

  useEffect(() => {
  },[]);

  if(loader){
    return <p>Loading........</p>
  }

  return iseReady && children;
};

export default ProtectedPage;

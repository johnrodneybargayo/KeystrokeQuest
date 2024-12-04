"use client";

import React, { useState, useEffect } from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure hydration after component mounts
    setIsHydrated(true);
  }, []);

  // Prevent rendering before hydration
  if (!isHydrated) {
    return <div style={{ visibility: "hidden" }}></div>; // Keeps layout stable
  }

  return <>{children}</>;
};

export default ClientWrapper;

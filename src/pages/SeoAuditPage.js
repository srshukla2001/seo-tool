import React from 'react';
import SeoAudit from '../components/SeoAudit';
import Navbar from '../components/Navbar';

function SeoAuditPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="container mx-auto p-6">
        <div className="">
          <SeoAudit />
        </div>
      </div>
    </div>
  );
}

export default SeoAuditPage;
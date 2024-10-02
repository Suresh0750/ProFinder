// components/WorkerDashboard.tsx
import React from 'react';

import {DashboardHeader,ViewRequest} from "@/components/worker/dashboard/wokerDashboard"

const WorkerDashboard: React.FC = () => {
  return (
    <div className="min-h-[56%] bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Card */}
          <div className="bg-white shadow-md p-6 rounded-md text-center">
            <h2 className="text-gray-600 font-medium">Total Earnings</h2>
            <p className="text-xl font-bold text-gray-800">$50,000</p>
          </div>

          {/* Another Card */}
          <div className="bg-white shadow-md p-6 rounded-md text-center">
            <h2 className="text-gray-600 font-medium">Completed Services</h2>
            <p className="text-xl font-bold text-gray-800">25</p>
          </div>

          {/* Card with Button */}
          <ViewRequest />

          {/* Other Cards */}
          <div className="bg-white shadow-md p-6 rounded-md text-center">
            <h2 className="text-gray-600 font-medium">Upcoming Services</h2>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md">
              View Schedule
            </button>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center">
            <h2 className="text-gray-600 font-medium">Average Rating</h2>
            <p className="text-xl font-bold text-gray-800">4.8</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center">
            <h2 className="text-gray-600 font-medium">Pending Payments</h2>
            <p className="text-xl font-bold text-gray-800">$450</p>
          </div>

         

        </div>

        {/* Recent Activity Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-gray-700 font-medium">Plumbing Service</h3>
                <p className="text-sm text-gray-500">Customer: John Doe</p>
              </div>
              <p className="text-sm text-green-500">Completed</p>
            </div>
            <hr />
            <div className="flex justify-between items-center mt-4">
              <div>
                <h3 className="text-gray-700 font-medium">Plumbing Service</h3>
                <p className="text-sm text-gray-500">Customer: Jane Smith</p>
              </div>
              <p className="text-sm text-yellow-500">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;

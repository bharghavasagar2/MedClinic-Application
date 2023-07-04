import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaVideo, FaFilePrescription } from 'react-icons/fa';
import doctorVideo from '../../videos/doctorVideo.mp4';

const PatientScreen = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaUser className="mr-2" />
            Patient Profile</h2>
          <p className="text-gray-600">Name: John Doe</p>
          <p className="text-gray-600">Age: 30</p>
          <p className="text-gray-600">Gender: Male</p>
          <p className="text-gray-600">Contact: 1234567890</p>
          <p className="text-gray-600">Address: 123 Main St, City</p>
          <Link to="/edit-profile" className="text-blue-500 hover:text-blue-600 font-semibold mt-4">
            Edit Profile
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaCalendar className="mr-2" />
            Past Consultations
          </h2>
          <p className="text-gray-600">No Past consultations scheduled.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaFilePrescription className="mr-2" />
            Appointment Requests
          </h2>
          <p className="text-gray-600">No appointment requests.</p>
          <Link to="/appointment-requests" className="text-blue-500 hover:text-blue-600 font-semibold mt-4">
            View All Appointment Requests
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaVideo className="mr-2" />
            Video Consultations
          </h2>
          <p className="text-gray-600">No video consultations scheduled.</p>
          <Link to="/video-consultations" className="text-blue-500 hover:text-blue-600 font-semibold mt-4">
            Schedule Video Consultation
          </Link>
        </div>
      </div>
      <div className="mt-8 relative">
        <video
          src={doctorVideo}
          autoPlay
          muted
          loop
          className="w-full h-auto rounded-lg"
          style={{ maxWidth: '100%', height: 'auto', maxHeight: '50vh' }}
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded bg-opacity-90">
            Raise Appointment Request
          </button>
        </div>
      </div>




    </main>
  );
};

export default PatientScreen;

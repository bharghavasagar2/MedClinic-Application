import React from 'react';
import { FaUser, FaCalendar, FaFilePrescription, FaVideo } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';
import doctorVideo from '../../videos/doctorVideo.mp4';
import VideoComponent from '../commonComponents/CommonVideoComponent';

const PatientDashboard = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title=" Patient Profile"
          icon={FaUser}
          array={[]}
        />
        <Card
          title="Consultations"
          icon={FaCalendar}
          array={[]}
        />
        <Card
          title="Appointment Requests"
          icon={FaFilePrescription}
          array={[]}
        />
        <Card
          title="Video Consultations"
          icon={FaVideo}
          array={[]}
        />
      </div>
      <VideoComponent src={doctorVideo} style={{ width: '100%', height: 'auto', maxHeight: '50vh' }} />
    </main>
  );
};

export default PatientDashboard;

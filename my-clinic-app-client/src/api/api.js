import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';

const developmentBaseURL = 'http://localhost:5000/medclinic';
const productionBaseURL = 'https://medclinic.onrender.com/medclinic';

const baseURL = window.location.hostname === 'localhost' ? developmentBaseURL : productionBaseURL;

console.log(window.location.hostname)

export const api = axios.create({
  baseURL: baseURL, // Replace with your API base URL
});


export const Loading = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      setLoading(true);
      setSuccess(false); // Reset success state before each request
      setError(null); // Reset error state before each request
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setLoading(false);
        setSuccess(true); // Set success state when the response is received
        setTimeout(() => {
          setSuccess(false); // Clear the success state after 2 seconds
        }, 2000);
        return response;
      },
      (error) => {
        setLoading(false);
        setError(error); // Set error state when an error occurs
        setTimeout(() => {
          setError(null); // Clear the error state after 2 seconds
        }, 2000);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div className="loading-container">
      {loading && (
        <div className="loader-overlay">
          <div className="loader-wrapper">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        </div>
      )}
      {success && (
        <div className="success-message">Request fulfilled successfully</div>
      )}
      {error && (
        <div className="error-message-fetch">{error.message}</div>
      )}
    </div>
  );
};



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';

export const api = axios.create({
  baseURL: 'http://localhost:5000/medclinic', // Replace with your API base URL
});


export const Loading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
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
    </div>
  );
};

import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => {
  const specUrl = 'http://127.0.0.1:5000/apispec_1.json';

  
  const token = localStorage.getItem('token'); 
  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI
        url={specUrl}
        requestInterceptor={(request) => {
          if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
          }
          return request;
        }}
      />
    </div>
  );
};

export default SwaggerDocs;
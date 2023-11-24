import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface BusinessData {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  stars: number;
  reviewCount: number;
  isOpen: number;
  categories: string;
}

const BusinessDetails: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/data/${city}`);
        const { data } = await response.json();
        setBusinessData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [city]);

  if (!businessData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <p>Name: {businessData.name}</p>
        <p>Address: {businessData.address}</p>
        <p>City: {businessData.city}</p>
      </div>
  );
};

export default BusinessDetails;
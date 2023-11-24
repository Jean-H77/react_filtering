import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

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
  const [businessData, setBusinessData] = useState<BusinessData[]>([]); // Change to an array

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/data/${city}`);
        const { data } = await response.json();
        console.log(data)
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
    <MDBTable>
    <MDBTableHead>
    <tr>
    <th>Name</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Postal code</th>
    <th>Stars</th>
    <th>Review count</th>
    <th>Is open</th>
    <th>Categories</th>
    </tr>
    </MDBTableHead>
    <MDBTableBody>
        {businessData.map(data => (
          <tr>
            <td>{data.name}</td>
            <td>{data.address}</td>
            <td>{data.city}</td>
            <td>{data.state}</td>
            <td>{data.postalCode}</td>
            <td>{data.stars}</td>
            <td>{data.reviewCount}</td>
            <td>{data.isOpen}</td>
            <td>{data.categories}</td>
          </tr>
        ))}
        </MDBTableBody>
      </MDBTable>
  );
};

export default BusinessDetails;
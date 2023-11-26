import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import BusinessDetailsForm from './BusinessDetailsForm';

export interface BusinessData {
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
  const [businessData, setBusinessData] = useState<BusinessData[]>([]);

    const updateBusinessData = (data: BusinessData[]) => {
        console.log("UPDATING BUSINESS DATA")
        setBusinessData(data);
   };

  return (
    <div>
    <BusinessDetailsForm updateBusinessData={updateBusinessData}/>
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
    <th>Status</th>
    <th>Categories</th>
    </tr>
    </MDBTableHead>
    <MDBTableBody>
        {businessData && businessData.map((data,index) => (
          <tr key={index}>
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
      </div>
  );
};

export default BusinessDetails;
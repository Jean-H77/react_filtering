import React, { useEffect, useState } from "react";
import { BusinessData } from "./BusinessDetailsPage";

interface FormState {
  status: string;
  state: string;
  city: string;
  name: string;
}

interface BusinessFormProps {
  updateBusinessData: (data: BusinessData[]) => void;
}

const apiUrl = "http://localhost:8080/api/";

const BusinessForm: React.FC<BusinessFormProps> = ({ updateBusinessData }) => {
  const [formData, setFormData] = useState<FormState>({
    status: "both",
    state: "null",
    city: "null",
    name: "null",
  });

  const [pageNumber, setPageNumber] = useState(0);

  let nextButton;
  let previousButton;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      state: e.target.value,
    });
  };

  const constructApiUrl = () => {
    const { city, status, state, name } = formData;

    const nonEmptyParams = [
      city ? `${city}/` : "null/",
      status ? `${status}/` : "both/",
      state ? `${state}/` : "null/",
      name ? `${name}` : "null/",
    ];

    return `${apiUrl}${nonEmptyParams.join("")}`;
  };

  const fetchData = async (pageNumber) => {
    try {
      const url = constructApiUrl() + `/${pageNumber}`;
      console.log("Url: " + url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("Received data:", data.data);
      updateBusinessData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPageNumber(0);
    fetchData(0);
  };

  const handlePreviousPageButtonClick = (event) => {
    console.log("Previous Page");
    event.preventDefault();
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber - 1;
      console.log(`Page number is now ${newPageNumber}`);
      fetchData(newPageNumber);
      return newPageNumber;
    });
  };

  const handleNextPageButtonClick = (event) => {
    console.log("Next Page");
    event.preventDefault();
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + 1;
      console.log(`Page number is now ${newPageNumber}`);
      fetchData(newPageNumber);
      return newPageNumber;
    });
  };

  if (pageNumber > 0) {
    previousButton = (
      <button onClick={handlePreviousPageButtonClick}>Previous</button>
    );
  }

  nextButton = <button onClick={handleNextPageButtonClick}>Next</button>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Select filter parameters:</legend>
          <div>
            <input
              type="radio"
              id="open"
              name="status"
              value="open"
              onChange={handleInputChange}
            />
            <label htmlFor="open">Open</label>
            <input
              type="radio"
              id="closed"
              name="status"
              value="closed"
              onChange={handleInputChange}
            />
            <label htmlFor="closed">Closed</label>
            <input
              type="radio"
              id="both"
              name="status"
              value="both"
              onChange={handleInputChange}
            />
            <label htmlFor="both">Both</label>
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Business name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <select
              name="state"
              id="state"
              onChange={handleSelectChange}
              value={formData.state}
            >
              <option value="null">Any</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export default BusinessForm;

import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Carousel from '../Components/Carousel';
import obj from '../Data/DataOfCards'; 

export default function Homepage() {
  const [VechicleData, setVechicleData] = useState(obj);
  const [VechicleCategory, setVechicleCategory] = useState([]);
  const [search, setSearch] = useState('');

 
const loadVechicleData = async () => {
  setTimeout(() => {
    setVechicleData(obj);
  }, 1000);
};

useEffect(() => {
  setVechicleCategory([
    {
      "CategoryName": "Cycle"
    },
    {
      "CategoryName": "Sccoty"
    },
    {
      "CategoryName": "Bike"
    },
    {
      "CategoryName": "Car"
    }
  ]);

  loadVechicleData();
}, []);


  useEffect(() => {
    loadVechicleData();
  }, []);

  return (
    <div>

      <div className="d-flex justify-content-center">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search your Vehicle Name Here"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container">
        {VechicleCategory !== undefined && VechicleCategory.length > 0 ? (
          VechicleCategory.map((data) => (
            <div key={data._id} style={{ paddingBlock: "10px" }}>
              <div className="row mb-3">
                <div key={data.id} className="fs-3 m-3" style={{ paddingBlock: "5px" }}>
                  {data.CategoryName}
                </div>
                <hr
                  id="hr-success"
                  style={{
                    height: "4px",
                    backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                  }}
                />
                {VechicleData !== undefined && VechicleData.length > 0 ? (
                  VechicleData.filter(
                    (items) =>
                      items.CategoryName === data.CategoryName &&
                      items.name.toLowerCase().includes(search.toLowerCase())
                  ).map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                      style={{
                        paddingBottom: "90px",
                        paddingTop: "90px",
                        paddingBlock: "90px",
                      }}
                    >
                      {console.log(filterItems.url)}
                      <Card vdata={filterItems} options={filterItems.options[0]} />
                    </div>
                  ))
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            </div>
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

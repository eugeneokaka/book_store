import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function Singlebook() {
  const [data, setdata] = useState([]);

  const urlslug = useParams();
  const baseurl = `http://localhost:5000/api/books/${urlslug.slug}`;

  useEffect(() => {
    const fechdata = async () => {
      try {
        const response = await fetch(baseurl);
        if (!response.ok) {
          throw new Error("failed to fech data");
        }
        const jsondata = await response.json();
        setdata(jsondata);
      } catch (error) {
        console.log(error);
      }
    };
    fechdata();
  }, []);
  function Starrating({ numbers }) {
    const stars = [];
    for (let i = 0; i < numbers; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return <div>Rating:{stars}</div>;
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}l
      <Link to={"/books"}> books</Link>
      <div className="bookdetails">
        <div className="col-1">
          <img src={`http://localhost:5000/uploads/${data.thumbnail}`} alt="" />
        </div>
        <div className="col-2">
          <h1>{data.title}</h1>
          <Link to={`/editbook/${data.slug}`}>edit</Link>
          <p>{data.description}</p>
          <Starrating numbers={data?.stars} />
          <p>category</p>
          {data?.category?.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Singlebook;

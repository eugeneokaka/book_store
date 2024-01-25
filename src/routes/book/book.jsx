import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Book() {
  const baseurl = "http://localhost:5000/api/books";
  const [data, setdata] = useState([]);
  const [loading, setisloading] = useState(true);
  const [error, seterror] = useState(null);
  const [category, setcategory] = useState("");
  useEffect(() => {
    const fechdata = async () => {
      try {
        let url = baseurl;
        if (category) {
          url += `?category=${category}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("failed to fech data");
        }
        const jsondata = await response.json();
        setdata(jsondata);
        setisloading(false);
      } catch (error) {
        console.log(error);
        seterror("erroe feching data please try again later");
        setisloading(false);
      }
    };
    fechdata();
  }, [category]);
  return (
    <div>
      <h1>books</h1>
      <Link to={"/createbook"}> add new book</Link>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam earum
        impedit totam.
      </p>
      <h2>fetch example</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="filters">
        <label>categories</label>
        <select onChange={(e) => setcategory(e.target.value)}>
          <option value="">all</option>
          <option value="romance">romance</option>
          <option value="science">Science</option>
          <option value="crime">crime</option>
          <option value="food">food</option>
          <option value="adventure">adventure</option>
          <option value="thriller">thriller</option>
          <option value="fiction">fiction</option>
          <option value="other">other</option>
        </select>
      </div>

      {loading ? (
        <p>loading ....</p>
      ) : (
        <ul className="books">
          {data.map((item) => {
            return (
              <li key={item._id}>
                <Link to={`/books/${item.slug}`}>
                  <img
                    src={`http://localhost:5000/uploads/${item.thumbnail}`}
                    alt=""
                  />
                  <h3>{item.title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Book;

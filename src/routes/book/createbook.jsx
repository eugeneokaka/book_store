import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function Createbook() {
  const [title, settitle] = useState("");
  const [slug, setslug] = useState("");
  const [stars, setstars] = useState("");
  const [description, setdescriton] = useState("");
  const [category, setcategoty] = useState([]);
  const [thumbnail, setthumbnail] = useState(null);
  const [submited, setsubmited] = useState("");
  const [image, setImage] = useState(NoImageSelected);
  async function createbook(e) {
    setsubmited(true);
    e.preventDefault();
    console.table([title, slug]);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);
    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: formData,
      });
      // const response = await fetch("http://localhost:5000/api/books", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     title: title,
      //     slug: slug,
      //     stars: stars,
      //     description: description,
      //     category: category,
      //   }),
      // });
      // setsubmited(true);
      if (response.ok) {
        settitle("");
        setslug("");
        setsubmited(true);
      } else {
        console.log("failed tofech data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handlecategory = (e) => {
    setcategoty(e.target.value.split(",").map((category) => category.trim()));
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setthumbnail(e.target.files[0]);
    }
  };
  return (
    <div>
      <h1>Createbook</h1>
      {submited ? (
        <p>data submited</p>
      ) : (
        <form className="bookdetails" onSubmit={createbook}>
          <div className="col-1">
            <label>upload thumbnail</label>
            <img src={image} alt="" />
            <input
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png"
            />
          </div>
          <div className="col-2">
            <div>
              <label>title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
          </div>

          <div className="col-2">
            <div>
              <label>slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setslug(e.target.value)}
              />
            </div>

            <div>
              <label>stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setstars(e.target.value)}
              />
            </div>

            <div>
              <label>description</label>
              <textarea
                rows={"4"}
                cols={"50"}
                type="text"
                value={description}
                onChange={(e) => setdescriton(e.target.value)}
              />
            </div>
            <div>
              <label>categoty(comma-separated)</label>
              <input type="text" value={category} onChange={handlecategory} />
            </div>

            <input type="submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default Createbook;

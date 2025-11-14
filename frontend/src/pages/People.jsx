import { useEffect, useState } from "react";

function People() {
  const [people, setPeople] = useState([]);
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    const loadPeople = async () => {
      const res = await fetch("http://127.0.0.1:5000/people");
      const data = await res.json();
      setPeople(data);

      // Fetch each person's TVMaze photo
      data.forEach(person => {
        fetch(`http://127.0.0.1:5000/actorphoto_tvmaze?name=${encodeURIComponent(person)}`)
          .then(res => res.json())
          .then(info => {
            setPhotos(prev => ({
              ...prev,
              [person]: info.photo
            }));
          });
      });
    };

    loadPeople();
  }, []);

  return (
    <div className="people-container" style={{ padding: "20px" }}>
      <h1>People</h1>

      <div className="people-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "20px"
      }}>
        {people.map((person, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={photos[person] || "https://via.placeholder.com/150?text=No+Image"}
              alt={person}
              style={{ width: "140px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p>{person}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;


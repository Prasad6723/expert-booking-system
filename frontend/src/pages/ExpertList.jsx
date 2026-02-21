import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
  }, [search, category, page]);

  const fetchExperts = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:5000/experts?search=${search}&category=${category}&page=${page}&limit=5`
    );
    const data = await res.json();
    setExperts(data.experts);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  return (
    <div>
      <h1>Experts List</h1>

      {/* Search */}
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="Data Science">Data Science</option>
      </select>

      {loading && <p>Loading...</p>}

      {!loading &&
        experts.map((e) => (
          <div key={e._id} style={{ border: "1px solid #ccc", margin: 10 }}>
            <h2>{e.name}</h2>
            <p>Category: {e.category}</p>
            <p>Experience: {e.experience} years</p>
            <p>Rating: {e.rating}</p>
            <Link to={`/expert/${e._id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}

      {/* Pagination */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span> Page {page} </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
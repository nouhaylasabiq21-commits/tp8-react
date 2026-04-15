import { useState, useEffect } from "react";

function FetchData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = () => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>10 articles (fetch)</h2>
      <button onClick={loadPosts}>Recharger les données</button>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;
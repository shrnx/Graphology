import React, { useEffect, useState } from 'react';

function ApiData({ apiUrl }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-8 bg-gray-700 p-4 rounded-lg w-96 mx-auto h-fit">
      <h2 className="text-xl font-semibold mb-2">API Data</h2>
      <pre className="text-gray-300">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ApiData;

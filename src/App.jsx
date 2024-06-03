import { useEffect, useState } from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm";
import { UserCard } from "./components/UserCard/UserCard";
import React from "react";


export default function App() {
  const [url, setUrl] = useState('https://dummyjson.com/users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onRequest(value) {
    setUrl(value);
  };

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setData(data.users);
      })
      .catch(error => {
        console.log('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [url]);


  function generateUsers() {
    return data.map(user =>
      React.cloneElement(
        <div className="usersList">
          <UserCard key={user.id} {...user} />
        </div>,
        { key: user.id }
        ),
    )
  }


  if (loading) return 'Loading data...';
  if (error) return 'Error!';

  return (
    <>
      <SearchForm onRequest={onRequest} />
      {generateUsers()}
    </>
  );
}

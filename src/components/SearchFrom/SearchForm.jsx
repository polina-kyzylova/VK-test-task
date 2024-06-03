import "./styles.css";


export function SearchForm({onRequest}) {
  const url = 'https://dummyjson.com/users';

  const serachUser = (e) => {
    let value = e.target.value;
    onRequest(value ? url + '/search?q=' + value : url);
  };

  return (
    <div className="searchForm">
      <form>
        <input type="text" placeholder="Search..." onChange={serachUser}/>
      </form>
    </div>
  );
}

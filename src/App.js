import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const category = [{ name: 'Все' }, { name: 'Море' }, { name: 'Горы' }, { name: 'Архитектура' }, { name: 'Города' }];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://640e2a38b07afc3b0dc1033d.mockapi.io/collections?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  // console.log(collections);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {/* <li className="active">{category[0].name}</li> */}
          {category.map((item, index) => (
            <li onClick={() => setCategoryId(index)} className={categoryId === index ? 'active' : ''} key={index}>
              {item.name}
            </li>
          ))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
        {/* <li>1</li>
        <li className="active">2</li>
        <li>3</li> */}
      </ul>
    </div>
  );
}

export default App;

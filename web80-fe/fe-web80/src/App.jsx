import './App.css'
import { IoMenu, IoSearch } from "react-icons/io5";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';

function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const data = await axios.get("http://localhost:8080/movies");
    setData(data.data)
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='container'>
      <div className='section1'>
        <div className='menu-icon'><IoMenu /></div>
        <div className='movie-web-name'>MOVIE <span className='UI'>UI</span></div>
        <div className='search-icon'><IoSearch /></div>
      </div>
      <div className='list-movie'>
        <div className='title'><p>Most Popular Movies</p></div>
        <Carousel
          arrows
          infinite={false}
          slidesToShow={4}
          slidesToScroll={1}
          >
          {data.map((movie, index) => <div className='option' key={index}>
            <img src={movie.image} />
            <p className='name-movie'>{movie.name}</p>
            <p className='time'>{movie.time} min {movie.year}</p>
          </div>)}
        </Carousel>
      </div>
    </div>
  )
}

export default App

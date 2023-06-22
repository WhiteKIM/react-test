import React, { useEffect, useState } from 'react'
import "./Nav.css" 
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", ()=>{});
        };
    }, );

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

    const useQuery = () => {

    }

  return (
    <nav className={`nav ${show && "nav_black"}`}>
        <img 
            alt='Netflix logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png'
            className='nav_logo'
            onClick={()=>window.location.href="/"}
        />
        <input 
            value={searchValue}
            onChange={handleChange}
            className='nav_input'
            type='text'
            placeholder='영화를 검색해주세요'
        />
        <img
            alt='User logged'
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
            className='nav_avatar'
        />
    </nav>
  )
}



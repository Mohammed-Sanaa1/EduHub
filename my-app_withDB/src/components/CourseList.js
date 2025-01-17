import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import Search from './Search'
import Favourites from './Favourites'
import { useState, useEffect} from 'react';
import Delete from './Delete'

export default function CourseList() {
    const [courses, setCourses]= useState([]);
    const [searchValue, setSearch]= useState('Ace');
    const [favourites, setFavourites] = useState([]);
    const navigate = useNavigate();
    const fetchCourses = async(searchValue) =>{
        const apiKey = "AIzaSyCMcd58L0n2zULvwbJjU_riMStv0ojOWm0"; // Replace with your actual YouTube API key
        const maxVideos = 30;
    const url=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchValue}&part=snippet&type=video&chart=mostPopular`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if(data.Search){
        setCourses(data.Search)
    }
    }
    const addFavouriteCourse = (currentCourse) => {
        const newlist= [...favourites, currentCourse]
    setFavourites(newlist)
    };
    const DelFavouriteCourse =(currentCourse)=>{
    const filtered=  favourites.filter((ele)=>
    {
        return (ele != currentCourse)
    });
    setFavourites(filtered);
    }

    useEffect(()=>{
        fetchCourses(searchValue);
    },[searchValue])

return (
    // <div>test</div>
    <>
    <div className='row'>
        <h5>Courses List</h5>
        <div className='col-8'>
    </div>
    <div className='col-4 justify-content-end'>
        <Search searchValue={searchValue} setSearchValue={setSearch} />
    </div>

    </div>
    {/*render all courses */}
    <div className='container-fluid'>
        <div className='row justify-content-center'>
            { courses.map((course, _) => (
            <div key={course.imdbID} className='col-md-2 image-container d-flex justify-content-start m-3'>
                <img onClick={()=>navigate(`/courses/${course.Title}`,{ state: course })}
                style={{width:'100%'}}src={course.Poster} alt='course'/>
                <div onClick={() => addFavouriteCourse(course)} className='overlay d-flex align-items-center justify-content-center'>
                <Favourites />
                    </div>
            </div>
            ))}
        </div>
        <div className='row justify-content-center'>
        <h3>Favorites:</h3>
        {
            favourites.map((fav,_) => (
            <div key={fav.imdbID} className='col-md-2 image-container d-flex justify-content-start m-2'>
            <img style={{width:'100%'}}src={fav.Poster} alt='course'></img>
            <div onClick={() => DelFavouriteCourse(fav)} className='overlay d-flex align-items-center justify-content-center'>
                <Delete />
                    </div>
            </div>
            ))
        }
        </div>
    </div>
    </>
);
}
import React, { useContext, useEffect, useState } from 'react';
import "./style.css"
import { Container, Row, Col, DropdownButton, Dropdown , Breadcrumb} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './styles/dashboard.css'
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import DataContext from '../contexts/DataProvider';


const Dashboard = () => {

    const { Favorites } = useContext(DataContext);
    const { setFavorite } = useContext(DataContext);
    const { Age } = useContext(DataContext);

    var isUserKid = false;
    if(Age < 10){
        isUserKid = true;
        console.log("user is: " + Age)
    }
        

    const [searchInput, setSearchInput] = useState('');
    const [videos, setVideos] = useState([]);
    // const [Age, setAge] = useState(0);
    const navigate = useNavigate();


    const storedId = JSON.parse(localStorage.getItem('authData')) || 0;
    if(!storedId)
        navigate('/login')

    console.log(storedId);
    const userId = storedId; // Assuming you have a user ID
    const apiUrl = `http://127.0.0.1:3501/users?id=${userId}`;
    // const fetchingDB = async () => {
    //     const response = await fetch(apiUrl);
    //     const data= await response.json();
    //     setAge(Number(data.age))
    //     console.log("Age: "+data.age)
    // }

    // fetchingDB();

    useEffect(() => {
        searchYouTube("course");
    }, []);


    // const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // const [Favorites, setFavorite] = useState([]); //array of objects (videos)

    // useEffect(() => {
    //     const fetchingDB = async () => {
    //       try {
    //         const response = await fetch(`http://127.0.0.1:3501/users?id=${userId}`);
    //         const data = await response.json();
    //         setFavorite(data.courses);
    //         setAge(Number(data.age))
    //         console.log(Age)
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     }
    
    //     fetchingDB();
    //   }, [userId]);

    const handleAddToFavorite = (video) => {
    
        const isVideoExist = Favorites.find((element) => element.id.videoId === video.id.videoId);
        if(isVideoExist){
            console.log("Yes");
            const newFavorite = Favorites.filter((element) => element.id.videoId !== video.id.videoId);
            localStorage.setItem('favorites', JSON.stringify(newFavorite));
            setFavorite(newFavorite);
            console.log(newFavorite);
        }else{
            console.log("NO");
            const newFavorite = [video, ...Favorites];
            localStorage.setItem('favorites', JSON.stringify(newFavorite));
            setFavorite(newFavorite);
            console.log(newFavorite);
        }
    };

    // useEffect(() => {
    //     fetch("http://127.0.0.1:3501/users", {
    //         method: 'PATCH',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({"id":userId, 'courses':Favorites})
    //       })
    //       .then((response) => response.json())
    //       .then((data) => console.log(data))
    //       .catch((error) => console.error('Error updating user data:', error));
    // }, [Favorites]);

    function isFavorite(videoId){
        if(Favorites.find((element)=> element.id.videoId === videoId))
            return true;
        else
            return false;
    }

    const searchYouTube = async (value) => {
        const apiKey = "AIzaSyBZPi54v7GejS6gAfHrDcviMeQeEZJVCpU"; // Replace with your actual YouTube API key
        const maxVideos = 30;
    
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchInput? searchInput:value}${isUserKid? "for kids":""}&part=snippet&type=video&chart=mostPopular&maxResults=${maxVideos}`
          );
    
          const data = await response.json();
          setVideos(data.items); //videos = data.items
        } catch (error) {
          console.error(error);
        }
    };

    const displayVideos = () => {
        return videos.map((video) => {
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;
            const videoImage = video.snippet.thumbnails.high.url;

            return (
                <Col key={videoId} className='col-lg-3 col-md-4 col-sm-6 mb-4 video'>
                    <Card className="custom-hover-card">
                        <Card.Img variant="top" src={videoImage} />
                        <Card.Body>
                            <Card.Title>{videoTitle}</Card.Title>
                            <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, modi?</Card.Text>
                            <div className="d-flex justify-content-between align-items-center fav-icon">
                                <span
                                    onClick={()=> handleAddToFavorite(video)}
                                    className={`heart-icon ${isFavorite(videoId) ? 'favorite' : ''}`}
                                    >
                                    {isFavorite(videoId)? <FaHeart /> : <FaRegHeart />}
                                </span>
                                <Button onClick={()=>navigate(`/dashboard/${video.id.videoId}`,{state: video})} variant="primary" id='Watch_Now_btn'>Watch Now</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
    };

    const handleKeyPress = (event) => {
        // Check if the pressed key is "Enter" (key code 13)
        if (event.key === 'Enter') {
          // Call the searchYouTube function
          searchYouTube();
        }
    }

    const handleCategorySelect = (eventKey, event) => {
        // Set the selected category in state
        searchYouTube(eventKey);

    };
    
    if(userId){
        return (
            <>
                <div className="container-fluid bg-primary py-5 mb-5 page-header">
                <Container className="py-5">
                    <div className="row justify-content-center">
                    <div className="col-lg-10 text-center">
                        <h1 className="display-3 animated slideInDown HereTitle">Your Educational Journey Starts Here</h1>
                    </div>
                    </div>
                </Container>
                <div className="centered-container">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                <a className="text-white" href="/">
                                    Home
                                </a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active className="text-white">
                                    Courses
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            </div>
                </div>
                <div className='top-content mb-5 mt-5'>
                    <div className=' d-flex justify-content-center mt-5'>
                        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                            className="form-control" placeholder=" Search here" style={{marginRight:"3px", width:"700px", borderRadius:"5px" , height:"40px" , marginLeft:"-130px"}} onKeyDown={handleKeyPress}/>
                        <button onClick={searchYouTube} type="submit" className='btn btn-primary'>Search</button>
                    </div>
                    <div className="d-flex justify-content-end" style={{marginTop:"-37px"}}>
                    <div className="category">
                        <DropdownButton id="category-dropdown" title="Category" onSelect={handleCategorySelect}>
                            <Dropdown.Item eventKey="Programming course">Computer Science</Dropdown.Item>
                            <Dropdown.Item eventKey="Art course">Art</Dropdown.Item>
                            <Dropdown.Item eventKey="Mathmatics course">Math</Dropdown.Item>
                            <Dropdown.Item eventKey="Finance course">Finance</Dropdown.Item>
                            <Dropdown.Item eventKey="Cocking course">Cocking</Dropdown.Item>
                        </DropdownButton>
                    </div>
                        <div className="sort">
                            <DropdownButton id="sort-dropdown" title="Sort by">
                            <Dropdown.Item eventKey="1">Latest</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Most Popular</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
    
    
                {/*videos*/}
                <div className='middle-content mb-7 mt-5' style={{marginBottom: "100px"}}>
                    <div className='card-container'>
                        <div className="video-container">
                            <Row className='mb-5'>
                                
                                {displayVideos()}
    
                            </Row>
                        </div>
                    </div>
                </div> 
            </>
        );
    }
    
}

export default Dashboard;


{/* <Col key={videoId} className='col-lg-3 col-md-4 col-sm-6 mb-4 video'>
                <Card className="custom-hover-card" onClick={()=>navigate(`/dashboard/${video.id.videoId}`,{ state: video })}>
                    <Card.Img variant="top" src={videoImage} />
                    <Card.Body>
                        <Card.Title>{videoTitle}</Card.Title>
                        <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, modi?</Card.Text>
                        <div className="d-flex justify-content-between align-items-center fav-icon">
                        <div>
                            <svg
                            width='1em'
                            height='1em'
                            viewBox='0 0 16 16'
                            className='bi bi-heart-fill'
                            fill='red'
                            xmlns='http://www.w3.org/2000/svg'
                            >
                            <path
                                fillRule='evenodd'
                                d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                            />
                            </svg>
                        </div>
                        <Button variant="primary" target="_blank">Watch Now</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col> */}
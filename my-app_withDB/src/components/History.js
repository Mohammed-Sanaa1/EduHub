import React, { useContext, useState } from 'react';
import "./style.css"
import { Container, Row, Col, DropdownButton, Dropdown , Breadcrumb} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './styles/dashboard.css'
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import DataContext from '../contexts/DataProvider';


const History = () => {
    const { History } = useContext(DataContext);
    const { setHistory } = useContext(DataContext);
    const { Age } = useContext(DataContext);

    // const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    // const [History, setHistory] = useState(storedHistory);

    function clearHistory(){
        localStorage.setItem('history', JSON.stringify([]));
        setHistory([]);
    }


    const { Favorites } = useContext(DataContext);
    const { setFavorite } = useContext(DataContext);
	// const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // const [Favorites, setFavorite] = useState(storedFavorites); //array of objects (videos)
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

    function isFavorite(videoId){
        if(Favorites.find((element)=> element.id.videoId === videoId))
            return true;
        else
            return false;
    }

	const displayVideos = () => {
        return History.map((video) => {
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

    const navigate = useNavigate();
	return (
		<>
            {/* Title */}
			<h3 style={{ marginBottom: '10px', marginTop: '15px' }}>Course History</h3>

            {/* Clear History Button */}
            {Age<9?(
                <></>
            ):(
                <div className=" container d-flex justify-content-end">
                    <div className="d-grid gap-2">
                        <button onClick={clearHistory} type="button" className="btn btn-primary">Clear History</button>
                    </div>
                </div>
            )}
            
			{/*videos*/}
			{History.length > 0 ? (
				<div className='middle-content mb-7 mt-5'>
					<div className='card-container'>
						<div className="video-container">
							<Row className='mb-5'>
								
								{displayVideos()}

							</Row>
						</div>
					</div>
            	</div> 
        
			) : (
				<p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
				No courses in the History, go to <a style={{ color: 'blue' }} href="/dashboard">Courses</a>.
				</p>
			)}
            
		</>
	);
};

export default History;
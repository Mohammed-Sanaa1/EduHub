import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import './styles/video.css'; // Import a separate CSS file for styling
import DataContext from '../contexts/DataProvider';


const ThisVideo = () => {
    const { id } = useParams();
    const {state} = useLocation();
    const video = state;
    console.log(video);

    const { setHistory } = useContext(DataContext);

    useEffect(() => {
      const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
      const isVideoExistHistory = storedHistory.find((element) => element.id.videoId === video.id.videoId);

      if(isVideoExistHistory){
          console.log("Yes");
          const beforeNewHistory = storedHistory.filter((element) => element.id.videoId !== video.id.videoId);
          const newHistory = [video, ...beforeNewHistory];
          localStorage.setItem('history', JSON.stringify(newHistory));
          setHistory(newHistory);
      }
      else{
        console.log('NO');
        const newHistory = [video, ...storedHistory];
        localStorage.setItem('history', JSON.stringify(newHistory));
        setHistory(newHistory);
      }
    }, []);
    

    const { Favorites } = useContext(DataContext);
    const { setFavorite } = useContext(DataContext);
    // const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // const [Favorites, setFavorite] = useState(storedFavorites); //array of objects (videos)
    const handleAddToFavorite = (video) => {
    
        const isVideoExist = Favorites.find((element) => element.id.videoId === video.id.videoId);
        if(isVideoExist){
            const newFavorite = Favorites.filter((element) => element.id.videoId !== video.id.videoId);
            localStorage.setItem('favorites', JSON.stringify(newFavorite));
            setFavorite(newFavorite);
            console.log(newFavorite);
        }else{
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

    console.log(video);
  
    const [rating, setRating] = useState(0);
  
    const handleRatingClick = (selectedRating) => {
      setRating(selectedRating);
    };
  
    return (
      <div className="container mt-5">
        <div className="row mt-4">
          <div className="col-md-8 offset-md-2">
            <div className="video-details card p-4">
              <h1 className="display-4 mb-3">{video.snippet.title}</h1>
  
              <p className="lead mb-4">
                <strong>Description:</strong> {video.snippet.description}
              </p>
  
              <p className="mb-2">
                <strong>Release Date:</strong>{' '}
                {new Date(video.snippet.publishTime).toLocaleDateString()}
              </p>
  
              <div className="d-flex align-items-center mb-3">
                <span className="mr-2">
                  <strong>Add to Favorite:</strong>
                </span>
                <span
                style={{marginLeft: "10px"}}
                  onClick={()=> handleAddToFavorite(video)}
                  className={`heart-icon ${isFavorite(video.id.videoId) ? 'favorite' : ''}`}
                >
                  {isFavorite(video.id.videoId) ? <FaHeart /> : <FaRegHeart />}
                </span>
              </div>
  
              {/* <div className="d-flex align-items-center mb-3">
                <span className="mr-2">
                  <strong>Rate:</strong>
                </span>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className={`star-icon ${star <= rating ? 'selected' : ''}`}
                    >
                      {star <= rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div> */}
  
              <div>
                <iframe
                  title="Video Player"
                  className="embed-responsive-item video-player"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  allowFullScreen
                  width="100%" // Set the width to 100%
                  height="400" // Set your preferred height
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ThisVideo;


// import React, { useContext } from 'react';
// import { useParams, useLocation } from 'react-router-dom';

// function ThisVideo() {
//   const { id } = useParams();
//   const data = useLocation();
//   const video = data.state;

//   return (
//     <div className="container mt-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.298)', borderRadius: '10px' }}>
//       <div className="row">
//         <div className="col-md-4">
//           <img src={video.snippet.thumbnails.high.url} alt="Movie Image" className="img-fluid rounded shadow-lg" />
//         </div>
//         <div className="col-md-8">
//           <h1 className="display-4">{video.snippet.title}</h1>
//           <p className="badge badge-info" style={{ backgroundColor: 'rgba(245, 83, 83, 0.8)' }}>
//             release date: {video.snippet.publishTime}
//           </p>
//           <p className="lead">{video.snippet.description}</p>
//           <hr />
//           <div className="row">
//             <div className="mt-2">
//               <div className="embed-responsive embed-responsive-16by9">
//                 <iframe
//                   className="embed-responsive-item"
//                   src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                   allowFullScreen
//                   style={{ borderRadius: '10px', width: '500px', height: '236.5px' }}
//                 ></iframe>
//               </div>
//             </div>
//             <div className="mt-2">
//               {/* You can add a Watch Now button here if needed */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ThisVideo;

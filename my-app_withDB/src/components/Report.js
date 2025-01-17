// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Report(){
//     const navigate = useNavigate();
//     const [problemType, setProblemType] = useState('');
//     const [description, setDescription] = useState('');

//     const UserID = JSON.parse(localStorage.getItem('authData')) || "0";

//     function sendReport(){
//         if(problemType != '' && description!=''){

//             fetch("http://localhost:8500/reports", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     'id':"",
//                     'userID': UserID,
//                     'problemType': problemType,
//                     'description': description
//                 }),
//             })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((data) => console.log(data[0]))
//             .catch((error) => console.error('Error:', error));

//             navigate('/dashboard');
//         }
        
//     }


//     const handleSubmit = (event) => {
//         event.preventDefault();

//         console.log('Submitted Report:');
//         console.log('Problem Type: ' + problemType);
//         console.log('Description: ' + description);

//         // You can add logic here to send the form data to the server using AJAX or fetch.
//         // You would also handle the server response accordingly.
//     };

//     return (
//         <div className="container" style={{"marginTop": "40px"}}>
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <div className="card">
//                         <div className="card-body">
//                         <h2 className="text-center mb-4">Report a Problem</h2>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                 <label htmlFor="problemType">Problem Type</label>
//                                 <select
//                                     className="form-control"
//                                     id="problemType"
//                                     value={problemType}
//                                     onChange={(e) => setProblemType(e.target.value)}
//                                     required
//                                 >
//                                     <option value="" disabled selected>
//                                     Select a problem type
//                                     </option>
//                                     <option value="bug">Bug</option>
//                                     <option value="feedback">Feedback</option>
//                                     <option value="suggestion">Suggestion</option>
//                                 </select>
//                                 </div>
//                                 <div className="form-group">
//                                 <label htmlFor="description">Description</label>
//                                 <textarea
//                                     className="form-control"
//                                     id="description"
//                                     rows="5"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                     required
//                                 ></textarea>
//                                 </div>
//                                 <div className="text-center">
//                                 <button type="submit" onClick={sendReport} className="btn btn-primary" style={{"marginTop": "20px"}}>
//                                     Submit Report
//                                 </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default Report;
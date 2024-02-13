import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useRef } from 'react';


const Admin = () => {
	const [file, setFile] = useState();
	const [ firstname, setFirstname ] = useState('');
	const [ lastname, setLastname ] = useState('');
	const [ student, setStudent ] = useState([{}]);//{ firstname: '', lastname: ''}
	const [ searchName, setSearchName ] = useState('');
	const [ searchLastName, setSearchLastname ] = useState('');
	const [ students, setStudents ] = useState([]);//array of users from DB
	const [ notes, setNotes ] = useState(<></>);
	const [ nameToDelete, setNameToDelete ] = useState('');
	const [ lastnameToDelete, setLastNameToDelete ] = useState('');
	
	//http://localhost:4000
   //https://technotes-api-v2d3.onrender.com
   const handleUpload = async (e) => {
		e.preventDefault();
		console.log(file);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		 try {
            const resp = await axios.post('https://mern-api-fcce.onrender.com/upload', 
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				)
	         //notes = (<><div>Inputed: {firstname} {lastname}</div></>);
				setNotes(<><div>Inputed: {firstname} {lastname}</div></>)
				console.log(notes)
		 } catch (err) {
			console.log(err)
		 }
	}


	let card;
	

	const handleSearch = async (e) => {
		e.preventDefault();
		try{
			const response = await axios.get('https://mern-api-fcce.onrender.com/getStudent');
			setStudents(response.data);
		  //console.log(students)
		  //console.log(card)
		} catch (err) {
			console.log(err)
		}
	}

	const showDocument = (pdf) => {
      window.open(`https://mern-api-fcce.onrender.com/${pdf}`, "_blank", "noreferrer")
		console.log('Show function work')
	}
	const closeStudent = () => {
      setSearchName('');
		setSearchLastname('');
		console.log('CLOSE STUDENT')
	}

	const handleDelete = (e) => {
		e.preventDefault();
			const resp = axios.post('https://mern-api-fcce.onrender.com/deleteStudent',{firstname: nameToDelete, lastname: lastnameToDelete}).then(res => console.log('DELETE')).catch(err=>console.log(err))
	}
	
	
	console.log(students)

	if(students.length === 0 || students === undefined) {
		card = (
		<>
		<div>No Selected User</div>
		</>);
	} else {
		const selectedStudent = students.filter(student => student.firstname === searchName && student.lastname === searchLastName);
		if(selectedStudent.length !== 0){
			card = (
				<>
				<div style={{ display: "flex", flexDirection: "column"}}>
					<p>{selectedStudent[0].firstname}</p>
					<p>{selectedStudent[0].lastname}</p>
					{/*<img src={require(`../../../../BACK-STUDENT/server/photos/${selectedStudent[0].image}`)} width="100" height="100"/>*/}
					{/*<img src={require(`../../../../BACK-STUDENT/server/photos/${selectedStudent[0].image}`)} width="100" height="100"/>*/}
					<button onClick={()=>showDocument(selectedStudent[0].image)}>Show Document</button>
					<button onClick={()=>closeStudent()}>Close student</button>
				</div>
			</>
			)
		} else {
			card = (
				<>
				<div>No User In DB</div>
				</>);
		}
		
	}

	

	return (<>
		<section>
			<h1>Admins Page</h1>
			<br />
			<p>You must have been assigned an Admin role.</p>
			<h1>Hello World</h1>
	      <h3>This is server</h3>
			{/*<img src={require(`../photo/${image}`)} width="100" height="100"  />*/}
			{/*<img src={require(`../photo/${image}`)} width="100" height="100"  />*/}
			<div className="flexGrow">
				<Link to="/">Home</Link>
			</div>
		   </section>
			<form onSubmit={handleUpload} encType="multipart/form-data">
			   <label htmlFor="username">Enter student's name</label>
				<input onChange={(e) => setFirstname(e.target.value)} id="username" type="text" name="studentname" required style={{ marginRigth: "40px" }}/>
				<label htmlFor="lastname">Enter student's lastname</label>
				<input onChange={(e) => setLastname(e.target.value)} id="lastname" type="text" name="studentlastname" required />
		      <div className="file-container">
			   <input onChange={(e) => {setFile(e.target.files[0])}} type="file" name="file" id="file"/>{/*type, name = file*/}
			   <label htmlFor="file">Choose File</label>
				{notes}
		      </div>
		      <input type="submit" value="Submit"/>
	      </form>
			<h2></h2>
			<h2>SECOND FORM</h2>
			<form onSubmit={handleSearch} style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
			   <input required onChange={(e) => setSearchName(e.target.value)} type="text" id="arrs" placeholder="name for get student..." style={ { marginBottom: "20px" } }/>{/*type, name = file*/}
			   <input required onChange={(e) => setSearchLastname(e.target.value)} type="text" placeholder="lastname for get student..."/>
			   <label htmlFor="arrs">GET FILES ARR</label>
			   <input style={ { width: "100px", height: "80px"} } type="submit" value="GET FILE"/>
			</form>
			<h2>STUDENTS WILL BE HERE</h2>
			{card}
			<h3>If You want to delete</h3>
			<form onSubmit={handleDelete} style={{display:'flex', flexDirection: 'column',justifyContent: "center", alignItems: "center"}}>
			   <input required onChange={(e) => setNameToDelete(e.target.value)} placeholder='Name...' style={ { marginBottom: "20px" } } />
			   <input required onChange={(e) => setLastNameToDelete(e.target.value)} placeholder='Lastname...' /> 
				<button>DELETE</button>
			</form>
			
			</>
	)
}



export default Admin;
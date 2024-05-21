import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllFaculty.css';
import FacultyCard from '../FacultyCard/FacultyCard';

function AllFaculty() {
    const [faculty, setFaculty] = useState([]);
    const [filteredFac, setFilteredFac] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getFaculty = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin-api/get-all-faculty-records');
                setFaculty(res.data.payload);
                setFilteredFac(res.data.payload);
            } catch (error) {
                console.error('Error fetching faculty:', error);
            }
        };
        getFaculty();
    }, []);

    useEffect(() => {
        const filtered = faculty.filter((faculty) =>
            faculty.username && faculty.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFac(filtered);
    }, [searchTerm, faculty]);

    const handleSearch = () => {
        const filtered = faculty.filter((faculty) =>
            faculty.username && faculty.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFac(filtered);
    };
    

    return (
        <div className="m-5 allfac">
            <div className="m-3 p-3 ">
                <h3><strong>Faculty</strong></h3>
            </div>
            <div className="textfield m-5">
                <input 
                    type="text" 
                    className="textfieldbar" 
                    placeholder="Search Faculty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn but" type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="row gy-5 gx-3 allarticles">
                {filteredFac.map((faculty) => (
                    <div key={faculty.facultyId} className="col-sm-12 col-md-4 col-lg-4 mb-2">
                        <FacultyCard a={faculty}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllFaculty;

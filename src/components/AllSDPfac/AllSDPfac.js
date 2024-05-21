import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SDPCard from '../SDPCard/SDPCard';
import './AllSDPfac.css';

function AllSDPfac() {
    const { currentUser } = useSelector(state => state.facultyAdminLoginReducer);
    const [sdp, setSDP] = useState([]);
    const [filteredSDP, setFilteredSDP] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [facId, setFacId] = useState('');
    const { state } = useLocation();

    useEffect(() => {
        const getfid = () => {
            if (currentUser.userType === 'faculty') {
                setFacId(currentUser.facultyId);
            } else {
                setFacId(state.facultyId);
            }
        };
        getfid();
    }, [currentUser, state]);

    useEffect(() => {
        const getSDP = async () => {
            if (facId) {
                try {
                    const res = await axios.get(`http://localhost:4000/admin-api/get-sdp-records/${facId}`);
                    setSDP(res.data.payload);
                } catch (error) {
                    console.error('Error fetching sdp records:', error);
                }
            }
        };
        getSDP();
    }, [facId]);

    useEffect(() => {
        const filtered = sdp.filter((s) =>
            s.title && s.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSDP(filtered);
    }, [searchTerm, sdp]);

    const handleSearch = () => {
        const filtered = sdp.filter((s) =>
            s.title && s.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSDP(filtered);
    };

    return (
        <div className="m-5 allsdp">
            <div className="m-3 p-3 ">
                <h3><strong>Faculty as Resource Person</strong></h3>
                <h3><strong>Faculty Id: {facId}</strong></h3>
            </div>
            <div className="textfield m-5">
                <input 
                    type="text" 
                    className="textfieldbar" 
                    placeholder="Search with title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn but" type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            {
                (filteredSDP.length==0)?
                <div className="mx-auto">
                    <h3 className="text-danger text-center">No Results</h3>
                </div>
                :
                <div className="row gy-5 gx-3 allarticles">
                {filteredSDP.map((s) => (
                    <div key={s.facultyId} className="col-sm-12 col-md-4 col-lg-4 mb-2">
                        <SDPCard s={s}/>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default AllSDPfac;

import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router'
import { Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux'
function RootLayout() {
    let {loginUserStatus,currentUser} = useSelector(state=>state.facultyAdminLoginReducer)
    let navigate = useNavigate();
useEffect(()=>{
    if(loginUserStatus===false){
        navigate('/new-user')
    }
})
    
    return (
        <div>
            {(loginUserStatus===false)?
            <Outlet/>
            :
            <div>
                <h1>currentUser.facultyId</h1>
            </div>
        }
        </div>
    )
}

export default RootLayout

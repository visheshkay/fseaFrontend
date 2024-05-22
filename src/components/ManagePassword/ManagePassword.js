import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './ManagePassword.css'

function ManagePassword() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let { loginUserStatus, currentUser } = useSelector(state => state.facultyAdminLoginReducer)
    let [err,setErr] = useState('')
    let [suc,setSuc] = useState('')
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    let navigate = useNavigate();

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const togglePasswordVisibility3 = () => {
        setShowPassword3(!showPassword3);
    };

    async function changePassword(userObj){
        console.log(userObj)
        if(userObj.newPassword != userObj.confirmnewPassword){
            setErr('New Password and Confirm do not match')
        }
        else{
            userObj.facultyId = currentUser.facultyId
            if(currentUser.userType=='faculty'){
                let res;
                res = await axios.post('http://localhost:4000/faculty-api/change-password',userObj)
                if(res.data.message==='Password updated successfully'){
                    setSuc('Password updated successfully')
                }
                else{
                    console.log(res.data.message)
                    setErr(res.data.message)
                }
            }
            else{
                let res;
                res = await axios.post('http://localhost:4000/admin-api/change-password',userObj)
                if(res.data.message==="Password updated successfully"){
                    setSuc("Password updated successfully")
                }
                else{
                    console.log(res.data.message)
                    setErr(res.data.message)
                }
            }
        }
    }

    function goBack(){
        if(currentUser.userType=='faculty'){
            navigate('/faculty/profile')
        }
        else{
            navigate('/admin/profile')
        }
    }


  return (
    <div className='container'>
        <div className=' shadow mt-5 pt-1 bg-body-tertiary rounded mx-auto manage-password-form'>
            <form className=' mx-auto bg-light formmain rounded' onSubmit={handleSubmit(changePassword)}>
                <h2 className="text-center p-1">Manage Password</h2>
                <div className='position-relative  d-flex mx-auto w-50 pass-wrapper'>
                <input type={showPassword1 ? 'text' : 'password'} id='old' className='form-control w-100 mx-auto m-1' placeholder="Old Password" {...register('password',{required:true})} />
                <i onClick={togglePasswordVisibility1} className="flex justify-around items-center">
                            {showPassword1 ? <FaEye /> : <FaEyeSlash />}
            </i>
                {errors.old?.type==='required' && <p className='text-danger'>Old password is required</p>}
                </div>
                <div className='position-relative  d-flex mx-auto w-50 pass-wrapper'>
                <input type={showPassword2 ? 'text' : 'password'} id='new' className='form-control w-100 mx-auto m-1' placeholder="New Password" {...register('newPassword',{required:true})} />
                <i onClick={togglePasswordVisibility2} className="flex justify-around items-center">
                            {showPassword2 ? <FaEye /> : <FaEyeSlash />}
            </i>
                {errors.new?.type==='required' && <p className='text-danger'>New password is required</p>}
                </div>
                <div className='position-relative  d-flex mx-auto w-50 pass-wrapper'>
                <input type={showPassword3 ? 'text' : 'password'} id='confirm' className='form-control w-100 mx-auto m-1' placeholder="Confirm New Password" {...register('confirmnewPassword',{required:true})} />
                <i onClick={togglePasswordVisibility3} className="flex justify-around items-center">
                            {showPassword3 ? <FaEye /> : <FaEyeSlash />}
            </i>
                {errors.confirm?.type==='required' && <p className='text-danger'>confirm your password</p>}
                </div>
                <div className="mx-auto">
                <button type='submit' className='btn submit-manage-button mx-auto m-3 d-block'>
                Update
                </button>
                </div>
            </form>
            {(
                err.length !== 0 &&
                <h1 className="lead text-center text-danger">{err}</h1>
            )}
            {(
                suc.length !== 0 &&
                <h1 className="lead text-center text-info">{suc}</h1>
            )}
        </div>
        <div className="ml-5">
            <button type='submit' onClick={goBack} className='btn back-manage-button'>
                Back
            </button>
        </div>
    </div>
  );
}

export default ManagePassword

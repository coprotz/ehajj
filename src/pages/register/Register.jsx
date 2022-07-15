import React, { useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import Personal from './Personal'
import Agent from './Agent'
import Passport from './Passport'
import Preview from './Preview'
import NextOfKin from './NextOfKin'
import {  FaCheck } from "react-icons/fa";
import Harem from './Harem'
import { useForm } from "react-hook-form";

const Register = () => {
    const { register,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    const harem = watch('harem')

    console.log('harem', harem)

    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    
    // const nextPage = () => {
    //     setPage(prev => prev + 1)
    // }
    const backPage = () => {
        setPage(prev => prev - 1)
    }

    const RenderPage = () => {
        if(page === 1){
            return(
                <Personal watch={watch} register={register} setPage={setPage} isValid={isValid}/>
            )
        }else if(page === 2){
            return (
                <Harem backPage={backPage} watch={watch} register={register} setPage={setPage} isValid={isValid}/>
            )
        }else if(page === 3){
            return (
                <Agent backPage={backPage} watch={watch} register={register} setPage={setPage} isValid={isValid}/>
            )
        }else if(page === 4){
            return (
                <Passport backPage={backPage} watch={watch} register={register} setPage={setPage} isValid={isValid}/>
            )
        }else if(page === 5){
            return (
                <NextOfKin backPage={backPage} watch={watch} register={register} setPage={setPage} isValid={isValid}/>
            )
        }else if(page === 6){
            return (
                <Preview backPage={backPage} watch={watch} register={register} setPage={setPage} isValid={isValid}/>
            )
        }
    }

    const width = page/6*100


  return (
    <div className='register'>
        <div className="register_left">
            <div className="register_logo">
                <h1 onClick={() => navigate('/')}>e-Hajj</h1>
            </div>
            <div className="register_left_contents">
                <h1>Assalaam Alaykum!</h1>
                <p>Kama Una Akaunti tayari tafadhari ingia Hapa</p>
                <button className='btn_register'>INGIA</button>
            </div>
        </div>
        <div className="register_right">            
            <h1 className="register_title">Fungua Akaunti</h1>
            <div className="progress_bar">
                <div className="progress_status" style={{width: `${width}%`}}></div>
                {/* <div className="step">
                    <p>Taarifa Binafsi</p>
                    <div className="bullet">
                        <span>1</span>
                        <div className="check"><FaCheck/></div>
                    </div>
                    
                </div>
                <div className="step">
                    <p>Taarifa za Wakala</p>
                    <div className="bullet">
                        <span>2</span>
                        <div className="check"><FaCheck/></div>
                    </div>
                    
                </div>
                <div className="step">
                    <p>Taarifa za Pasipoti</p>
                    <div className="bullet">
                        <span>3</span>
                        <div className="check"><FaCheck/></div>
                    </div>
                    
                </div>
                <div className="step">
                    <p>Tuma</p>
                    <div className="bullet">
                        <span>4</span>
                        <div className="check"><FaCheck/></div>
                    </div>
                    
                </div> */}
         

            </div>

            {RenderPage()}
            {/* {RenderButton()} */}
        </div>
    </div>
  )
}

export default Register
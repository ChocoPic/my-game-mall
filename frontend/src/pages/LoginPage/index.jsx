import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/userFunction';

const LoginPage = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    function submit() {
        login(id, pw).then((res) => {
            console.log(res);
            if(res.resultcode == 1){
                navigate("/");
            }
        })
    }

  return (
    <div>LoginPage
        <input value={id} onChange={(e) => setId(e.target.value)}/>
        <input value={pw} onChange={(e) => setPw(e.target.value)}/>
        <button onClick={submit}>로그인</button>
    </div>
  )
}

export default LoginPage
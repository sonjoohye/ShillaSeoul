import React  from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../scss/common.scss'
import '../../scss/login.scss'

const bkURL = process.env.REACT_APP_BACK_URL;

const LoginComp = () => {

    const navigate = useNavigate()


    function loginGo(){

        const frmData = new FormData(document.loginFrm) //아래 폼태그 name 값 가져옴
        const data = Object.fromEntries(frmData);

        console.log('loginGo() 진입');
        console.log(data);


        axios.post(`${bkURL}/login`,data)
        .then(res =>{
            // console.log('서버 응답 수신 : ', res.data);
            if(res.data){
                const mem = res.data;
                // 세션정보 저장
                sessionStorage.setItem("id", mem.member_id);
                sessionStorage.setItem("name", mem.name);
                sessionStorage.setItem("grade", mem.grade);

                alert(`${mem.name}님, 로그인 성공`);
                navigate("/");
                
            }else{
                alert("로그인 실패");
            }


        }).catch(err =>{
            console.log('서버에러 발생 : ', err);
        })
    }

    return (
        <>
            {/* <!-- 로그인 --> */}
            <div className="form-wrap">
                <div className="center">
                    <form id="shilla-login" method="post" name="loginFrm">
                        <div className="login-wrap" id="login-wrap">
                            <h2>로 그 인</h2>
                            <div className="hello">서울 신라호텔에 오신 것을 환영합니다.</div>
                            <div className="part-id">
                                <label for="id">아이디 </label>
                                <input type="text" id="id" autocomplete="on" name="id"/>
                            </div>
                            <div className="part-pw">
                                <label for="pw">비밀번호 </label>
                                <input type="password" id="pw" maxlength="16" name="pw"/>
                            </div>
                            <div className="part-error">
                                <p id="error-message" className="error-message">아이디와 비밀번호를 확인해 주세요.</p>
                                <p id="error-message2" className="error-message">패스워드는 영문, 숫자, 특수문자를 포함하여 12~16자여야 합니다.</p>
                                <p id="error-message3" className="error-message">아이디는 영문자와 숫자만(6글자 이상) 사용 가능합니다.</p>
                            </div>
                            <button type="button" className="btn-login" onClick={loginGo} >로그인</button>

                            <div className="link-wrap">
                                <Link to="/join">회원가입</Link>
                                <Link to="/findid">ID/PW찾기</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginComp;

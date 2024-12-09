import { useState, useEffect } from 'react'; // useState, useEffect 불러오기
import { useParams, useNavigate, Link } from 'react-router-dom'; // useParams, useNavigate, Link 불러오기
import axios from 'axios'; // axios 불러오기

import Header from '../../common/Header' // Header UI 불러오기
import Footer from '../../common/Footer' // Footer UI 불러오기
import AdminTabMenu from '../AdminTabMenu' // 좌측 탭메뉴 불러오기
import '../../../scss/admin.scss' // admin scss 불러오기

const AdminCont3Detail = () => {
    const navigate = useNavigate(); // 페이지 이동하는 navigate 변수
    const [ member, memberSet ] = useState(null); // 회원 정보 상태 (초기값 null)
    const [ reservation, reservationSet ] = useState([]); // 예약 정보 상태 (초기값 빈 배열)
    const { id } = useParams(); // URL에 전달된 파라미터 id 추출

    useEffect(() => { // useEffect 렌더링, API 호출하여 데이터 가져오도록 설정
        document.title = "신라호텔:관리자"
        
        const fetchReservations = async () => { // 동시 처리를 위해 비동기 함수 선언 (Promise로 객체 반환)
            try {
                const response = await axios.get(`http://localhost:5002/bk/admin/member/detail/${id}`) // 응답 데이터 response에 담기
                // await 비동기 작업 완료될 때 까지 대기(axios.get)으로 보내는 http 요청이 완료될 때 까지 대기 후 response에 할당
                // GET 요청을 보내서 특정 회원의 정보를 가져오는 작업을 수행, 요청 대기 후 response 할당
                reservationSet(response.data.reserve) // reservation의 상태 업데이트 함수, reservationSet의 응답 데이터인 reserve(예약정보 데이터)를 실행
                memberSet(response.data.mem) // member의 상태 업데이트 함수, 회원 정보를 담음, memberSet 함수에 전달해 member 상태를 업데이트
                console.log("reservationSet",response.data) // 콘솔로 응답 데이터 출력
            } catch (err) {
                console.error("예약 정보 가져오는 중 오류 발생:", err) // 오류 발생
            }
        }
        fetchReservations() // 예약을 담은 변수 실행
    }, [id]) // useParam 전달된 파라미터로 id를 한번만 실행

    if (!member) { // member가 아닌 경우
        return <>
            <Header/> 
            <div className="admin-wrap">
                <div className="center">
                    <AdminTabMenu/>
                    <div className="tab-contents">
                        <h2>{`${name}(${id})님의 회원 정보`}</h2> 
                        <div>ㅁㅁ 정보가 없습니다.</div>
                        <Link to="/admin/member">목록으로</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    }

    return (
        <>
            <div className="cont cont3">
                <Header/>
                <div className="admin-wrap">
                    <div className="center">
                        <AdminTabMenu/>
                        <div className="tab-contents">
                            <h2>{`${member.name}(${id})님의 회원 정보`}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <td>예약번호</td>
                                        <td>생일</td>
                                        <td>체크인</td>
                                        <td>체크아웃</td>
                                        <td>총금액</td>
                                        <td>성인</td>
                                        <td>어린이</td>
                                        <td>이용 현황</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.length > 0 ? (
                                        reservation.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.reservation_id} </td>
                                                <td>{item.birth} </td>
                                                <td>{`${new Date(item.start_date).getFullYear().toString().slice(2)}-
                                                ${(new Date(item.start_date).getMonth() + 1).toString().padStart(2, '0')}-
                                                ${new Date(item.start_date).getDate().toString().padStart(2, '0')}`} </td>
                                                <td>{`${new Date(item.end_date).getFullYear().toString().slice(2)}-
                                                ${(new Date(item.end_date).getMonth() + 1).toString().padStart(2, '0')}-
                                                ${new Date(item.end_date).getDate().toString().padStart(2, '0')}`} </td>
                                                <td>{item.tot_price} </td>
                                                <td>{item.adult_cnt} 명 </td>
                                                <td>{item.child_cnt} 명 </td>
                                                <td>
                                                    {item.Cancel === 1 ? "예약 취소" : `정상 이용 ${item.description ? `- ${item.description}` : ""}`}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td colspan="9">예약 정보가 없습니다.</td>
                                    )}
                                </tbody>
                            </table>
                            <Link to="/admin/member">목록으로</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default AdminCont3Detail;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../scss/paymentPage.module.scss";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 데이터를 갖고옴
  const {
    reservationDate,
    roomType,
    // adultBf,
    // childBf,
    // extraBed,
    productId,
    paySum,
  } = location.state || {};

  console.log("체크인, 체크아웃 날짜 : ", reservationDate);
  console.log("객실 : ", roomType);
  console.log("paySum : ", paySum);
  console.log("product_id : ", productId);

  // 상태
  // const [reservationDate, setReservationDate] = useState("");
  // const [roomName, setRoomName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBoth = async () => {
    const reservationId = await handleReservation(); // 예약 처리 후 예약 ID 반환
    if (reservationId) {
      await handlePayment(reservationId); // 예약이 완료되면 결제 처리
    }
  };

  const handleReservation = async () => {
    if (!accountNumber || !name || !phoneNumber) {
      alert("모든 내용을 작성해주세요.");
      return;
    }

    // 예약 데이터를 준비합니다.
    const reservationData = {
      memberId: name,
      productId: productId,
      startDate: reservationDate.split(" ~ ")[0],
      endDate: reservationDate.split(" ~ ")[1],
      totPrice: paySum,
      adultCnt: 1,
      childCnt: 0,
      cancel: 0, // 기본 취소 여부
    };

    try {
      // axios를 사용하여 서버로 예약 데이터를 전송합니다.
      const response = await axios.post(
        "http://192.168.0.13:5002/bk/reserve/save",
        reservationData
      );

      if (response.status === 201) {
        alert("예약이 완료되었습니다!");
        const reservationId = response.data.reservationId;
        return reservationId; // 예약 ID를 반환하여 결제 함수로 전달
      } else {
        alert("예약 저장에 실패했습니다.");
        return null;
      }
    } catch (error) {
      console.error("예약 저장 오류:", error);
      alert("서버에 연결할 수 없습니다. 다시 시도해주세요.");
      return null;
    }
  };

  // 날짜에 하루를 더하는 함수
  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // 하루를 더함
    return newDate; // 날짜 객체를 반환
  };

  const handlePayment = async (reservationId) => {
    // 결제 ID (8자리 랜덤 숫자)
    const paymentId = Math.floor(Math.random() * 90000000) + 10000000; // 8자리 랜덤 결제 ID 생성
    const paymentDate = addOneDay(new Date())
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // 하루를 더한 결제 시각

    // 결제 데이터를 준비합니다.
    const paymentData = {
      paymentId: paymentId,
      reservationId: reservationId,
      paymentDate: paymentDate,
      paymentAmount: paySum,
      refund: "0",
      refundDate: null,
      refundAmount: null,
    };

    try {
      const paymentResponse = await axios.post(
        "http://192.168.0.13:5002/bk/reserve/savepayment", // 결제 저장 API
        paymentData
      );

      if (paymentResponse.status === 201) {
        alert("결제가 완료되었습니다!");
        navigate("/"); // 결제 완료 후 홈페이지로 이동
      } else {
        alert("결제 저장에 실패");
      }
    } catch (error) {
      console.error("결제 저장 오류:", error);
      alert("서버에 연결할 수 없습니다.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.paymentContainer}>
      <h2>결제 페이지</h2>
      <form className={styles.paymentForm}>
        <div> 예약날짜 : {reservationDate}</div>
        <div> 룸이름 : {roomType}</div>
        <div className={styles.formGroup}>
          <label htmlFor="accountNumber">카드번호:</label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="카드번호 입력"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">전화번호:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호 입력"
          />
        </div>
        {/* <ul>
          <li>성인 조식: {adultBf}</li>
          <li>어린이 조식: {childBf}</li>
          <li>엑스트라 베드: {extraBed}</li>
        </ul> */}
        <p>총 결제 금액: {paySum.toLocaleString()}원</p>
      </form>
      <div className={styles.buttonContainer}>
        <button onClick={handleBoth}>결제 완료</button>
        <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
}
export default PaymentPage;

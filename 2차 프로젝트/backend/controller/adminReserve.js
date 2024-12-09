const express = require("express");
const conn = require("../db");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.get("/", async (req, res) => {
  console.log("연결 접근");

  try {
    // 오늘 날짜를 기준으로 예약을 가져오는 쿼리
    const [rows] = await conn.execute(
      `SELECT r.reservation_id, r.member_id, r.start_date, r.end_date, r.adult_cnt, r.child_cnt, r.tot_price,
    CASE
        WHEN p.offer_id IS NOT NULL THEN o.offer_name
        ELSE pr.room_type
    END AS room_or_offer
FROM
    reservation r
LEFT JOIN
    product p ON r.product_id = p.product_id
LEFT JOIN
    room pr ON p.room_id = pr.room_id
LEFT JOIN
    specialoffer_pkg o ON p.offer_id = o.offer_id
WHERE
    r.start_date = CURDATE();`
    );

    if (rows.length > 0) {
      res.status(200).json(rows); // 예약 정보 반환
      console.log(rows);
    } else {
      res.status(200).json([]); // 예약이 없는 경우 빈 배열 반환
      console.log("쿼리 에러");
    }
  } catch (err) {
    console.log("연결 실패", err);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;

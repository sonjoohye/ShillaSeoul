const express = require("express");
const conn = require("../db");
const router = express.Router();
const cors = require("cors");

router.use(cors());

// Chart1 DB 연결
router.get('/', async (req, res) => {
    console.log("연결 접근")

    try {
        const [roomValue] = await conn.execute("SELECT room_id, max_occupancy, day_price, room_type, bed_type FROM room")
        console.log("연결 성공", roomValue)
        res.send(roomValue)
        
    } catch (err) {
        console.log("연결 실패", err)
        res.status(500).send("서버 오류")
    }
})

module.exports = router
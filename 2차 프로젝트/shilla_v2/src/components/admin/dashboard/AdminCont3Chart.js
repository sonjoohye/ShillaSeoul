import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 차트 옵션 설정
const options = {
  type: 'bar',
  indexAxis: 'y',
  responsive: true,
  interaction: {
    intersect: true,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "매출금액",
        font: {
          size: 14,
        },
      }
    },
  },
  options: {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
  },
};

const AdminCont3Chart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/bk/admin/dashboard/sell')
        console.log(response.data)
        
        const lastMM = response.data.lastMM;
        const nowMM = response.data.nowMM;

        const labels = lastMM.map((item) => item.room_type)
        const roomSell = lastMM.map((item) => item.tot_price)
        const roomNowSell = nowMM.map((item) => item.tot_price)

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "객실별 지난 달 현황",
              data: roomSell,
              backgroundColor: "#ffb1c1",
              borderColor: "#ff6384",
              fill: false,
              tension: 0.1,
            },
            {
              label: "객실별 이번 달 현황",
              data: roomNowSell,
              backgroundColor: "#63ce2a",
              borderColor: "#63ce2a",
              fill: false,
              tension: 0.1,
            },
          ],
        })
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    }

    fetchData()
  }, []);

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  )
}

export default AdminCont3Chart;

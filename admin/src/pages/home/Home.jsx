import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import STATIC_DATA from '../../components/chart/data';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../redux/requestMethods';

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jui',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');

        res.data.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total }
          ]);
        });
      } catch (error) {}
    };
    getStats();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        title="User Analytics"
        data={userStats}
        dataKey="Active User"
        grid
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

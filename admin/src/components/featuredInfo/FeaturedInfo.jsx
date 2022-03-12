import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { userRequest } from '../../redux/requestMethods';

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState([]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get('/orders/income');
        setIncome(res.data);
      } catch (error) {}
    };

    income.length === 0 && getIncome();
    if (income.length > 0)
      setPerc((income[1]?.total * 100) / income[0]?.total - 100);
  }, [income.length]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featureMoneyRate">
            %{Math.floor(perc)}
            {Math.floor(perc) >= 0 ? (
              <ArrowUpward className="featuredIcon " />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compare to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featureMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compare to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featureMoneyRate">
            2.4 <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featuredSub">Compare to last month</span>
      </div>
    </div>
  );
}

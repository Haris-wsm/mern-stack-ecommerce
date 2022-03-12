import './widgetSm.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { userRequest } from '../../redux/requestMethods';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get('/users?new=true');
        setUsers(res.data);
      } catch (error) {}
    };
    getUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Member</span>
      <ul className="widgetList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Dispaly
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

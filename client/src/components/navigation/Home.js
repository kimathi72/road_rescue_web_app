import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    switch (!user) {
      case true:
        navigate('/signin');
        break;
      default:
        navigate(`/${user['role']}`);
        break;
    }
  }, [user, navigate]);
  return (<p>Loading</p>)
}

import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    switch ("id" in user) {
      case true:
        navigate(`/${user['type'].toLowerCase()}`);
        break;
      default:
        navigate('/signin');
        break;
    }
  }, [user, navigate]);
  return (<p>Loading</p>)
}

import React, { useState, useCallback, useEffect } from "react";
import api from '../api'
const User = () => {
  const [data, setData] = useState()

  const fetchData = useCallback(async () => {
    const res = await api.getuser()
    setData(res?.data)
  }, []);
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div>
      <span>{data?.firstname}</span>
    </div>
  );
};

export default User;

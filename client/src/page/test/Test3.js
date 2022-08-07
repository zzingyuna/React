import React, { useEffect } from 'react';
import axios from 'axios';

function Test3() {

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        'http:localhost:3001/abc',
        {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <div>
        <button onClick={fetchUsers}>docx 저장하기</button>
      </div>
  );
}

export default Test3;
import React, { useState, useEffect } from "react";

function History() {
  const [history, setHistory] = useState([]); // 히스토리 데이터를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지 저장

  useEffect(() => {
    // Flask 서버에서 히스토리 데이터를 가져옴
    fetch("/history")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHistory(data); // 성공적으로 데이터 가져오면 상태 업데이트
      })
      .catch((err) => {
        setError(`Error: ${err.message}`); // 에러 발생 시 처리
      });
  }, []);

  if (error) {
    return <p>{error}</p>; // 에러 메시지 표시
  }

  if (history.length === 0) {
    return <p>No history available.</p>; // 히스토리가 없는 경우 메시지 표시
  }

  return (
    <div>
      <h2>Challenge History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.task} - {item.date_completed}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;

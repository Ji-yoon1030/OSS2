// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "./History.module.css";

// function History() {
//   const [history, setHistory] = useState([]); // 히스토리 데이터 상태
//   const [error, setError] = useState(null); // 에러 상태

//   // 히스토리 데이터 삭제
//   const handleClearHistory = () => {
//     fetch("/clear-history", {
//       method: "DELETE", // 올바른 HTTP 메소드로 변경
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(() => {
//         setHistory([]); // 히스토리 상태 초기화
//       })
//       .catch((err) => {
//         setError(`Error clearing history: ${err.message}`);
//       });
//   };

//   // 히스토리 데이터 가져오기
//   useEffect(() => {
//     fetch("/history")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setHistory(data); // 성공적으로 데이터 가져오면 상태 업데이트
//       })
//       .catch((err) => {
//         setError(`Error fetching history: ${err.message}`);
//       });
//   }, []);

//   // 에러 메시지 출력
//   if (error) {
//     return <p className={styles.errorMessage}>{error}</p>;
//   }

//   // 히스토리가 없을 때 출력
//   if (history.length === 0) {
//     return (
//       <div className={styles.historyContainer}>
//         <h2 className={styles.title}>Challenge History</h2>
//         <p className={styles.emptyMessage}>No history available.</p>
//         <div className={styles.buttonContainer}>
//           <Link to="/challenge" className={styles.backButton}>
//             Back to Challenge
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // 히스토리가 있을 때 출력
//   return (
//     <div className={styles.historyContainer}>
//       <h2 className={styles.title}>Challenge History</h2>
//       <ul className={styles.historyList}>
//         {history.map((item, index) => (
//           <li key={index} className={styles.historyItem}>
//             <span className={styles.task}>{item.task}</span>
//             <span className={styles.date}>{item.date_completed}</span>
//           </li>
//         ))}
//       </ul>
//       <div className={styles.buttonContainer}>
//         <button onClick={handleClearHistory} className={styles.clearButton}>
//           Clear History
//         </button>
//         <Link to="/challenge" className={styles.backButton}>
//           Back to Challenge
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default History;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./History.module.css";

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/history")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHistory(data);
      })
      .catch((err) => {
        setError(`기록을 불러오는 중 오류가 발생했습니다: ${err.message}`);
      });
  }, []);

  const handleClearHistory = () => {
    fetch("/clear-history", {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setHistory([]);
      })
      .catch((err) => {
        setError(`기록 삭제 중 오류가 발생했습니다: ${err.message}`);
      });
  };

  const handleNewChallenge = () => {
    navigate("/");
  };

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  if (history.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>도전 기록</h2>
          <p className={styles.emptyMessage}>아직 도전 기록이 없습니다.</p>
          <div className={styles.buttonContainer}>
            <Link to="/challenge" className={styles.backButton}>
              도전하러 가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>도전 기록</h2>
        </div>
        <ul className={styles.historyList}>
          {history.map((item, index) => (
            <li key={index} className={styles.historyItem}>
              <span className={styles.task}>{item.task}</span>
              <span className={styles.date}>
                {new Date(item.date_completed).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          <button onClick={handleClearHistory} className={styles.clearButton}>
            기록 삭제
          </button>
          <button onClick={handleNewChallenge} className={styles.switchButton}>
            카테고리 선택
          </button>
          <Link to="/challenge" className={styles.backButton}>
            도전으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default History;

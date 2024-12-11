import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Challenge.module.css";

function Challenge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchNewChallenge = () => {
    if (category) {
      const url = `/get-challenge?category=${encodeURIComponent(category)}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setChallenge(data);
          }
        })
        .catch((err) => {
          setError(`Error fetching challenge: ${err.message}`);
        });
    }
  };

  const handleComplete = () => {
    if (challenge) {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 20, 100);

        if (newProgress === 100 && !hasShownAlert) {
          setShowModal(true);
          setHasShownAlert(true);
        }

        return newProgress;
      });

      // Save to history
      fetch("/add-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: challenge.task }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save progress");
          }
          return response.json();
        })
        .then(() => {
          // Always fetch new challenge, even after 100%
          fetchNewChallenge();
        })
        .catch((err) => {
          console.error("Error saving progress:", err.message);
        });
    }
  };

  const handleSwitchCategory = () => {
    navigate("/home");
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  useEffect(() => {
    fetchNewChallenge();
  }, [category]);

  return (
    <div className={styles.container}>
      {showModal && (
        <>
          <div className={styles.modalOverlay} />
          <div className={styles.modal}>
            <div className={styles.modalEmoji}>🎉</div>
            <h2 className={styles.modalTitle}>축하합니다!</h2>
            <p className={styles.modalText}>
              오늘의 모든 챌린지를 완료하셨습니다! <br />
              당신의 노력이 더 나은 내일을 만들어갑니다. ✨
            </p>
            <button
              className={styles.modalButton}
              onClick={() => setShowModal(false)}
            >
              계속하기 💪
            </button>
          </div>
        </>
      )}

      <div className={styles.wrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>오늘의 챌린지</h2>
            <div className={styles.streakCounter}>
              <span className={styles.streakText}>🔥 3일째</span>
            </div>
          </div>

          {!category && (
            <div className={styles.noCategory}>
              <h3 className={styles.title}>카테고리를 선택하세요!</h3>
              <p>챌린지를 시작하려면 카테고리를 선택해주세요.</p>
              <button
                onClick={() => navigate("/home")}
                className={styles.primaryButton}
              >
                시작하기
              </button>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p className={styles.errorText}>오류가 발생했습니다: {error}</p>
            </div>
          )}

          {!challenge && !error && category && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
            </div>
          )}

          {challenge && (
            <div>
              <div className={styles.xpBadge}>
                <span className={styles.xpText}>
                  {progress >= 100 ? "보너스 경험치 +20" : "+20 경험치"}
                </span>
              </div>

              <div className={styles.challengeCard}>
                <h3 className={styles.title}>
                  {progress >= 100 ? "보너스 챌린지:" : "오늘의 도전:"}
                </h3>
                <p>{challenge.task}</p>
              </div>

              <div className={styles.buttonGrid}>
                <button
                  onClick={handleComplete}
                  className={styles.primaryButton}
                >
                  완료
                </button>
                <button
                  onClick={handleViewHistory}
                  className={styles.primaryButton}
                >
                  기록 보기
                </button>
                <button
                  onClick={handleSwitchCategory}
                  className={styles.secondaryButton}
                >
                  카테고리 변경
                </button>
                <button
                  onClick={fetchNewChallenge}
                  className={styles.secondaryButton}
                >
                  다른 챌린지
                </button>
              </div>

              <div className={styles.motivationalText}>
                <p>
                  {progress >= 100
                    ? "추가 도전으로 더 큰 성장을 이루세요! 💪"
                    : "연속 달성으로 더 높은 목표를 향해! 🎯"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Challenge;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Challenge.module.css";

function Challenge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState(null);

  const handleViewProgress = () => {
    if (challenge) {
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
        .then((data) => {
          console.log("Progress saved:", data);
          navigate("/history"); // 저장 후 히스토리 페이지로 이동
        })
        .catch((err) => {
          console.error("Error saving progress:", err.message);
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (category && isMounted) {
      fetch(`/get-challenge?category=${category}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (isMounted) {
            if (data.task) {
              setChallenge(data);
            } else if (data.error) {
              setError(data.error);
            }
          }
        })
        .catch((err) => {
          if (isMounted) setError(`Error: ${err.message}`);
        });
    }
    return () => {
      isMounted = false; // 언마운트 시 상태 업데이트 방지
    };
  }, [category]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Daily Challenge</h2>
            <div className={styles.streakCounter}>
              <span className={styles.streakText}>🔥 3</span>
            </div>
          </div>

          {!category && (
            <div className={styles.noCategory}>
              <h3 className={styles.title}>Choose Your Path!</h3>
              <p>Select a category to start your challenge journey.</p>
              <button
                onClick={() => navigate("/")}
                className={styles.primaryButton}
              >
                Start Learning
              </button>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p className={styles.errorText}>Oops! {error}</p>
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
                <span className={styles.xpText}>+20 XP</span>
              </div>

              <div className={styles.challengeCard}>
                <h3 className={styles.title}>Your Challenge:</h3>
                <p>{challenge.task}</p>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  onClick={handleViewProgress}
                  className={styles.primaryButton}
                >
                  View Progress
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className={styles.secondaryButton}
                >
                  Skip Challenge
                </button>
              </div>

              <div className={styles.motivationalText}>
                <p>Complete this challenge to maintain your streak! 🎯</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Challenge;

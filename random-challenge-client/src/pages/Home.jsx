import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const categories = [
    { value: "운동", label: "운동", emoji: "💪" },
    { value: "요리", label: "요리", emoji: "🍳" },
    { value: "자기계발", label: "자기계발", emoji: "📚" },
    { value: "창의적 활동", label: "창의적 활동", emoji: "🎨" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      navigate("/challenge", { state: { category } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>오늘의 챌린지</h1>
          <p className={styles.subtitle}>
            당신의 카테고리를 선택하고 도전을 시작하세요!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>챌린지 카테고리 선택:</label>
            <div className={styles.categories}>
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  className={`${styles.categoryCard} ${
                    category === cat.value ? styles.selected : ""
                  }`}
                  onClick={() => setCategory(cat.value)}
                >
                  <div className={styles.emoji}>{cat.emoji}</div>
                  <div>{cat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.button} disabled={!category}>
            챌린지 시작하기 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;

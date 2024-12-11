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
          <h1 className={styles.title}>Daily Challenge</h1>
          <p className={styles.subtitle}>
            Choose your category and start your journey today!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>
              Select Your Challenge Category:
            </label>
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
            Start Challenge 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;

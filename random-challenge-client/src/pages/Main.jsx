import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";

function Main() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>나를 발전시키는 건강한 도파민</h1>
          <p className={styles.subtitle}>
            매일매일 작은 도전으로 시작하는 긍정적인 변화
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <span className={styles.emoji}>🎯</span>
            <h3>일일 도전 과제</h3>
            <p>매일 새로운 도전 과제로 건강한 습관을 만들어보세요</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.emoji}>💪</span>
            <h3>운동 챌린지</h3>
            <p>간단한 스트레칭부터 홈트레이닝까지 건강한 몸 만들기</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.emoji}>🍳</span>
            <h3>요리 챌린지</h3>
            <p>건강한 식습관을 위한 홈쿠킹 레시피 도전하기</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.emoji}>📊</span>
            <h3>자기계발</h3>
            <p>독서, 학습, 명상 등 나를 성장시키는 활동들</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.emoji}>🎨</span>
            <h3>창의적 활동</h3>
            <p>그림 그리기, 글쓰기 등 창의력을 키우는 도전</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.emoji}>✨</span>
            <h3>성취의 기록</h3>
            <p>나만의 도전 히스토리로 성장의 여정을 기록하세요</p>
          </div>
        </div>

        <div className={styles.description}>
          <h2>건강한 도파민 프로젝트란?</h2>
          <p>
            SNS나 게임에서 얻는 즉각적인 도파민이 아닌, 작은 도전과 성취를 통해
            얻는 건강한 도파민으로 멋진 삶을 만들어보세요.
          </p>
          <p>
            매일 새로운 챌린지에 도전하고, 그 과정을 기록하면서 스스로의 성장을
            확인할 수 있습니다.
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={() => navigate("/home")}
            className={styles.primaryButton}
          >
            도전 시작하기 🚀
          </button>
          <button
            onClick={() => navigate("/history")}
            className={styles.secondaryButton}
          >
            나의 기록 보기 📝
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;

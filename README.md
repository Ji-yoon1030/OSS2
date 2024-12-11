# 🌟 랜덤 챌린지 앱 (Random Challenge App)

**"오늘, 당신은 어떤 도전을 해볼까요?"**

**랜덤 챌린지 앱**은 사용자가 하루를 더 특별하게 보낼 수 있도록 **운동**, **요리**, **자기계발**, **창의적 활동** 중 하나를 선택하고, 랜덤하게 주어진 챌린지를 수행하도록 돕는 웹사이트 입니다.

---

## 📋 목차
1. [프로젝트 개요](#-프로젝트-개요)
2. [주요 기능](#-주요-기능)
3. [기술 스택](#-기술-스택)
4. [데이터베이스 구조](#-데이터베이스-구조)
5. [개발 중 어려움과 해결 방법](#-개발-중-어려움과-해결-방법)
6. [프로젝트의 장점](#-프로젝트의-장점)
7. [개선할 점](#-개선할-점)
8. [유사한 플랫폼과 비교](#-유사한-플랫폼과-비교)
9. [프로젝트 실행 방법](#-프로젝트-실행-방법)

---

## 🧐 동기 및 프로젝트 개요
### 동기
숏폼만 하루종일 쳐다보는 오늘날, 우리는 속된 말로 **도파민에 절여져서 사는 것 같아..** 라며 하루를 허무하게 보냅니다. 하지만 이 도파민을 건강한 도파민으로 바꾸고 싶었습니다. 그래서 생각한게 "매일매일 나에게 즐거운 도전과제가 주어진다면?" 이었습니다.

세상에서 해야할 과제는 수도없이 많습니다. 하지만 즉각적으로 **성장**을 느끼기에는 어려운 힘든 과제들이 대부분입니다. 제 프로젝트는 크고 험한 과제에 잠시 벗어나 나를 위한 도전을 할 수 있도록 도와주는 웹사이트 입니다.
이 웹사이트로 모두의 잔잔하고 고요하지만 힘이 되어주는 🌳 숲을 느끼게 해드리고 싶습니다. 

- 사용자는 4가지 카테고리(운동, 요리, 자기계발, 창의적 활동) 중 하나를 선택합니다.
- 선택한 카테고리와 난이도(쉬움, 보통, 어려움)에 따라 랜덤한 챌린지를 제공합니다.
- 완료된 챌린지는 **히스토리**에 저장되어 언제든 확인 가능합니다.
- 히스토리 삭제 버튼으로 기록을 초기화하고 새로운 챌린지를 시작할 수 있습니다.

---

## 🛠 주요 기능

### 🔹 **랜덤 챌린지 제공**
- 사용자가 선택한 카테고리와 난이도에 맞는 도전을 제공합니다.  
- **예시**:  
  - **운동**: 하루 7,000보 걷기.  
  - **요리**: 냉장고 재료로 창작 요리하기.  
  - **자기계발**: 30분 동안 책 읽기.  
  - **창의적 활동**: 30분 동안 그림 그리기.

### 🔹 **히스토리 기록**
- 사용자가 완료한 챌린지를 저장해 성취감을 느낄 수 있도록 합니다.  
- 히스토리 페이지에서 챌린지와 완료 시간을 확인 가능합니다.

### 🔹 **히스토리 초기화**
- 버튼 클릭 한 번으로 히스토리를 초기화하여 새로운 시작을 할 수 있습니다.

---

## 🏗 기술 스택

### 프론트엔드
- **React.js**: 컴포넌트 기반 UI 개발.
- **CSS 모듈**: 직관적이고 반응형 디자인.

### 백엔드
- **Flask**: RESTful API로 데이터 처리.
- **Flask-CORS**: 프론트엔드와의 통신 문제 해결.

### 데이터베이스
- **SQLite**: 가볍고 빠른 로컬 데이터 저장.
- **SQLAlchemy**: ORM을 사용해 간단하고 효율적인 데이터베이스 관리.

---

## 🗄 데이터베이스 구조 (일부 예시)

```plaintext
Challenge
+----+--------------+-----------------------------------+------------+
| id | category     | task                              | difficulty |
+----+--------------+-----------------------------------+------------+
| 1  | 운동         | 하루 동안 만 걸음 수 7,000보 걷기 | 쉬움       |
| 2  | 요리         | 냉장고 재료로 샌드위치 만들기     | 쉬움       |
| 3  | 자기계발     | 30분 동안 책 읽기                | 보통       |
| 4  | 창의적 활동  | 30분 동안 그림 그리기            | 쉬움       |
+----+--------------+-----------------------------------+------------+

UserHistory
+----+-----------------------+---------------------+
| id | task                  | date_completed      |
+----+-----------------------+---------------------+
| 1  | 하루 동안 만 걸음 수  | 2024-12-10 15:00:00 |
| 2  | 냉장고 재료로 요리하기 | 2024-12-11 12:00:00 |
+----+-----------------------+---------------------+
```

## 🧗‍♀️ 개발 중 어려움과 해결 방법

### 1. **React와 Flask 간 CORS 문제**
- **문제**: 프론트엔드(React)와 백엔드(Flask) 간의 데이터 요청 시 발생한 CORS(Cross-Origin Resource Sharing) 관련 오류로 인해 통신이 제대로 이루어지지 않았습니다.
- **해결 방법**: 
  1. `Flask-CORS` 라이브러리를 설치.
     ```bash
     pip install flask-cors
     ```
  2. Flask의 라우트에 `@cross_origin` 데코레이터 추가.
     ```python
     from flask_cors import CORS, cross_origin
     
     CORS(app)
     
     @app.route('/example', methods=['GET'])
     @cross_origin()
     def example():
         return jsonify({"message": "Success"})
     ```

### 2. **랜덤 로직 설계**
- **문제**: 동일한 챌린지가 여러 번 반복적으로 제공되는 문제가 발생했습니다.
- **해결 방법**: 
  1. Python의 `random.sample()`을 활용하여 중복을 방지.
  2. 제공된 챌린지를 기록하고 해당 데이터를 제외한 나머지에서만 랜덤하게 선택하도록 SQLAlchemy 쿼리 수정.
     ```python
     challenges = Challenge.query.filter(~Challenge.id.in_(completed_ids)).all()
     random_challenge = random.choice(challenges)
     ```

### 3. **히스토리 데이터 관리**
- **문제**: 히스토리 데이터를 초기화하거나 새로운 데이터를 추가한 후에도 React UI에 업데이트가 반영되지 않았습니다.
- **해결 방법**:
  1. React의 `useState`와 `useEffect`를 활용하여 상태 관리.
  2. 데이터 변경 후 UI가 자동으로 업데이트되도록 `setHistory` 호출.
     ```javascript
     const handleClearHistory = async () => {
         await fetch('/clear-history', { method: 'DELETE' });
         setHistory([]); // UI를 업데이트
     };
     ```

---

## ✨ 프로젝트의 장점

- **간단한 UI**: 직관적이고 간단한 디자인으로 모든 사용자가 쉽게 접근 가능.
- **다양한 활동 제공**: 운동, 요리, 자기계발, 창의적 활동의 폭넓은 카테고리 제공.
- **확장 가능성**: 새로운 카테고리나 챌린지 데이터를 쉽게 추가할 수 있는 구조.

---

## 🚀 개선할 점

1. **소셜 기능 추가**:
   - 다른 사용자와 챌린지를 공유하거나 경쟁할 수 있는 시스템 구축.
2. **계정 관리 기능**:
   - 사용자 맞춤 데이터를 저장하고 장기적으로 관리할 수 있는 계정 기능 추가.
3. **모바일 최적화**:
   - 모바일 사용자를 위한 반응형 디자인 개선 및 전용 앱 개발.

---

## 🔍 유사한 플랫폼과 비교

| 기능                     | 랜덤 챌린지 앱         | Habitica                | 30-Day Challenge Apps |
|--------------------------|-----------------------|-------------------------|-----------------------|
| **랜덤 챌린지 제공**     | ✅                    | ❌                      | ❌                    |
| **카테고리별 활동**       | ✅                    | ✅                      | ❌                    |
| **히스토리 기록**         | ✅                    | ❌                      | 일부 지원             |
| **소셜 기능**             | ❌                    | ✅                      | ❌                    |

---

## 💻 프로젝트 실행 방법

### 필수 요구사항
- Python 3.9 이상
- Node.js (React 프론트엔드 실행용)

### 설치 및 실행

#### 1. **프로젝트 클론**
```bash
git clone https://github.com/your-repo/random-challenge-app.git
cd random-challenge-app
```

#### 2. 백엔드 실행
```
cd backend
pip install -r requirements.txt
flask run
```

#### 3. 프론트엔드 실행
```
cd frontend
npm install
npm start
```

#### 3. 실행
브라우저에서 http://127.0.0.1:3000으로 접속하여 웹사이트를 확인합니다.

#### 4. 동영상으로 시청하기
[https://youtu.be/3GNe41yLHPc](url)

## 🎉 결론

**랜덤 챌린지 앱**은 작은 도전으로 일상에 변화를 주고, 재미와 성취감을 동시에 느낄 수 있도록 설계되었습니다. 이 프로젝트는 기술적 성장뿐만 아니라 사용자 경험을 중심으로 한 개발 과정을 통해 더욱 의미 있는 결과물을 만들어 냈습니다.

**이 프로젝트의 핵심 가치는 다음과 같습니다**:
- 일상의 루틴에서 벗어나 새로운 경험을 제공합니다.
- 다양한 카테고리를 통해 사용자의 흥미와 관심을 만족시킵니다.
- 간단한 디자인과 기능으로 누구나 쉽게 사용할 수 있습니다.

**향후 목표**:
- 사용자 데이터를 기반으로 한 **맞춤형 챌린지 추천** 기능 추가.
- 챌린지를 공유하거나 친구들과 경쟁할 수 있는 **소셜 기능** 도입.
- **모바일 앱** 개발을 통해 어디서나 접근 가능한 플랫폼으로 확장.

**"작은 도전으로 시작해 큰 변화를 만들어 보세요!"**

---

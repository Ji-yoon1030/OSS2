from flask import Blueprint, render_template, request, redirect, url_for, flash
from . import db
from .models import Challenge, UserHistory
import random
from datetime import datetime


from flask import Blueprint, jsonify, request
from .models import Challenge, UserHistory
import random

bp = Blueprint('api', __name__)

@bp.route('/get-challenge', methods=['GET'])
def get_challenge():
    category = request.args.get('category')
    if not category:
        return jsonify({"error": "Category is required"}), 400

    challenges = Challenge.query.filter_by(category=category).all()
    if challenges:
        challenge = random.choice(challenges)
        return jsonify({"task": challenge.task})  # JSON 데이터 반환
    return jsonify({"error": "No challenges available for this category"}), 404

@bp.route('/history', methods=['GET'])
def history():
    # UserHistory는 데이터베이스에서 완료된 챌린지 기록을 저장하는 모델로 가정합니다.
    user_history = UserHistory.query.all()  # 모든 히스토리 가져오기
    history = [
        {
            "task": h.task,
            "date_completed": h.date_completed.strftime("%Y-%m-%d %H:%M:%S")
        }
        for h in user_history
    ]
    return jsonify(history)

@bp.route('/add-history', methods=['POST'])
def add_history():
    data = request.json  # React에서 전송된 데이터
    task = data.get('task')  # 완료된 챌린지
    if not task:
        return jsonify({"error": "Task is required"}), 400  # 에러 반환

    # 데이터 저장
    new_history = UserHistory(task=task, date_completed=datetime.now())
    db.session.add(new_history)
    db.session.commit()

    return jsonify({"message": "History added successfully!"}), 201

@bp.route('/clear-history', methods=['DELETE'])
def clear_history():
    try:
        # 모든 히스토리 삭제
        num_deleted = db.session.query(UserHistory).delete()
        db.session.commit()
        return jsonify({"message": f"{num_deleted} history records deleted!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@bp.route('/')
def index():
    return render_template('index.html')

# @bp.route('/get-challenge', methods=['POST'])
# def get_challenge():
#     category = request.form.get('category')
#     challenge = get_random_challenge(category)
#     if challenge:
#         return render_template('challenge.html', challenge=challenge)
#     flash("No challenges available for this category")
#     return redirect(url_for('index'))

# @bp.route('/history')
# def history():
#     user_history = UserHistory.query.all()
#     return render_template('history.html', history=user_history)
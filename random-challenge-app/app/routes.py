from flask import Blueprint, render_template, request, redirect, url_for, flash
from . import db
from .models import Challenge, UserHistory
import random


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
# bp = Blueprint('main', __name__)

# def get_random_challenge(category):
#     challenges = Challenge.query.filter_by(category=category).all()
#     return random.choice(challenges) if challenges else None

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
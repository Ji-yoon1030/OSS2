# Placeholder for Python file
from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField

class CategoryForm(FlaskForm):
    category = SelectField('Select Category', choices=[
        ('운동', '운동'),
        ('요리', '요리'),
        ('자기계발', '자기계발'),
        ('창의적 활동', '창의적 활동')
    ])
    submit = SubmitField('Get Challenge')
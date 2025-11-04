from rest_framework import serializers
from .models import Quiz, Question, Option

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option_text']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'correct_option', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'student', 'title', 'total_score', 'created_at', 'questions']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            options_data = question_data.pop('options')
            question = Question.objects.create(quiz=quiz, **question_data)
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)

        return quiz

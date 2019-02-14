import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
const orderFile = require('./ListOrder.json')

class Quiz extends Component{

    state = orderFile

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.correctAnswer === answerId){

            if(!results[answerId]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })
        }else{
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }

        const timeOut = window.setTimeout(() => {
            if(this.isQuizFinished()){
                this.setState({
                    isFinished: true
                })
            }else{
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeOut)
        }, 1000)
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Тестовый тест</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                        : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                qestion={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNum={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz
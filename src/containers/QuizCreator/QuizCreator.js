import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import Select from '../../components/Ui/Select/Select'
import Aixillary from '../../hoc/Aixillary/Aixillary'
import {createControl, validate, validateForm} from '../../form/formFramework'

function createOptionControl(number) {
    return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Некорректное значение',
            id: number
        }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Поле не может быть пустым'
        }, {required: true}),
            option1: createOptionControl(1),
            option2: createOptionControl(2),
            option3: createOptionControl(3),
            option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        isForValid: false
    }

    submitHundler = event => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()
    }

    createQuizHandler() {

    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Aixillary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Aixillary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render(){
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>
                        Создание тестов
                    </h1>
                    <form action="" onSubmit={this.submitHundler}>
                        {this.renderControls()}

                        {select}
                        
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isForValid}
                        >Добавить вопрос</Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={!this.state.isForValid}
                        >Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator
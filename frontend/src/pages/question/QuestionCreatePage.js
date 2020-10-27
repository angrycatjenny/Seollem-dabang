import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';
// History
import { useHistory } from "react-router-dom";

//materialUI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


// CSS
import './QuestionCreatePage.css';

//style
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['질문 개수', '시험지 작성', '확인'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return `5개~20개`;
    case 1:
      return '';
    case 2:
      return ``;
    default:
      return '';
  }
}

//로그인 여부에 따른 시험지 작성 허용
//데이터 변수 하나 설정하고 조건부 렌더링
//null이면 질문 개수 설정, !null이면 질문create
const QuestionCreatePage = () => {
  const history = useHistory();
  const [ cnt, setCnt ] = useState(5);
  const [ isChecked, setIsChecked ] = useState(false);
  const [exam, setExam] = useState([]);//질문 및 모음
  const [answers, setAnswers] = useState([]);//정답 모음 1:예, 2:아니오
  const [selectedValue, setSelectedValue] = React.useState(1);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onChangeCnt = (e) => {
    setCnt(e.target.value);
  }
  //질문 추가
  const onChangeQuest = (e) => {
    const {id, value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, value:value} : item))
  }
  //정답 예
  const onChangeAnsYes = (e) => {
    const {id,value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, ans:1} : item))
  }
  //정답 아니오 
  const onChangeAnsNo = (e) => {
    const {id,value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, ans:0} : item))
  }
  const sendExamData = (e) => {
    history.push('/question')//나중에 지우기
    e.preventDefault()
    const ExamData = {}
    axios.post('/question/', ExamData)
      .then(() => {
          
          history.push('/question')
      })
      .catch((error) => console.log(error))
  }; 
  const goNext = (e) => {
    e.preventDefault()
    if(cnt<5){
      alert('질문 개수는 최소 5개 이상이어야 합니다!')
    }else{
      setIsChecked(true);
    }
  }
  //stepper
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if(activeStep===0){
      if(cnt>=5 && cnt <= 20){
        setIsChecked(true);
        console.log(exam)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }else{
        alert('질문은 5개 이상 20개 이하여야 합니다!')
      }
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(()=>{
    if (activeStep === 1){
      //질문 arr
      let arr = []
      for (let i =0; i<cnt; i++){
          arr = [...arr, i]
      }
      let objArr = arr.map((_,index) => ({
        key:`${index+1}`,
        value:'',
        ans:''
      }))
      setExam(objArr)
      //정답 arr
      let ans = []
      for (let j=0; j<cnt; j++){
        ans = [...ans, j]
      }
      let objAns = ans.map((_,index) => ({
        key:`${index+1}`,
        value:''
      }))
      setAnswers(objAns)
  }
  }, [activeStep])

  return (
    <>
      <HeaderComp />
      <div className="cancel-btn">
        <Link to="/question">
          <Button variant="contained"
          className={classes.button}
          >취소</Button></Link>
      </div>
      {/* stepper */}
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === 0 && (
            <div className="stepper-box">
              <h4>5개 ~ 20개로 질문 개수를 정해주세요!</h4>
              <div className="set-quest-box">
                <Input type="number" value={cnt} 
                onChange={onChangeCnt} />개
              </div>
              <div className="stepper-btn">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  다음
                </Button>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="stepper-box">
              <div className="stepper-btn">
                <Button
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  이전
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  다음
                </Button>
              </div>
              <div style={{display:'flex',flexDirection:'column'}}>
                {exam.map((item) => (
                  <div>
                    <React.Fragment key={item.key}>
                      <label>{item.key}번 문제
                        <input 
                        type="text"
                        id={item.key}
                        value={item.value}
                        onChange={onChangeQuest}/>
                      </label>
                    </React.Fragment>
                    <div>
                      <Radio
                        checked={item.ans===1}
                        onChange={onChangeAnsYes}
                        id={item.key}
                        value="1"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '예' }}
                      />예
                      <Radio
                        checked={item.ans===0}
                        onChange={onChangeAnsNo}
                        id={item.key}
                        value="0"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '아니오' }}
                      />아니오
                    </div>
                  </div>

                ))}
                <button onClick={() => console.log(exam)}>콘솔</button>
              </div>
              
            </div>
          )}
          {activeStep === 2 && (
            <div className="stepper-box">
              <div className="stepper-btn">
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReset}
                  className={classes.button}
                >
                  새로 만들기
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendExamData}
                  className={classes.button}
                >
                  완료
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
  <FooterComp />
    </>
  );
  };
  
  export default QuestionCreatePage;
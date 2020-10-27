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
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const [exam, setExam] = useState([]);

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeCnt = (e) => {
    setCnt(e.target.value);
  }
  const onChangeQuest = (e) => {
    const {id, value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, value:value} : item))
  }
  const sendExamData = (e) => {
    history.push('/question')//나중에 지우기
    e.preventDefault()
    const ExamData = {title, content}
    axios.post('/question/', ExamData)
      .then(() => {
          setTitle('');
          setContent('');
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
        makeExam();
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
      let arr = []
      for (let i =0; i<cnt; i++){
          arr = [...arr, i]
      }
      let objArr = arr.map((_,index) => ({
        key:`${index+1}`,
        value:''
      }))
      setExam(objArr)
  }
  }, [activeStep])

  const makeExam = () =>{
    console.log(isChecked)
    let arr = []
    for(let i = 1; i<=cnt; i++){
      arr = [...arr, i]
    }
    let objArr = arr.map((_, index) => ({
    }))
    setExam(objArr)
  }
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
              {/* <form onSubmit={sendExamData}>
                <input placeholder="제목" value={title} onChange={onChangeTitle} />
                <input placeholder="내용" value={content} onChange={onChangeContent} />
                <button type="submit">완료</button>
              </form> */}
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
                        checked={selectedValue === '1'}
                        onChange={handleChange}
                        value="1"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                      />예
                      <Radio
                        checked={selectedValue === '0'}
                        onChange={handleChange}
                        value="0"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'B' }}
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
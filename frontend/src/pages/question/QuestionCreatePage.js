import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';

//materialUI
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

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
  const [ cnt, setCnt ] = useState(0);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeCnt = (e) => {
    setCnt(e.target.value);
  }
  const sendExamData = (e) => {
    e.preventDefault()
    const ExamData = {title, content}
    axios.post('/question/', ExamData)
      .then(() => {
          setTitle('');
          setContent('');
          //list page로 가게 하기.
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
  const exam = [];
  const makeExam = () =>{
    console.log(isChecked)
    for(let i = 1; i<=cnt; i++){
      exam.push(
        <h4>{i}</h4>
      )
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


  
    return (
      <>
        <HeaderComp />
        <div>
          {isChecked ? (
            <>
              <Link to="/question"><button>취소</button></Link>
            </>
          ) : (
            <div></div>
          )}
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
              <div>
                <h4>5개 ~ 20개의 질문을 만들어 주세요.</h4>
                <input type="number" value={cnt} onChange={onChangeCnt} />
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
              <div>
                <h1>{cnt}</h1>
                {exam.map((quest) => (
                  <h4>{quest.props.children}</h4>
              ))}
                <form onSubmit={sendExamData}>
                  <input placeholder="제목" value={title} onChange={onChangeTitle} />
                  <input placeholder="내용" value={content} onChange={onChangeContent} />
                  <button type="submit">완료</button>
                </form>
                <div className="stepper-btn">
                  <Link to="/question"><Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  >취소</Button></Link>
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
            {activeStep === 2 && (
              <div>
                <form onSubmit={goNext}>
                  <input type="number" value={cnt} onChange={onChangeCnt} />
                  <button type="submit">다음</button>
                </form>

                <div className="stepper-btn">
                  <Button
                    disabled={!isChecked}
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
          </div>
        </div>
    <FooterComp />
      </>
    );
  };
  
  export default QuestionCreatePage;
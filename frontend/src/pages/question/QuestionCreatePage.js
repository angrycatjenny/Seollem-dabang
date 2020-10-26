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
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

  //stepper
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if(activeStep===0){
      if(cnt>5 && cnt <= 20){
        console.log('ㅎㅇ')
        setIsChecked(true);
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
            <form onSubmit={sendExamData}>
                <input placeholder="제목" value={title} onChange={onChangeTitle} />
                <input placeholder="내용" value={content} onChange={onChangeContent} />
                <button type="submit">완료</button>
            </form>
            <Link to="/question"><button>취소</button></Link>
          </>
        ) : (
          <h4>하이</h4>
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
              {/* <form onSubmit={goNext}>
                <input type="number" value={cnt} onChange={onChangeCnt} />
                <button type="submit">다음</button>
              </form> */}

              <div className="signup-footer">
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
              <form onSubmit={goNext}>
                <input type="number" value={cnt} onChange={onChangeCnt} />
                <button type="submit">다음</button>
              </form>

              <div className="signup-footer">
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
          {activeStep === 2 && (
            <div>
              <form onSubmit={goNext}>
                <input type="number" value={cnt} onChange={onChangeCnt} />
                <button type="submit">다음</button>
              </form>

              <div className="signup-footer">
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
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>시험지 작성이 완료되었습니다!</Typography>
                <Link to="/question"><Button>목록</Button></Link>
              </div>
            ) : (
              <div>
                {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
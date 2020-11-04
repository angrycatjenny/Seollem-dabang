import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// History
import { useHistory } from "react-router-dom";

//materialUI
import { makeStyles, withStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

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
import CircularProgress from '@material-ui/core/CircularProgress';

// CSS
import '../../App.css';
import './QuestionCreatePage.css';
import { ContactsOutlined, SignalWifi1BarLock } from '../../../node_modules/@material-ui/icons/index';

//style
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backBtn: {
    marginRight: theme.spacing(1),
    backgroundColor:"#895BC7",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mainFont: {
    fontFamily:"GmarketSansBold",
  },
  customBtn:{
    color:"#0d0a0a",
    backgroundColor:"rgb(255, 99, 173)"
  },
  cancelBtn:{
    color:"#FFFAFF",
    backgroundColor:"#0D0A0A"
  },
  icon:{
    color:"pink !important"
  },

  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  step: {
    "& $completed": {
      color: "gray"
    },
    "& $active": {
      color: "rgb(255, 99, 173)"
    },
    "& $disabled": {
      color: "red"
    }
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  // disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
}));

const YesRadio = withStyles({
  root: {
    color: "#FF63AD",
    '&$checked': {
      color: "#FF63AD",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const NoRadio = withStyles({
  root: {
    color: "#895BC7",
    '&$checked': {
      color: "#895BC7",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function getSteps() {
  return ['질문 개수', '시험지 작성', '미리보기'];
}

//로그인 여부에 따른 시험지 작성 허용
//데이터 변수 하나 설정하고 조건부 렌더링
//null이면 질문 개수 설정, !null이면 질문create
const QuestionCreatePage = () => {
  const history = useHistory();
  const [ cnt, setCnt ] = useState(5);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ noBlank, setNoBlank ] = useState(true)
  const [exam, setExam] = useState([]);//질문 및 정답 모음
  const [answers, setAnswers] = useState([]);//정답 모음 1:예, 2:아니오
  const [selectedValue, setSelectedValue] = useState(1);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const config = {
    headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
  }
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ nickname, setNickname ] = useState('')
  //백에 보낼 데이터
  //1.질문 리스트
  const contentList = [];
  const [one, setOne] = useState('')
  //2.정답 리스트
  const correctAnswerList = [];
  const [two, setTwo] = useState('')
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
    item.key === id ? {...item, quest:value} : item))
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
  //create 요청 보내기
  const sendExamData = () => {
    {exam.map((item) => {
      contentList.push(item.quest)
      correctAnswerList.push(item.ans)
      }
    )}
    const ExamData = {
      "contentList": contentList,
      "correctAnswerList": correctAnswerList
    }
    console.log(ExamData,'보낼거')
    axios.post('/question/create', ExamData, config)
      .then(() => {
        setIsLoaded(true);
        setTimeout(() => {
          history.push('/question');
          history.go();
        },7000)
      })
      .catch((error) => console.log(error))
  }; 
  const checkExam = () =>{
    {exam.map((item) => {
      console.log(item.quest.length,'길이')
      if(item.quest.length<1){
        console.log('123',item)
        console.log(noBlank,'??')
        setNoBlank(false)
        console.log(noBlank,'??')
      }else if(item.ans.length<1){
        console.log('321',item)
        setNoBlank(false)
      }
      }
    )}
    return true
  };
  //stepper
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if(activeStep===0){
      if(cnt>=5 && cnt <= 20){
        setIsChecked(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }else{
        alert('질문은 5개 이상 20개 이하여야 합니다!')
      }
    }else if(activeStep===1){
        {exam.map((item) => {
          contentList.push(item.quest)
          correctAnswerList.push(item.ans)
          }
        )}
        console.log(contentList,'하나')
        console.log(correctAnswerList,'둘')
        console.log(one,'1')
        console.log(two,'2')
        setOne(contentList)
        setTwo(correctAnswerList)
        console.log(one,'3')
        console.log(two,'4')
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // checkExam();
      // console.log(noBlank,'확인')
      // if(noBlank){
      //   console.log('11111')
      //   {exam.map((item) => {
      //     contentList.push(item.quest)
      //     correctAnswerList.push(item.ans)
      //     }
      //   )}
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }else{
      //   console.log('2222')
      //   alert('작성되지 않은 칸이 있습니다!')
      // }
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
        quest:'',
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
  }else if (activeStep === 2) {
    axios.get('/my-profile', config)
      .then((response) => {
        setNickname(response.data.nickname)
      })
  }
  }, [activeStep])

  //질문, 정답 분리
  

  return (
    <>
      <div className="cancel-btn">
        <Link to="/question">
          <Button variant="contained"
          className={classes.cancelBtn}
          >취소</Button></Link>
      </div>
      {/* stepper */}
      <div className={classes.root}>

        <Stepper activeStep={activeStep} alternativeLabel 
          classes={{
            root: classes.root
          }}>
          {steps.map((label) => (
            <Step key={label} classes={{
              root: classes.step,
              completed: classes.completed,
            }}>
              <StepLabel
              classes={{
                label:classes.mainFont,
                alternativeLabel: classes.alternativeLabel,
                labelContainer: classes.labelContainer
              }}
              StepIconProps={{
                classes: {
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active,
                  disabled: classes.disabled
                }
              }}
              >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === 0 && (
            <div className="stepper-box">
              <div style={{fontSize:"16px"}}>5개 ~ 20개로 질문 개수를 정해주세요!</div>
              <div className="set-quest-box">
                <Input type="number" value={cnt} 
                onChange={onChangeCnt} classes={{input:classes.mainFont}}/>개
              </div>
              <div className="stepper-btn">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.customBtn}
                >
                  다음
                </Button>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="stepper-box">
              <div style={{display:'flex',flexDirection:'column', marginTop:"20px"}}>
                {exam.map((item) => (
                  <React.Fragment key={item.key}>
                    <div key={item.key} className="quest-box">
                      <label>{item.key}번
                        <textarea 
                        className="quest-create-input"
                        type="text"
                        id={item.key}
                        value={item.value}
                        onChange={onChangeQuest}/>
                      </label>
                    </div>
                    <div className="radio-box">
                      <YesRadio
                        checked={item.ans===1}
                        onChange={onChangeAnsYes}
                        id={item.key}
                        value="1"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '예' }}
                      /><div>예</div>
                      <NoRadio
                        checked={item.ans===0}
                        onChange={onChangeAnsNo}
                        id={item.key}
                        value="0"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '아니오' }}
                      /><div>아니오</div>
                    </div>
                  </React.Fragment>
                ))}
                {/* <button onClick={() => console.log(exam)}>콘솔</button> */}
              </div>
              <div className="stepper-btn">
                <Button
                  onClick={handleBack}
                  className={classes.backBtn}
                >
                  이전
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.customBtn}
                >
                  다음
                </Button>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="stepper-final-box">
              {isLoaded 
              ? 
                <div className="stepper-loading">
                  <CircularProgress />
                  <h6>로딩중</h6>
                </div>
              :
                <div className="stepper-final-box-comp">
                  <div className="stepper-exam-preview">
                    <div style={{fontSize:"17px", marginBottom:"5px",}}>{nickname}님의 청춘을 위한</div>
                    <h4>연애 능력 고사</h4>
                    <div style={{height:"7.5px", width:"96%", backgroundColor:"rgb(255, 99, 173)"}}></div>
                    <hr style={{height:"0.6px", width:"96%", backgroundColor:"rgb(255, 99, 173)", marginTop:"2px",}}></hr>
                    {exam.map((item) => (
                    <React.Fragment key={item.key}>
                      <div key={item.key} className="quest-box">
                        <label className="create-final-label">{item.key}번</label>
                        <div className="create-final-quest">{item.quest}</div>
                      </div>
                      <div className="create-final-ans-box">
                        <div className="create-final-label">정답: </div>
                        {item.ans 
                        ?
                        <div className="create-final-ans">
                          예
                        </div> 
                        :
                        <div className="create-final-ans">
                          아니오
                        </div>}
                      </div>
                    </React.Fragment>
                  ))}
                  </div>
                
                  <div className="stepper-btn">
                    <Button
                      variant="contained"
                      onClick={handleReset}
                      className={classes.backBtn}
                      >
                      다시 만들기
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={sendExamData}
                      className={classes.customBtn}
                    >
                      완료
                    </Button>
                  </div>
                </div>
              }
            </div> 
          )}
        </div>
      </div>
    </>
  );
  };
  
  export default QuestionCreatePage;
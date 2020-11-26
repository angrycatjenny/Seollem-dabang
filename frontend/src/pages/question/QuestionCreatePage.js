import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
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
import '../../App.css';
import './QuestionCreatePage.css';
import { ContactsOutlined, SignalWifi1BarLock } from '../../../node_modules/@material-ui/icons/index';
import ExamBoard from '../../assets/question/board1.png' 
import FooterComp from '../../components/base/FooterComp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "transparent",
  },
  backBtn: {
    marginRight: theme.spacing(1),
    backgroundColor:"#9B8481",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mainFont: {
    fontFamily:"BMEULJIRO",
    fontSize:"20px"
  },
  customBtn:{
    color:"white",
    backgroundColor:"#5e1e27",
    transition:"0.2s",
    '&:hover':{
      transform:"translateY(-3px)",
      backgroundColor:"#5e1e27",
    }
  },
  cancelBtn:{
    color:"#FFFAFF",
    backgroundColor:"#0D0A0A",
    transition:"0.2s",
    '&:hover':{
      color:"#0D0A0A",
      textDecoration:"none",
      transform:"translateX(3px)",
      backgroundColor:"transparent"
    }
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
      color: "#5E1E27"
    },
    "& $disabled": {
      color: "red"
    }
  },
  alternativeLabel: {},
  active: {},
  completed: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
}));

const YesRadio = withStyles({
  root: {
    color: "#D08892",
    '&$checked': {
      color: "#D08892",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const NoRadio = withStyles({
  root: {
    color: "#9B8481",
    '&$checked': {
      color: "#9B8481",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function getSteps() {
  return ['질문 개수', '레시피 작성', '미리보기'];
}

const QuestionCreatePage = () => {
  const history = useHistory();
  const [ cnt, setCnt ] = useState(5);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ noBlank, setNoBlank ] = useState(true);
  const [exam, setExam] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const config = {
    headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
  }
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ nickname, setNickname ] = useState('')
  const contentList = [];
  const correctAnswerList = [];
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onChangeCnt = (e) => {
    setCnt(e.target.value);
  }
  const onChangeQuest = (e) => {
    const {id, value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, quest:value} : item))
  }
  const onChangeAnsYes = (e) => {
    const {id,value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, ans:1} : item))
  }
  const onChangeAnsNo = (e) => {
    const {id,value} = e.target;
    setExam(exam.map((item) =>
    item.key === id ? {...item, ans:0} : item))
  }
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
    axios.post('/api/question/create', ExamData, config)
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
        let SumCnt = 0;
        for(let i=0; i<cnt; i++){
          if (contentList[i].length>0 && correctAnswerList[i]>=0){
            SumCnt++;
          }
        }
        if(SumCnt==cnt){
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }else{
          alert('질문이나 답변을 다 채워주세요!')
        }
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
        quest:'',
        ans:-1
      }))
      setExam(objArr)
      let ans = []
      for (let j=0; j<cnt; j++){
        ans = [...ans, j]
      }
      let objAns = ans.map((_,index) => ({
        key:`${index+1}`,
        value:-1
      }))
      setAnswers(objAns)
  }else if (activeStep === 2) {
    axios.get('/api/my-profile', config)
      .then((response) => {
        setNickname(response.data.nickname)
      })
  }
  }, [activeStep])

  

  return (
    <>
      <div style={{display:"flex", justifyContent:"center",}}>
        <div className="test-box">
        <div className="create-box" style={{}}>
          <div className="in-board">
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
                  <div style={{fontSize:"20px"}}>5개 ~ 20개로 질문 개수를 정해주세요!</div>
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
                  <div style={{marginTop:"0px", 
                  width:"70%",}}>
                    {exam.map((item) => (
                      <div key={item.key} style={{display:"flex",
                      justifyContent:"space-between", marginBottom:"10px",}}>
                        <div key={item.key} className="quest-box">
                          <label>{item.key}번.</label>
                          <textarea 
                            className="quest-create-input"
                            type="text"
                            id={item.key}
                            value={item.value}
                            onChange={onChangeQuest}/>
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
                      </div>
                    ))}
                  
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
                        <h4>이상형 레시피</h4>
                        <div style={{height:"7.5px", width:"96%", 
                        backgroundColor:"#5e1e27"}}></div>
                        <hr style={{height:"0.6px", width:"96%", 
                        backgroundColor:"#5e1e27", marginTop:"2px",}}></hr>
                        {exam.map((item) => (
                        <div className="create-final-box" key={item.key}>
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
                        </div>
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
        </div>
        <div className="cancel-btn">
          <Link to="/question" style={{textDecoration:"none",}}>
            <Button variant="contained"
            className={classes.cancelBtn}
            >취소</Button></Link>
        </div>
        </div>
      </div>
    </>
  );
  };
  
  export default QuestionCreatePage;
import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

// History
import { useHistory } from "react-router-dom";

// Cookie
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  ansYes:{
    backgroundColor:"transparent",
    color:"#5e1e27",
    border:"2px solid #D08892",
    outline:"none",
    '&:hover':{
      backgroundColor:"transparent",
    },
    '&:focus':{
      border:"none",
      outline:"none",
      backgroundColor:"#D08892",
      color:"white",
    }
  },
  ansNo:{
    backgroundColor:"#9B8481",
    color:"white",
    border:"none",
    outline:"none",
    marginLeft:"10px",
    '&:hover':{
      backgroundColor:"#9B8481",
    },
    '&:focus':{
      border:"none",
      outline:"none",
      backgroundColor:"#9B8481",
      color:"white",
    }
  }
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

const AnswerCreatePage = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const [ questions, setQuestions ] = useState(null);

  const [answers, setAnswers] = useState([]);//정답 모음 1:예, 2:아니오

  const [ loading, setLoading ] = useState(false);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          '/question/list/' + `${match.params.userId}`, config
        );
        setQuestions(response.data);
        console.log(response.data,'하하하하ㅏㅎ하ㅏㅎ')
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //정답 예
  const onChangeAnsYes = (e) => {
    const {id,value} = e.target;
    setQuestions(questions.map((question) =>
    question.id === id ? {...question, answer:1} : question))
  }
  //정답 아니오 
  const onChangeAnsNo = (e) => {
    const {id,value} = e.target;
    setQuestions(questions.map((question) =>
    question.id === id ? {...question, ans:0} : question))
  }

  const selectedYes = (index) => {
    console.log(questions[index], '하이하이')
    questions[index].answer = 1
    console.log(questions);
    setQuestions(questions);
  };
  const selectedNo = (index) => {
    console.log(questions[index], '바이하이')
    questions[index].answer = 0
    console.log(questions);
    setQuestions(questions);
  };

  const sendAnswers = () => {
    const answerList = [];
    for (var i = 0; i <= questions.length; i++) {
      if (questions[i]) {
        if (questions[i].answer === 1) {
          answerList.push(1)
        } else if (questions[i].answer === 0) {
          answerList.push(0)
        }
      }
    }
    const examiner = match.params.userId
    const sendAnswerData = { examiner, answerList}
    axios.post('/answer', sendAnswerData, config)
      .then(() => {
        console.log('디비보자');
        history.push('/result')
      })
    console.log(sendAnswerData)
  };

  if (loading) {
    return <h1>대기 중...</h1>;
  };
  if (!questions) {
    return null;
  };

  return (
    <div style={{minHeight:"530px", padding:"25px 0", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h2>레시피 답안지</h2>

      <div className="centerBox">
        {questions.map((question, index) => (
          <div className="answer-box" key={index}>
            <div className="answer-quest">
              <h4>{index+1}번. {question.content}</h4>
            </div>

            {/* <div>
              <Radio
              checked={question[index].answer===1}
              onChange={onChangeAnsYes}
              id={question.id}
              value="1"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
              />
              <Radio
                checked={question[index].answer===0}
                onChange={onChangeAnsNo}
                id={question.id}
                value="0"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'B' }}
              />
            </div> */}


            {/* <div className="radio-box">
              <YesRadio
                checked={questions[index].answer===1}
                onChange={selectedYes(index)}
                id={index}
                value="1"
                name="radio-button-demo"
                inputProps={{ 'aria-label': '예' }}
              /><div>예</div>
              <NoRadio
                checked={questions[index].answer===0}
                onChange={selectedNo(index)}
                id={index}
                value="0"
                name="radio-button-demo"
                inputProps={{ 'aria-label': '아니오' }}
              /><div>아니오</div>
            </div> */}

            {/* 부트스트랩 ver */}
            {/* <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-secondary active"> 
                <input type="radio" name="options" id="option1" checked 
                onClick={() => selectedYes(index)}/>예
              </label>
              <label class="btn btn-secondary active"> 
                <input type="radio" name="options" id="option2" checked 
                onClick={() => selectedNo(index)}/>아니오
              </label>
            </div> */}

            {/* 제일 처음 ver */}
            {/* <div className="answer-btn">
              <Button
                id="recipeYes"
                className={classes.ansYes}
                variant="contained"
                onClick={() => selectedYes(index)}
              >
                예
              </Button>
              <Button
              id="recipeNo"
                className={classes.ansNo}
                variant="contained"
                onClick={() => selectedNo(index)}
              >
                아니오
              </Button>
            </div> */}
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        onClick={sendAnswers}
        style={{border:"none", outline:"none", 
        color:"white", marginTop:"30px", 
        fontSize:"17px",
        backgroundColor:"#5e1e27"}}
        >
        제출하기
      </Button>

    </div>
  )
};

export default AnswerCreatePage;
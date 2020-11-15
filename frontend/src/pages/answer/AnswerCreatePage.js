import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';
import { makeStyles } from '@material-ui/core/styles';

// History
import { useHistory } from "react-router-dom";

// Cookie
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  ansYes:{
    backgroundColor:"#D08892",
    color:"white",
    border:"none",
    outline:"none",
    '&:hover':{
      backgroundColor:"#D08892",
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

const AnswerCreatePage = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const [ questions, setQuestions ] = useState(null);
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
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const selectedYes = (index) => {
    questions[index].answer = 1
    console.log(questions);
    setQuestions(questions);
  };
  const selectedNo = (index) => {
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
    <div style={{padding:"25px 0", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h2>레시피 답안지</h2>

      <div className="centerBox">
        {questions.map((question, index) => (
          <div className="answer-box" key={index}>
            <div className="answer-quest">
              <h4>{index+1}번. {question.content}</h4>
            </div>
            <div className="answer-btn">
              <Button
                className={classes.ansYes}
                variant="contained"
                onClick={() => selectedYes(index)}
              >
                예
              </Button>
              <Button
                className={classes.ansNo}
                variant="contained"
                onClick={() => selectedNo(index)}
              >
                아니오
              </Button>
            </div>
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
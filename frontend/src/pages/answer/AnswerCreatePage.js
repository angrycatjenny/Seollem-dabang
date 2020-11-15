import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

// History
import { useHistory } from "react-router-dom";

// Cookie
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles((theme) => ({
  ansYes:{
    backgroundColor:"#D08892",
    color:"white",
    border:"none",
    outline:"none"
  },
  ansNo:{
    backgroundColor:"#9B8481",
    color:"white",
    border:"none",
    outline:"none",
    marginLeft:"10px"
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
  // const [ answers, setAnswers ] = useState([]);
  const answers = [];
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
          '/api/question/list/' + `${match.params.userId}`, config
        );
        setQuestions(response.data);

        //정답 리스트
        let ans = []
        for (let j=0; j<response.data.length; j++){
          ans = [...ans, 0]
        }
        console.log(ans,'테스형')
        // let objAns = ans.map((_,index) => ({
        //   key:index,
        //   value:-1
        // }))
        answers = ans
        console.log(ans,'ans')

      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //정답 예
  const onChangeAnsYes = (e) => {
    console.log(answers,'전')
    const {id,value} = e.target;
    answers[id] = 1
    console.log(answers,'후')
  }
  //정답 아니오 
  const onChangeAnsNo = (e) => {
    console.log(answers,'전')
    const {id,value} = e.target;
    answers[id] = 0
    console.log(answers,'후')
  }

  const sendAnswers = () => {
    console.log(answers,'???')
    const answerList = [];
    for (var i = 0; i < answers.length; i++) {
      answerList.push(answers[i].value)
    }
    const examiner = match.params.userId
    const sendAnswerData = { examiner, answerList}
    axios.post('/api/answer', sendAnswerData, config)
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
            <div >
            <RadioGroup>
              <div className="d-flex">
              <div className="d-flex">
                <YesRadio
                  // checked={answers[index]}
                  onChange={onChangeAnsYes}
                  id={index}
                  value="1"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '예' }}
                /><div className="mt-2">예</div>
              </div>
              <div className="d-flex">
                <NoRadio
                  // checked={answers[index]}
                  onChange={onChangeAnsNo}
                  id={index}
                  value="0"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '아니오' }}s
                /><div className="mt-2">아니오</div>
              </div>
              </div>

            </RadioGroup>
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
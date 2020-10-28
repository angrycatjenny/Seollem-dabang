import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';

// History
import { useHistory } from "react-router-dom";

// Cookie
import { useCookies } from 'react-cookie';

// Material-UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const AnswerCreatePage = () => {
  const history = useHistory();
  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const [ questions, setQuestions ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          '/question/list', config
        );
        setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const sendAnswers = e => {
    axios.post('/')
    .then(
      history.push('/result')
    )
    .catch()
  }

  if (loading) {
    return <h1>대기 중...</h1>;
  }
  if (!questions) {
    return null;
  }

  return (
    <div>
      <h1>답변 등록</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h1>{question.content}</h1>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="1" control={<Radio />} label="Yes" />
              <FormControlLabel value="0" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      ))}
      <button onClick={sendAnswers}>제출하기</button>
    </div>
  )
};

export default AnswerCreatePage;
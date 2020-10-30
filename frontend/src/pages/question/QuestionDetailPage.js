import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

import './QuestionDetailPage.css';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

//완료: 질문 추가, 시험지 전체 삭제
//아직: 질문 각각 수정 및 삭제
const QuestionDetailPage = () => {
    const history = useHistory();
    const [ exam, setExam ] = useState('');
    const [ isExam, setIsExam ] = useState(false);
    const [cookies, setCookie] = useCookies(['accessToken']);
    const config = {
      headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
    }

    //새로운 질문 추가
    const [ newQuest, setNewQuest  ] = useState('')
    const [ newAns, setNewAns ] = useState(-1)

    const onChangeNewQuest = (e) => {
        setNewQuest(e.target.value);
      }

    const onChangeNewAnsYes = (e) => {
        const {value} = e.target;
        setNewAns(1)
        console.log(newAns)
    }

    const onChangeNewAnsNo = (e) => {
        const {value} = e.target;
        setNewAns(0)
        console.log(newAns)
    }

    const addNewQuest = () => {
      if(!newQuest | newAns < 0) {
          alert('질문과 정답을 제대로 작성해주세요!')
      }else{
          const ExamData = {
            "contentList": [newQuest],
            "correctAnswerList": [newAns]
          }
          axios.post('/question/create', ExamData, config)
            .then(() => {
              setNewQuest('')
              setNewAns(-1)
                history.go('/question/detail')
            })
            .catch((error) => console.log(error))
      }
  }

  //만들어둔 시험 문제 get
  useEffect(() => {
    setTimeout(() => {
      const fetchData = async() => {
        setIsExam(true);
        try {
          const getExam = await axios.get(`/question/list`,config);
          
          setExam(getExam.data)
          console.log(getExam.data,'??')
        } catch(e) {
          console.log(e);
        } 
        setIsExam(false);
      };
      fetchData();
    },1000);
    }, []);

      if(isExam){
        return <div>로딩중</div>
      }
    
      if(!exam){
        return null;
      }

    //시험지 전체 삭제
    const delExam = () => {
        axios.delete('/question/delete', config)
        .then(() => {
            history.push('/question')
        })
        .catch((error) => console.log(error))
    }

    //질문 개별 수정 및 삭제
    const updateQuest = (Id) => {
      console.log(Id,'수정')
    }

    const deleteQuest = (Id) => {
      axios.delete(`/question/delete/${Id}`, config)
        .then(() => {
          //push하니까 안됨
            history.go('/question/detail')
        })
        .catch((error) => console.log(error))
    }
            
  return (
    <div>
        {exam.map((item) => (
          <React.Fragment>
            <div>
              <h4 key={item.questionId} item={item}>
                  {item.content}</h4>
              <button onClick={() => updateQuest(item.questionId)}>수정</button>
              <button onClick={() => deleteQuest(item.questionId)}>삭제</button>
            </div>
          </React.Fragment>
        ))}

        {/* 질문 추가 부분 */}
        <div className="new-quest-box">
          <TextField
            id="outlined-full-width"
            label="문제"
            style={{ margin: 8 }}
            placeholder="추가 문제를 써주세요!"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={newQuest}
            onChange={onChangeNewQuest}
          />
          <div>
            <Radio
              checked={newAns===1}
              onChange={onChangeNewAnsYes}
              value="1"
              name="radio-button-demo"
              inputProps={{ 'aria-label': '예' }}
            />예
            <Radio
              checked={newAns===0}
              onChange={onChangeNewAnsNo}
              value="0"
              name="radio-button-demo"
              inputProps={{ 'aria-label': '아니오' }}
            />아니오
          </div>
        </div>
        <button onClick={addNewQuest}>추가</button>
        <br />
        
        {/* 목록으로 돌아가기 & 시험지 통째로 삭제 */}
        <Link to="/question">
            <button className="exam-update-btn">취소</button>
        </Link>
        <button className="exam-delete-btn"
        onClick={delExam}>시험지 삭제</button>
    </div>
  );
  };
  
  export default QuestionDetailPage;
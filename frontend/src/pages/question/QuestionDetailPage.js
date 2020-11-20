import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

import './QuestionDetailPage.css';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FooterComp from '../../components/base/FooterComp';

const QuestionDetailPage = () => {
    const history = useHistory();
    const [ exam, setExam ] = useState('');
    const [ isExam, setIsExam ] = useState(false);
    const [ editId, setEditId ] = useState(-1);
    const [ editQuest, setEditQuest ] = useState('');
    const [ editAns, setEditAns ] = useState(null);
    const [cookies, setCookie] = useCookies(['accessToken']);
    const config = {
      headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
    }
    const [ nickname, setNickname ] = useState('')
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
          axios.post('/api/question/create', ExamData, config)
            .then(() => {
              setNewQuest('')
              setNewAns(-1)
                history.go('/question/detail')
            })
            .catch((error) => console.log(error))
      }
    }
  useEffect(() => {
    setTimeout(() => {
      const fetchData = async() => {
        setIsExam(true);
        try {
          const getExam = await axios.get(`/api/question/list`,config);  
          setExam(getExam.data)
          console.log(getExam.data,'exam')
        } catch(e) {
          console.log(e);
        } 
        setIsExam(false);
      };
      fetchData();
    },1000);
    axios.get('/api/my-profile', config)
    .then((response) => {
      setNickname(response.data.nickname)
    })
    }, []);

      if(isExam){
        return <div>로딩중</div>
      }
    
      if(!exam){
        return null;
      }
    const delExam = () => {
        axios.delete('/api/question/delete', config)
        .then(() => {
            history.push('/question')
        })
        .catch((error) => console.log(error))
    }

    const sendEditId = (Id) => {
      setEditId(Id);
    }
    const EditQuestion = e => {
      let edited = e.target.value
      setExam(exam.map((item) =>
      item.questionId === editId ? {...item, content:edited} : item))
      setEditQuest(edited)
    }
  
    const EditAnswerYes = (Id) => {
      setEditAns(true)
      setExam(exam.map((item) =>
      item.questionId === Id ? {...item, correctAnswer:true} : item))
    }
    const EditAnswerNo = (Id) => {
      setEditAns(false)
      setExam(exam.map((item) =>
      item.questionId === Id ? {...item, correctAnswer:false} : item))
    }
    const updateQuest = (Id) => {
      const ExamData = {
        "content": editQuest,
        "correctAnswer": editAns
      }
      axios.put(`/api/question/update/${Id}`, ExamData, config)
        .then(() => {
            history.push('/question/detail')
            history.go();
        })
        .catch((error) => console.log(error))
    }

    const deleteQuest = (Id) => {
      if(exam.length>5){
        axios.delete(`/api/question/delete/${Id}`, config)
          .then(() => {
              history.go('/question/detail')
          })
          .catch((error) => console.log(error))
      }else{
        alert('질문은 최소 5개여야합니다!')
      }
    }
            
  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <div className="quest-detail">
        <div className="detail-btn-box">
          <div className="detail-btn">
            <Link to="/question">
                <button className="exam-update-btn">취소</button>
            </Link>
            <button className="exam-delete-btn"
            onClick={delExam}>시험지 삭제</button>
          </div>
        </div>

        <div className="in-quest-detail">
            <div className="detail-exam-preview">
              <div style={{fontSize:"17px", marginBottom:"5px",}}>{nickname}님의 청춘을 위한</div>
              <h4>연애 능력 고사</h4>
              <div style={{height:"7.5px", width:"96%", backgroundColor:"black"}}></div>
              <hr style={{height:"1px", width:"96%", backgroundColor:"#5e1e27", marginTop:"2px",}}></hr>
              
              {exam.map((item) => (
            <React.Fragment key={item.questionId}>
              {editId==item.questionId ? (
                <div key={item.questionId}>
                  <input 
                  type="text"
                  id={item.questionId}
                  value={item.content}
                  onChange={EditQuestion}/>
                  <div>
                    <Radio
                      checked={item.correctAnswer}
                      onChange={() =>EditAnswerYes(item.questionId)}
                      id={item.questionId}
                      value="true"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '예' }}
                    />예
                    <Radio
                      checked={!item.correctAnswer}
                      onChange={() => EditAnswerNo(item.questionId)}
                      id={item.questionId}
                      value="false"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '아니오' }}
                    />아니오
                  </div>
                  <button onClick={() => updateQuest(item.questionId)}>완료</button>
                  <button onClick={() => deleteQuest(item.questionId)}>삭제</button>
                  </div>
                  ) : (
                <div >
                  <div className="detail-update-box" key={item.questionId}>
                    <div key={item.questionId} className="quest-box">
                      <label className="create-final-label">{exam.indexOf(item)+1}번</label>
                      <div className="create-final-quest">{item.content}</div>
                    </div>
                    <div className="detail-ans-box">
                      <div className="create-final-label">정답: </div>
                      {item.correctAnswer 
                      ?
                      <div className="create-final-ans">
                        예
                      </div> 
                      :
                      <div className="create-final-ans">
                        아니오
                      </div>}
                    </div>
                      
                    <button onClick={() => sendEditId(item.questionId)}
                    className="detail-update-btn">
                      수정</button>
                    <button onClick={() => deleteQuest(item.questionId)}
                    className="detail-delete-btn">
                      삭제</button>
                  </div>
                </div>
                  )}
            </React.Fragment>
          ))}
            </div>
            
            {/* 새로운 문제 추가 부분 */}
            <div className="quest-detail-box">
              {/* 질문 추가 부분 */}
              <div className="new-quest-box">
                <TextField
                  id="outlined-full-width"
                  label="문제"
                  style={{ margin:"0", width:"400px", }}
                  placeholder="추가 문제를 써주세요!"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={newQuest}
                  onChange={onChangeNewQuest}
                />
                <div style={{alignSelf:"center"}}>
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
              <button onClick={addNewQuest}
              className="quest-add-btn">추가</button>
            </div>

        </div>
      </div>
    </div>
  );
  };
  
  export default QuestionDetailPage;
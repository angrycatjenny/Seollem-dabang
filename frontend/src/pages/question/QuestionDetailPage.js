import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

import './QuestionDetailPage.css';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
//Footer
import FooterComp from '../../components/base/FooterComp';
//완료: 질문 추가, 시험지 전체 삭제, 질문 삭제
//아직: 질문 수정
const QuestionDetailPage = () => {
    const history = useHistory();
    const [ exam, setExam ] = useState('');
    const [ isExam, setIsExam ] = useState(false);

    //수정 담당 data
    const [ editId, setEditId ] = useState(-1);
    const [ editQuest, setEditQuest ] = useState('');
    const [ editAns, setEditAns ] = useState(null);

    //유저 정보
    const [cookies, setCookie] = useCookies(['accessToken']);
    const config = {
      headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
    }
    const [ nickname, setNickname ] = useState('')

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
          axios.post('/api/question/create', ExamData, config)
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
    //유저 정보 가져오기  
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

    //시험지 전체 삭제
    const delExam = () => {
        axios.delete('/api/question/delete', config)
        .then(() => {
            history.push('/question')
        })
        .catch((error) => console.log(error))
    }

    ////질문 개별 수정 및 삭제
    //수정할 질문 ID 설정
    const sendEditId = (Id) => {
      setEditId(Id);
    //   const targeting = exam.filter((quest) => {
    //     return quest.name.indexOf(exam) > -1;
    // });
    }
    //질문 수정
    const EditQuestion = e => {
      let edited = e.target.value
      setExam(exam.map((item) =>
      item.questionId === editId ? {...item, content:edited} : item))
      setEditQuest(edited)
    }
  
    //정답 수정
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
    //수정된 데이터 보내기
    const updateQuest = (Id) => {
      // console.log(Id,'수정')
      // console.log(exam,'exam')
      const ExamData = {
        "content": editQuest,
        "correctAnswer": editAns
      }
      // console.log(ExamData,'보낼거')
      axios.put(`/api/question/update/${Id}`, ExamData, config)
        .then(() => {
            history.push('/question/detail')
            history.go();
        })
        .catch((error) => console.log(error))
    }

    //삭제
    const deleteQuest = (Id) => {
      if(exam.length>5){
        axios.delete(`/api/question/delete/${Id}`, config)
          .then(() => {
            //push하니까 안됨
              history.go('/question/detail')
          })
          .catch((error) => console.log(error))
      }else{
        alert('질문은 최소 5개여야합니다!')
      }
    }
            
  return (
    <React.Fragment>
      <div className="stepper-final-box-comp">
          <div className="stepper-exam-preview">
            <div style={{fontSize:"17px", marginBottom:"5px",}}>{nickname}님의 청춘을 위한</div>
            <h4>연애 능력 고사</h4>
            <div style={{height:"7.5px", width:"96%", backgroundColor:"rgb(255, 99, 173)"}}></div>
            <hr style={{height:"0.6px", width:"96%", backgroundColor:"rgb(255, 99, 173)", marginTop:"2px",}}></hr>
            
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
              <div style={{border:"2px solid red", width:"100%",}}>
                <React.Fragment key={item.questionId}>
                  <div key={item.questionId} className="quest-box">
                    <label className="create-final-label">{exam.indexOf(item)+1}번</label>
                    <div className="create-final-quest">{item.content}</div>
                  </div>
                  <div className="create-final-ans-box">
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
                    <button onClick={() => sendEditId(item.questionId)}>수정</button>
                    <button onClick={() => deleteQuest(item.questionId)}>삭제</button>
                </React.Fragment>
              </div>
                )}
          </React.Fragment>
        ))}
          </div>
        
          <div className="stepper-btn">
            {/* 목록으로 돌아가기 & 시험지 통째로 삭제 */}
        <Link to="/question">
            <button className="exam-update-btn">취소</button>
        </Link>
        <button className="exam-delete-btn"
        onClick={delExam}>시험지 삭제</button>
          </div>
          <div className="quest-detail-box">
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
    </div>
        </div>
      <FooterComp/>
    </React.Fragment>
  );
  };
  
  export default QuestionDetailPage;
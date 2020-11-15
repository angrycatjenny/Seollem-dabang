import React from 'react';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import HTMLFlipBook from "react-pageflip";
import AudioPlayer from 'react-modular-audio-player';
import './MainPage.css';

const MainPage = () => {
  const [cookies] = useCookies(['accessToken']);
  const [Page1, setPage1] = React.useState(false)
  const [Page2, setPage2] = React.useState(false)
  const [Page3, setPage3] = React.useState(false)
  const [Page4, setPage4] = React.useState(false)
  const [otherData, setOtherData] = React.useState()
  const [otherBreak, setotherBreak] = React.useState(true)
  const [keywordData, setkeywordData] = React.useState()
  const [keywordBreak, setkeywordBreak] = React.useState(true)
  const history = useHistory();
  const [exam, setExam] = React.useState(0)
  const [loading1, setLoading1] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)
  const [pagedata1, setpagedata1] = React.useState([])
  const [pagedata2, setpagedata2] = React.useState([])
  const [pagedata3, setpagedata3] = React.useState([])
  const [pagedata4, setpagedata4] = React.useState([])


  const axiosConfig = {
    headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
  }

  // 주소,성별 추천 데이터 가져오기
  const getOtherData = () => {
    axios.get(`/api/recommend-user-by-profile`, axiosConfig)
      .then((response) => {
        console.log('other', response)
        setOtherData(response.data)
        setLoading1(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 키워드 추천 데이터 가져오기
  const getKeywordData = () => {
    axios.get(`/api/recommend-user-by-keyword`, axiosConfig)
      .then((response) => {
        console.log('keyword', response)
        setkeywordData(response.data.userList)
        setExam(response.data.isExam)
        setLoading2(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 함수 실행
  React.useEffect(() => {
    getKeywordData()
    getOtherData()
  }, [])

  const keywordDataPage1 = []
  const keywordDataPage2 = []
  const otherDataPage3 = []
  const otherDataPage4 = []

  if (loading1 && loading2) {
    //키워드 추천
    if (keywordBreak) {
      if (keywordData) {
        setkeywordBreak(false)
        if (keywordData.length < 3) {
          setPage1(true)
          for (let i = 0; i < keywordData.length; i++) {
            keywordDataPage1.push(keywordData[i])
          }
          setpagedata1(keywordDataPage1)
        } else {
          setPage1(true)
          for (let i = 0; i < 2; i++) {
            keywordDataPage1.push(keywordData[i])
          }
          setpagedata1(keywordDataPage1)
          setPage2(true)
          for (let i = 2; i < keywordData.length; i++) {
            keywordDataPage2.push(keywordData[i])
          }
          setpagedata2(keywordDataPage2)
        }
      }
    }

    // 성별,지역 추천
    if (otherBreak) {
      if (otherData.length > 0) {
        setotherBreak(false)
        if (otherData.length < 3) {
          setPage3(true)
          for (let i = 0; i < otherData.length; i++) {
            otherDataPage3.push(otherData[i])
          }
          setpagedata3(otherDataPage3)
        } else {
          setPage3(true)
          for (let i = 0; i < 2; i++) {
            otherDataPage3.push(otherData[i])
          }
          setpagedata3(otherDataPage3)
          setPage4(true)
          for (let i = 2; i < otherData.length; i++) {
            otherDataPage4.push(otherData[i])
          }
          setpagedata4(otherDataPage4)
        }
      }
    }
  }
  else {
    return (
      <h2>서비스 준비 중 입니다.</h2>
    )
  }

  let rearrangedPlayer = [
    {
      className: "adele",
      innerComponents: [
        {
          type: "play",
          style: {
            width: "100%",
            justifyContent: "center",
            filter: "invert(100%)",
            opacity: "0.4"
          }
        }
      ]
    }
  ];

  return (
    <div className="book">
      <HTMLFlipBook
        width={380} height={480}
        showCover={true}
      >
        {/* 표지 앞 */}
        <div className="bookpage1">표지 앞</div>
        {/* keyword page1 */}
        {Page1 ? (
          <div className="bookpage2">
            <div>
              {pagedata1.map((data) => (
                <div key={data.nickname}>
                  <img src={data.imageDownloadUri} alt={data.nickname} />
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="bookpage2">시험지를 만들어 주세요.</div>
          )}

        {/* keyword page2 */}
        {Page2 ? (
          <div className="bookpage3">
            <div>
              {pagedata2.map((data) => (
                <div key={data.nickname}>
                  <img src={data.imageDownloadUri} alt={data.nickname} />
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="bookpage3">없어유2</div>
          )}

        {/* other page1 */}
        {Page3 ? (
          <div className="bookpage4">
            <div className="user-table">
              {pagedata3.map((data) => (
                <div key={data.nickname}>
                  <div>
                    <img src={data.imageDownloadUri} alt={data.nickname} className="user-image" />
                    <button>
                      <AudioPlayer
                        audioFiles={[
                          {
                            src: `${data.voiceDownloadUri}`,
                            title: "voiceDownloadUri",
                          }
                        ]}
                        rearrange={rearrangedPlayer}
                        playerWidth="50px"
                        iconSize="50px"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="bookpage4">없어유3</div>
          )}

        {/* other page2 */}
        {Page4 ? (
          <div className="bookpage5">
            <div>
              {pagedata4.map((data) => (
                <div key={data.nickname}>
                  <img src={data.imageDownloadUri} alt={data.nickname} />
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="bookpage5">없어유4</div>
          )}
        {/* 표지 뒤 */}
        <div className="bookpage6">표지 뒤</div>

      </HTMLFlipBook>
    </div>
  );
}

export default MainPage;
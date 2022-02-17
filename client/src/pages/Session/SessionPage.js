import { Link as RouterLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
// material
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
import OpenViduSession from 'openvidu-react';
import Swal from 'sweetalert2';
// layouts

// ----------------------------------------------------------------------

class SessionPage extends Component {
  constructor(props) {
    super(props);
    this.OPENVIDU_SERVER_URL = `https://${window.location.hostname}:8080`;
    this.OPENVIDU_SERVER_SECRET = 'MY_SECRET';

    this.state = {
      mentoringSeq: localStorage.getItem('mentoringSeq'),
      userId: undefined,
      teamName: undefined,
      userSeq: 0,
      token: undefined,
      userRole: undefined,
      session: undefined
    };

    this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
    this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
    this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
    this.handlerMakeCommentEvent = this.handlerMakeCommentEvent.bind(this);
  }

  componentDidMount() {
    fetch(`/v1/session/join/${this.state.mentoringSeq}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        this.setState({
          token: data.token,
          userId: data.userId,
          userRole: data.userRole,
          teamName: data.teamName,
          userSeq: data.userSeq,
          session: true
        });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  handlerJoinSessionEvent() {
    console.log('Join session');
  }

  handlerMakeCommentEvent() {
    // 세션 종료 관련 내장된 함수가 있어서
    // 따로 사용자 정의 세션 종료 관련 함수가 있다면 세션 종료 호출이 2번 불리는 것 같다.
    // 후기를 2번 받는 상황이 발생하기 때문에, 다음과 같이 현재 관리하고 있는 session의 상태를 기반으로
    // 후기를 받을지 안받을지 + 세션을 정리해줄지를 정해준다.
    if (this.state.session !== undefined) {
      if (this.state.userRole === 'USER') {
        Swal.fire({
          title: '후기는 멘토에게 큰 힘이 됩니다!😊',
          html: `<input type="text" id="comment" class="swal2-input" placeholder="Comment">`,
          showCancelButton: true,
          confirmButtonText: '후기 남기기',
          cancelButtonText: '다음에 남기기',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          focusConfirm: false,
          preConfirm: () => {
            const comment = Swal.getPopup().querySelector('#comment').value;
            console.log(comment);
            return comment;
          }
        })
          .then((comment) => {
            if (comment.value !== undefined) {
              this.createComment(comment);
              Swal.fire(
                `
            소중한 후기 감사합니다! 👍
          `.trim()
              );
            } else {
              Swal.fire(
                `
            다음에는 꼭 남겨주세요! 🙏
          `.trim()
              );
            }
          })
          .then(() => {
            this.quitSession(); // 백엔드의 세션 관련 데이터들을 먼저 정리해준다.
            this.handlerLeaveSessionEvent();
            document.location.assign('/');
          });
      } else {
        this.changeSessionState();
        this.quitSession(); // 백엔드의 세션 관련 데이터들을 먼저 정리해준다.
        this.handlerLeaveSessionEvent();
        // axios
        //   .post(`/v1/mentoring/state/${this.state.mentoringSeq}`)
        //   .then((response) => {
        //     if (response) {
        //       console.log('멘토링 상태 전환 -> 종료');
        //     }
        //   })
        //   .catch((err) => {
        //     setTimeout(() => {}, 3000);
        //   });

        document.location.assign('/');
      }
    }
  }

  handlerLeaveSessionEvent() {
    console.log('Leave session');
    this.setState({
      session: undefined
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handlerErrorEvent() {
    console.log('Leave session');
  }

  // 세션을 나가는 경우 세션의 상태를 변경하는 함수
  changeSessionState() {
    axios.get(`/v1/mentoring/state/${this.state.mentoringSeq}`);
  }

  // 세션을 나가게되면 백엔드의 세션을 관리하기 위한 함수
  quitSession() {
    const request = {
      mentoringSeq: this.state.mentoringSeq,
      token: this.state.token
    };
    axios.post(`/v1/session/quit`, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // 리뷰를 남기는 함수
  createComment(comment) {
    const request = {
      comment: comment.value,
      mentoringSeq: this.state.mentoringSeq,
      userSeq: this.state.userSeq
    };

    console.log(request);
    axios.post(`/v1/session/comment`, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog">{/* <h1> 멘토링 </h1> */}</div>
          </div>
        ) : (
          <div id="session">
            <OpenViduSession
              id="opv-session"
              sessionName={this.state.teamName}
              user={this.state.userId}
              token={this.state.token}
              joinSession={this.handlerJoinSessionEvent}
              leaveSession={this.handlerMakeCommentEvent}
              error={this.handlerErrorEvent}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SessionPage;

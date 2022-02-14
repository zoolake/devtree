import { Link as RouterLink } from 'react-router-dom';
import React, { Component } from 'react';
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
    this.OPENVIDU_SERVER_URL = `https://${window.location.hostname}:8443`;
    this.OPENVIDU_SERVER_SECRET = 'MY_SECRET';
    this.state = {
      mentoringSeq: 3,
      userId: undefined,
      teamName: undefined,
      userSeq: 1,
      token: undefined,
      userRole: undefined
    };

    this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
    this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
    this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserSeq = this.handleChangeUserSeq.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.handlerMakeCommentEvent = this.handlerMakeCommentEvent.bind(this);
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
        // const comment = prompt('후기는 멘토에게 큰 힘이 됩니다! :)');
        // if (comment !== null) {
        //   this.createComment(comment);
        //   alert('소중한 후기 감사합니다!');
        // }
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
          });
      } else {
        this.quitSession(); // 백엔드의 세션 관련 데이터들을 먼저 정리해준다.
        this.handlerLeaveSessionEvent();
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

  handleChangeSessionId(e) {
    this.setState({
      mentoringSeq: e.target.value
    });
  }

  handleChangeUserSeq(e) {
    this.setState({
      userSeq: e.target.value
    });
  }

  // eslint-disable-next-line react/sort-comp
  joinSession(event) {
    const request = {
      mentoringSeq: this.state.mentoringSeq
    };
    this.getToken(request).then((token) => {
      this.setState({
        token: token,
        session: true
      });
    });
    event.preventDefault();
    this.createSession(request).then((data) => {
      console.log(data);
      this.setState({
        token: data.token,
        userId: data.userId,
        userRole: data.userRole,
        teamName: data.teamName,
        session: true
      });
    });
    event.preventDefault();
  }

  render() {
    const { userId } = this.state;
    const { teamName } = this.state;
    const { token } = this.state;
    return (
      <div>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog">
              <h1> 멘토링 </h1>
              <form onSubmit={this.joinSession}>
                <p>
                  UserSeq:
                  <input type="text" id="userName" onChange={this.handleChangeUserSeq} required />
                </p>
                <p>
                  MentoringSeq:
                  <input
                    type="text"
                    id="sessionId"
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p>
                  <input name="commit" type="submit" value="세션 생성하기 / 참석하기" />
                </p>
              </form>
            </div>
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

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server   (POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mentoringSeq)
      .then((sessionId) => this.createToken(sessionId))
      .catch((Err) => console.error(Err));
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                this.OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
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

  // 세션을 나가게되면 백엔드의 세션을 관리하기 위한 메소드
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

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection',
          data,
          {
            headers: {
              Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default SessionPage;

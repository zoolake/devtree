import { Link as RouterLink } from 'react-router-dom';
import React, { Component } from 'react';
// material
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
import OpenViduSession from 'openvidu-react';
// layouts

// ----------------------------------------------------------------------

class SessionPage extends Component {
  constructor(props) {
    super(props);
    this.OPENVIDU_SERVER_URL = `https://${window.location.hostname}:8080`;
    this.OPENVIDU_SERVER_SECRET = 'MY_SECRET';
    this.state = {
      mentoringSeq: 3,
      userId: 'userId',
      teamName: 'teamName',
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
        const comment = prompt('후기는 멘토에게 큰 힘이 됩니다! :)');
        if (comment !== null) this.createComment(comment);
      }
      this.quitSession(); // 백엔드의 세션 관련 데이터들을 먼저 정리해준다.
      this.handlerLeaveSessionEvent();
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
      mentoringSeq: this.state.mentoringSeq,
      teamName: this.state.teamName,
      userSeq: this.state.userSeq
    };
    this.createSession(request).then((data) => {
      this.setState({
        token: data.token,
        userRole: data.userRole,
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
              sessionName={teamName}
              user={userId}
              token={token}
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

  createSession(request) {
    return new Promise((resolve, reject) => {
      console.log('createSession', request);
      axios
        .post(`${this.OPENVIDU_SERVER_URL}/v1/session/join`, request, {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${this.OPENVIDU_SERVER_SECRET}`)}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('CREATE SESSION', response);
          resolve(response.data);
        })
        .catch((response) => {
          const error = { ...response };
          if (error.response && error.response.status === 409) {
            resolve(request.mentoringSeq);
          } else {
            console.log(error);
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${this.OPENVIDU_SERVER_URL}`
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${this.OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                  `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${this.OPENVIDU_SERVER_URL}"`
              )
            ) {
              window.location.assign(`${this.OPENVIDU_SERVER_URL}/accept-certificate`);
            }
          }
        });
    });
  }

  // 리뷰를 남기는 함수
  createComment(comment) {
    const request = {
      comment,
      mentoringSeq: this.state.mentoringSeq,
      userSeq: this.state.userSeq
    };
    axios.post(`${this.OPENVIDU_SERVER_URL}/v1/session/comment`, request, {
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
    axios.post(`${this.OPENVIDU_SERVER_URL}/v1/session/quit`, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  createToken(mentoringSeq) {
    console.log(mentoringSeq);
    return new Promise((resolve, reject) => {
      const data = {
        mentoringSeq,
        teamName: '루트노드',
        userId: 'zoolake',
        userSeq: 7
      };
      console.log('createToken:', data);
      axios
        .post(`${this.OPENVIDU_SERVER_URL}/v1/session/join`, data, {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${this.OPENVIDU_SERVER_SECRET}`)}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('TOKEN 등장:', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default SessionPage;

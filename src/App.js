import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Duel from './Duel'
import Question from './Question'

class App extends Component {
  state = {
    answeringTeam: '???',
    Apoints: 0,
    Alifes: 3,
    Bpoints: 0,
    Blifes: 3,
    phase: 'duel',
    questionNumber: 0,
    pointsPool: 0,
    goodAnswers: false,
    questions: [
      {
        text: 'KTO WYPIJE DZISIAJ NAJWIECEJ ?',
        answers: [
          { text: 'Pawel', points: 39, hidden: true },
          { text: 'Janek', points: 36, hidden: true },
          { text: 'Mati', points: 18, hidden: true },
          { text: 'Ziemo', points: 7, hidden: true }
        ],
        pointsMulti: 1,
      },
      {
        text: 'PODAJ PATO IMIE DLA CHLOPAKA',
        answers: [
          { text: 'Brajan', points: 40, hidden: true },
          { text: 'Sebastian', points: 35, hidden: true },
          { text: 'Dzastin', points: 25, hidden: true },
          { text: 'Klentin', points: 25, hidden: true },
          { text: 'Alan', points: 25, hidden: true },
        ],
        pointsMulti: 1,
      },
      {
        text: 'PODAJ ZWIERZE Z MEMA?',
        answers: [
          { text: 'Nosacz', points: 53, hidden: true },
          { text: 'Shiba - Piesel', points: 32, hidden: true },
          { text: 'Zaba - Smutny Pepe', points: 15, hidden: true },
        ],
        pointsMulti: 1,
      },
      {
        text: 'PODAJ PATO IMIE DLA DZIEWCZYNKI',
        answers: [
          { text: 'Dzesika', points: 41, hidden: true },
          { text: 'Karyna', points: 29, hidden: true },
          { text: 'Andzela', points: 23, hidden: true },
          { text: 'Roksana', points: 10, hidden: true },
          { text: 'Nikola', points: 7, hidden: true },
        ],
        pointsMulti: 2,
      },
      {
        text: 'CO LUBIA JESC POLACY ?',
        answers: [
          { text: 'Schabowy', points: 40, hidden: true },
          { text: 'Kebab', points: 27, hidden: true },
          { text: 'Pierogi', points: 23, hidden: true },
          { text: 'Pizza', points: 12, hidden: true },
          { text: 'Bigos', points: 8, hidden: true }
        ],
        pointsMulti: 2,
      },
      {
        text: 'KOGO NIE LUBIA POLACY (NARODOWSC) ?',
        answers: [
          { text: 'Arabow', points: 27, hidden: true },
          { text: 'Rosjan', points: 20, hidden: true },
          { text: 'Rumunow', points: 19, hidden: true },
          { text: 'Turkow', points: 18, hidden: true },
          { text: 'Zydow', points: 15, hidden: true },
        ],
        pointsMulti: 3,
      },
    ]
  }

  _handleKeyDown = (event) => {
    switch (event.keyCode) {
      // PLAYER DUEL (A, L)
      case 65:
        if (this.state.answeringTeam === '???') {
          this.setState({ answeringTeam: 'Żbiki' });
        }
        break;
      case 76:
        if (this.state.answeringTeam === '???') {
          this.setState({ answeringTeam: 'Wilki' });
          setTimeout(() => this.setState({ phase: 'question' }), 2000)
        }
        break;
      // DISPLAY QUESTION
      case 81:
        this.setState({ phase: 'question' })
        break;
      // QUESTIONS ANSWERS (1,2,3,4,5)
      case 49:
        this.answerNumber(0)
        break;
      case 50:
        this.answerNumber(1)
        break;
      case 51:
        this.answerNumber(2)
        break;
      case 52:
        this.answerNumber(3)
        break;
      case 53:
        this.answerNumber(4)
        break;
      // LIFES
      case 90:
        //Z lower A lifes
        this.setState({ Alifes: this.state.Alifes - 1 })
        break;
      case 88:
        // X lower B lifes
        this.setState({ Blifes: this.state.Blifes - 1 })
        break;
      // TEAMS
      case 83:
        // S set team to A
        this.setState({ answeringTeam: 'Żbiki' });
        break;
      case 75:
        // K set team to B
        this.setState({ answeringTeam: 'Wilki' });
        break;
      // NEXT QUESTION
      case 32:
        // SPACE
        this.nextQuestion()
        break;
      default:
        break;
    }
  }

  nextQuestion = () => {
    if (this.state.answeringTeam === 'Żbiki') this.setState({ Apoints: this.state.Apoints + this.state.pointsPool })
    if (this.state.answeringTeam === 'Wilki') this.setState({ Bpoints: this.state.Bpoints + this.state.pointsPool })
    this.setState({ questionNumber: this.state.questionNumber + 1, Alifes: 3, Blifes: 3, pointsPool: 0, phase: 'duel', answeringTeam: '???' })
  }

  answerNumber = (number) => {
    let newquestions = this.state.questions.slice()
    newquestions[this.state.questionNumber].answers[number].hidden = false
    let points = newquestions[this.state.questionNumber].answers[number].points
    let multi = newquestions[this.state.questionNumber].pointsMulti
    this.setState({ questions: newquestions, pointsPool: this.state.pointsPool + points * multi })
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  render() {
    return (
      <div className="App" style={{ background: '#424242', height: '100vh', fontFamily: 'Pixeled' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ color: '#fff', fontSize: '20px', position: 'fixed', top: 0, left: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>Team A</p>
            <p>Punkty: {this.state.Apoints}</p>
            <div style={{ display: 'flex' }}><span style={{ paddingRight: '10px' }}>Zycia:</span> {Array(this.state.Alifes).fill(0).map(i => <img style={{ padding: "0px 5px", width: '50px', height: '50px' }} src={require("./heart.png")} />)}</div>
          </div>
          <div style={{ color: '#fff', fontSize: '20px', position: 'fixed', top: 0, right: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>Team B</p>
            <p>Punkty: {this.state.Bpoints}</p>
            <div style={{ display: 'flex' }}> <span style={{ paddingRight: '10px' }}>Zycia:</span>{Array(this.state.Blifes).fill(0).map(i => <img style={{ padding: "0px 5px", width: '50px', height: '50px' }} src={require("./heart.png")} />)}</div>
          </div>
        </div>
        {
          this.state.phase !== 'duel' && <div style={{ color: '#fff', fontSize: '20px', marginTop: '50px', color: this.state.answeringTeam === 'Żbiki' ? '#F44336' : '#4CAF50' }} >
            ODPOWIADA : {this.state.answeringTeam}
          </div>
        }
        {
          this.state.phase !== 'duel' && <div style={{ fontSize: '20px' }}>PULA PUNKTOW : {this.state.pointsPool}</div>
        }
        {
          this.state.phase === 'duel' &&
          <Duel team={this.state.answeringTeam} />
        }
        {
          this.state.phase !== 'duel' && <Question team={this.state.answeringTeam} question={this.state.questions[this.state.questionNumber]} />
        }
      </div>
    );
  }
}

export default App;

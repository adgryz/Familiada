import React from "react"

class Question extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
               <span style={{ fontSize: '30px', color: '#FFC107' }}> {this.props.question.text} </span>
                {
                    this.props.question.answers.map((answer, ind) =>
                        answer.hidden ? <div style={{ padding: '40px', color: '#FFC107' }}>{`${ind + 1}.   ...............................................................`}</div>
                            : <div style={{ padding: '40px',  color: '#FFC107'  }}>{`${ind + 1}.  ${answer.text}  ................................................  ${answer.points}`}</div>
                    )
                }
            </div>
        )
    }
}

export default Question
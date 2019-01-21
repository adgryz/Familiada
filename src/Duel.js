import React from "react"

class Duel extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '300px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <div style={{ width: '400px', height: '400px', borderRadius: '50px', fontSize: '24px', border: "25px solid #F44336", display: 'flex', justifyContent: 'center', alignItems: 'center', background: this.props.team === 'Żbiki' ? '#F44336' : 'white' }}>
                    ŻBIKI
                </div>
                <div style={{ width: '400px', height: '400px', borderRadius: '50px', fontSize: '24px', border: "25px solid #4CAF50", display: 'flex', justifyContent: 'center', alignItems: 'center', background: this.props.team === 'Wilki' ? '#4CAF50' : 'white' }}>
                    WILKI
                </div>
            </div>
        )
    }
}

export default Duel
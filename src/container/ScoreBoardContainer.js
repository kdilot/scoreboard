import React, { Component } from 'react';
import { MainLayout } from 'component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as scoreActions from 'modules/score';

class ScoreBoardContainer extends Component {
  handleScore = async (name) => {
    const { ScoreAction, score } = this.props
    const data = score.scoreboard.filter(f => f.name === name)[0]
    if (data.playing) {
      await ScoreAction.playGame({ name, data })
    }
  }
  constructor(props) {
    super(props)

    this.state = {
      handleScore: this.handleScore,
    }
  }

  render() {
    const { handleScore } = this.state

    return (
      <div>
        <MainLayout {...this.props.score} handleScore={handleScore} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    score: state.score
  }),
  (dispatch) => ({
    ScoreAction: bindActionCreators(scoreActions, dispatch)
  })
)(ScoreBoardContainer);
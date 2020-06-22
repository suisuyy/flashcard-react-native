import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';

import { setCompleteToLog } from '../utils/api';

export default class Quzz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      ifShowAnswer: false,
      numOfCorrect: 0,
      numOfNotCorrect: 0,
      quzzStatus: [],
      ifCurrentQuzzAnswered: false,
    };
  }

  render() {
    let cards = this.props.selectedDeck.cards;
    if (this.state.index >= cards.length) {
      setCompleteToLog();
      return (
        <View>
          <Result correct={this.state.numOfCorrect} total={cards.length} />

          <Button
            onPress={() => this.props.navigation.navigate('Deck')}
            title="back to deck"
            color="green"
            accessibilityLabel="go back deck"
          />
          <Button
            onPress={() => this.setState({ index: 0 })}
            title="start quzz"
            color="green"
            accessibilityLabel="restart quzz"
          />
        </View>
      );
    }
    return (
      <View>
        <Text style={{ fontSize: 20, margin: 30,color:'blue' }}>
          remain {cards.length - this.state.index} quzz
        </Text>
        <Text style={{ fontSize: 30, margin: 10,marginLeft:30 }}>
          question: {cards[this.state.index].question}
        </Text>
        <Text
          onPress={() =>
            this.setState({
              ifShowAnswer: !this.state.ifShowAnswer,
            })
          }
          style={{ fontSize: 40, margin: 30 }}>
          anwser:
          {this.state.ifShowAnswer == true
            ? cards[this.state.index].answer
            : 'click here to show answer'}
        </Text>

        <Text style={{ fontSize: 20, margin: 30,color:'green' }}>
          does your answer correct?
        </Text>
        <Button
          disabled={this.state.ifCurrentQuzzAnswered}
          onPress={() => {
            this.setState({
              numOfCorrect: this.state.numOfCorrect + 1,
              quzzStatus: this.state.quzzStatus.concat('correct'),
              ifCurrentQuzzAnswered: true,
            });
          }}
          title="correct"
          color="green"
          accessibilityLabel="next quzz"
        />
        <Button
          disabled={this.state.ifCurrentQuzzAnswered}
          onPress={() => {
            this.setState({
              numOfNotCorrect: this.state.numOfNotCorrect + 1,
              quzzStatus: this.state.quzzStatus.concat('wrong'),
              ifCurrentQuzzAnswered: true,
            });
          }}
          title="not correct"
          color="grey"
          accessibilityLabel="next quzz"
        />
        {this.state.ifCurrentQuzzAnswered === true && (
          <Text>
            quzz answered your are {this.state.quzzStatus[this.state.index]}
          </Text>
        )}
        <Button
          disabled={this.state.ifCurrentQuzzAnswered == false}
          onPress={() =>
            this.setState({
              index: this.state.index + 1,
              ifCurrentQuzzAnswered: false,
              ifShowAnswer: false,
            })
          }
          title="next"
          color="green"
          accessibilityLabel="next quzz"
        />
      </View>
    );
  }
}

function Result(props) {
  return (
    <View>
      <Text>
        you finish all quzz,nice.{'\n'}
        score:{(100 * props.correct) / props.total}%{}
      </Text>
    </View>
  );
}

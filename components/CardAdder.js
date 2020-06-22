import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';

export default class CardAdder extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, margin: 30 }}>Add card</Text>
        <Text style={{ fontSize: 20, margin: 30 }}>
          set question and answer below
        </Text>
        <TextInput
          onChangeText={(text) => this.setState({ question: text })}
          placeholder="question"
          style={{ fontSize: 20, margin: 30, borderWidth: 2 }}
        />
        <TextInput
          onChangeText={(text) => this.setState({ answer: text })}
          placeholder="answer"
          style={{ fontSize: 20, margin: 30, borderWidth: 2 }}
        />
        <Button
          onPress={() => {
            this.props.submitNewCard({
              question: this.state.question,
              answer: this.state.answer,
            });
            this.props.navigation.navigate('Deck');
          }}
          title="submit"
          color="#841584"
          accessibilityLabel="submit"
        />
      </View>
    );
  }
}


import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';

export default function Deck(props) {
  let deck = props.selectedDeck;
  if (typeof deck.title !== 'string') {
    deck.title = 'default deck to prevent erro';
    deck.cards = [];
  }
  return (
    <View>
      <Text style={{ fontSize: 20, margin: 10 }}>deck: {deck.title}</Text>
      <Text style={{ fontSize: 20, margin: 10 }}>
        {deck.cards.length === 0 ? 'sorry no' : deck.cards.length} cards
      </Text>
      <Button
        onPress={() => props.navigation.navigate('AddCard')}
        title="add card"
        color="grey"
        accessibilityLabel="add card"
      />
      {deck.cards.length > 0 && (
        <Button
          onPress={() => props.navigation.navigate('Quzz')}
          title="start quzz"
          color="green"
          accessibilityLabel="start quzz"
        />
      )}

      <Button
        onPress={() => {
          props.deleteDeck(deck.title);
          props.navigation.navigate('Home');
        }}
        title="delete deck"
        color="black"
        accessibilityLabel="delete deck"
      />
    </View>
  );
}

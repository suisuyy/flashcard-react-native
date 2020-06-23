import React from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import Deck from './components/Deck';

import {
  addDeck,
  getAllDecks,
  addCard,
  rmDeck,
  getLog,
  setCompleteToLog,
} from './utils/api';
import HomeTabs from './components/HomeTabs';
import CardAdder from './components/CardAdder';
import Quzz from './components/Quzz';

const Stack = createStackNavigator();
function AppStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {(navprops) => <HomeTabs {...props} {...navprops} />}
      </Stack.Screen>
      <Stack.Screen name="Deck">
        {(navprops) => <Deck {...props} {...navprops} />}
      </Stack.Screen>
      <Stack.Screen name="AddCard">
        {(navprops) => <CardAdder {...props} {...navprops} />}
      </Stack.Screen>
      <Stack.Screen name="Quzz">
        {(navprops) => <Quzz {...props} {...navprops} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
      selectedDeck: {},
      ifQuzzComplete: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <AppStack
          decks={this.state.decks}
          selectedDeck={this.state.selectedDeck}
          submitNewDeck={(title) => this.submitNewDeck(title)}
          selectDeck={(deck) => this.selectDeck(deck)}
          submitNewCard={(card) => this.submitNewCard(card)}
          deleteDeck={(title) => this.deleteDeck(title)}
          setQuzzComplete={(bool) => this.setQuzzComplete(bool)}
        />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    getLog().then((res) => {
      let logobj = JSON.parse(res);
      if (logobj && logobj[new Date().toDateString()] === 'complete') {
        this.setState({
          ifQuzzComplete: true,
        });
        Notifications.dismissAllNotificationsAsync();
      } else {
        if (new Date().getHours() > 20) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(()=>{
            Notifications.presentLocalNotificationAsync({
            title: 'complete your quzz now',
            body: 'you have not complete even 1 quzz  today,do it now! ',
          });
          });
          
        }
      }
    });

    getAllDecks().then((res) => {
      this.setState({ decks: JSON.parse(res) });
    });
  }

  submitNewDeck(title) {
    let newDeck = {
      title,
      cards: [],
    };
    this.setState({
      decks: {
        ...this.state.deck,
        [title]: newDeck,
      },
      selectedDeck: newDeck,
    });
    addDeck(title).then(() =>
      getAllDecks().then((res) => this.setState({ decks: JSON.parse(res) }))
    );
  }
  selectDeck(deck) {
    this.setState({
      selectedDeck: deck,
    });
  }
  submitNewCard(cardObj) {
    addCard(this.state.selectedDeck, cardObj).then(() => {
      getAllDecks().then((res) => {
        let decks = JSON.parse(res);
        this.setState({
          decks: decks,
          selectedDeck: decks[this.state.selectedDeck.title],
        });
      });
    });
  }
  deleteDeck(title) {
    rmDeck(title).then(() => {
      getAllDecks().then((res) =>
        this.setState({ decks: JSON.parse(res), selectedDeck: {} })
      );
    });
  }
  setQuzzComplete(trueorfalse) {
    this.setState({
      ifQuzzComplete: trueorfalse,
    });
  }
}


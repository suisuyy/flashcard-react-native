import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
//props need: decks{} submitNewDeck
export default function HomeTabs(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks">
        {() => <DecksScreeen decks={props.decks} {...props} />}
      </Tab.Screen>

      <Tab.Screen name="Add">
        {(navprops) => (
          <AddDeckScreen submitNewDeck={props.submitNewDeck} {...navprops} />
        )}
      </Tab.Screen>


    </Tab.Navigator>
  );
}

function DecksScreeen(props) {
  let decks = props.decks;
  if (!decks) {
    decks = {};
  }
  if (Object.values(decks).length === 0) {
    return (
      <View>
        <Text style={{ fontSize: 20, margin: 10 }}>there are no decks,add one now!</Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={{ fontSize: 20, margin: 20 }}>Decks:</Text>
      <FlatList
        data={Object.values(props.decks)}
        renderItem={({ item }) => (
          <Text
            onPress={() => {
              props.selectDeck(item);
              props.navigation.navigate('Deck');
            }}
            style={{ fontSize: 30, padding: 30, margin: 10, backgroundColor: 'lightblue' }}
          >
            {item.title}
            {item.cards.length} cards
          </Text>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}

class AddDeckScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, margin: 10 }}>Add Deck</Text>
        <Text style={{ fontSize: 20, margin: 10 }}>input title of new deck below </Text>
        <TextInput
          onChangeText={(text) => this.setState({ input: text })}
          style={{ fontSize: 20, margin: 10, borderWidth: 2 }}
        />
        <Button
          onPress={() => {
            this.props.submitNewDeck(this.state.input);
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

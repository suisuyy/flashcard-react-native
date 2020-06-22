import { AsyncStorage } from 'react-native';

export function addDeck(title) {
  let newDeck = {
    title: title,
    cards: [],
  };
  return AsyncStorage.mergeItem('decks', JSON.stringify({ [title]: newDeck }));
}

export function rmDeck(title) {
  return getAllDecks().then((res) => {
    let decks = JSON.parse(res);
    decks[title] = undefined;
    AsyncStorage.setItem('decks', JSON.stringify(decks));
  });
}

export function getAllDecks() {
  return AsyncStorage.getItem('decks');
}
//deck: the deck card added to;card:{question,answer}
export function addCard(deck, card) {
  deck.cards.push(card);
  return AsyncStorage.mergeItem(
    'decks',
    JSON.stringify({ [deck.title]: deck })
  );
}

export function setCompleteToLog() {
  let dateKey = new Date().toDateString();
  return AsyncStorage.mergeItem(
    'quzzLog',
    JSON.stringify({ [dateKey]: 'complete' })
  );
}

export function getLog() {
  let dateKey = new Date().toDateString();
  return AsyncStorage.getItem('quzzLog');
}

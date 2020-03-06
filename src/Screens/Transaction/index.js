import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';

import fire from '../../config/firebase';
import fonts from '../../config/fonts';

class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      transaction: [],
    };
  }

  componentDidMount = () => {
    this.getTransaction();
  };

  getTransaction = async () => {
    const ref = firebase.database().ref('/transaction');
    ref.on('value', snapshot => {
      let data = snapshot.val();
      let transaction = Object.values(data);
      let fix = transaction.map(item => item.data);
      let transactionFix = Object.values(fix);
      this.setState({
        transaction: transactionFix[0],
      });
    });
  };

  render() {
    const {transaction} = this.state;
    console.log(transaction);

    return (
      <View style={styles.container}>
        <Text>{transaction.duration}</Text>
        {transaction.map(item => (
          <View key={item._id}>
            <Text>{item.duration}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },,
});

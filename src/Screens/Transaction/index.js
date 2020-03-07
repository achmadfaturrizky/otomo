import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import {Placeholder} from '../../components/placeHolder';

import fire from '../../config/firebase';
import fonts from '../../config/fonts';

class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      transaction: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getTransaction();
  };

  getTransaction = async () => {
    this.setState({loading: true});
    let pathName = '/transaction/';
    await firebase
      .database()
      .ref(pathName)
      .on('value', snapshot => {
        let data = snapshot.val();
        let arrayOfTransaction = [];
        if (data) {
          for (let key in data) {
            let obj = data[key];
            for (let prop in obj) {
              let item = obj[prop];
              for (let i in item) {
                const {
                  name,
                  duration,
                  _id,
                  createdAt,
                  price,
                  driver,
                  destination,
                  date,
                  pickupPoint,
                  time,
                } = item[i];
                if (
                  _id &&
                  name &&
                  duration &&
                  createdAt &&
                  price &&
                  driver &&
                  destination &&
                  date &&
                  pickupPoint &&
                  time
                ) {
                  arrayOfTransaction.push({
                    _id,
                    name,
                    duration,
                    createdAt,
                    price,
                    driver,
                    destination,
                    date,
                    pickupPoint,
                    time,
                  });
                }
              }
            }
          }
        }
        this.setState({
          transaction: arrayOfTransaction,
          loading: false,
        });
      });
  };

  format = money => {
    let reverse = money
        .toString()
        .split('')
        .reverse()
        .join(''),
      thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand
      .join('.')
      .split('')
      .reverse()
      .join('');
    return thousand;
  };

  render() {
    const {transaction, loading} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}>Transactions</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading === true ? (
            <Placeholder />
          ) : (
            <View style={styles.cardContainer}>
              {transaction.length < 1 ? (
                <View>
                  <Text>dddd</Text>
                </View>
              ) : (
                transaction.map(item => (
                  <LinearGradient
                    colors={['#7be495', '#93f9b9']}
                    style={styles.card}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    key={item._id}>
                    <TouchableOpacity
                      style={styles.cardContent}
                      onPress={() =>
                        this.props.navigation.navigate('DetailTransaction', {
                          item,
                        })
                      }>
                      <View style={styles.content}>
                        <Text style={styles.titleContent}>{item.name}</Text>
                        <Text style={styles.textOrderId}>#ID-{item._id}</Text>
                        <Text style={styles.textOrderId}>
                          {new Date(item.createdAt).toString().slice(0, 25)}
                        </Text>
                        <Text style={styles.priceContent}>
                          Rp.{this.format(item.price)}
                        </Text>
                      </View>
                      <Image
                        style={styles.imageCard}
                        resizeMode="stretch"
                        source={require('../../assets/subs.png')}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                ))
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    fontFamily: fonts.bold,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    margin: 15,
    width: '90%',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  imageCard: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    marginLeft: 20,
  },
  titleContent: {
    fontFamily: fonts.medium,
    color: '#fff',
    fontSize: 17,
  },
  priceContent: {
    fontFamily: fonts.book,
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
  },
  textOrderId: {
    fontFamily: fonts.book,
    fontSize: 13,
    color: '#fff',
  },
});

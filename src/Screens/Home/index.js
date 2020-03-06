import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';

import fire from '../../config/firebase';
import fonts from '../../config/fonts';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      subscribe: [],
    };
  }

  componentDidMount = () => {
    this.getSubscribe();
  };

  getSubscribe = async () => {
    const ref = firebase.database().ref('/subscribe');
    ref.on('value', snapshot => {
      let data = snapshot.val();
      let subscribe = Object.values(data);
      this.setState({
        subscribe,
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
    const {subscribe} = this.state;
    console.log(subscribe);
    return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}>Subscription</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {subscribe.map(item => (
              <LinearGradient
                colors={['#7be495', '#93f9b9']}
                style={styles.card}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                key={item._id}>
                <TouchableOpacity
                  style={styles.cardContent}
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {item})
                  }>
                  <View style={styles.content}>
                    <Text style={styles.titleContent}>{item.name}</Text>
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
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
});

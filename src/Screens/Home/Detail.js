import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import fonts from '../../config/fonts';

const desc =
  'one-month subscription for Rp. 100,000, for you who want to be more efficient';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }

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
    const {name, price} = this.item;
    return (
      <>
        <View style={styles.container}>
          <LinearGradient
            colors={['#7be495', '#93f9b9']}
            style={styles.background}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
          <View style={styles.content}>
            <View style={styles.contentText}>
              <Text style={styles.titleContent}>{name}</Text>
              <Text style={styles.priceContent}>Rp. {this.format(price)}</Text>
            </View>
            <Image
              style={styles.image}
              source={require('../../assets/subs.png')}
            />
          </View>
          <View style={styles.contentDesc}>
            <Text style={styles.titleDesc}>Description</Text>
            <Text style={styles.textDesc}>
              {desc} {desc} {desc} {desc}
            </Text>
          </View>
          <View style={styles.buttonPosition}>
            <LinearGradient
              colors={['#7be495', '#93f9b9']}
              style={styles.buttonContainer}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <TouchableOpacity>
                <Text style={styles.buttonText}>Subscribe</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </>
    );
  }
}

export default Detail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  background: {
    width: '100%',
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
    bottom: '30%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentText: {
    marginLeft: 20,
    bottom: '18%',
  },
  titleContent: {
    fontFamily: fonts.medium,
    color: '#fff',
    fontSize: 20,
  },
  priceContent: {
    fontFamily: fonts.book,
    fontSize: 17,
    color: '#fff',
    marginTop: 5,
  },
  contentDesc: {
    marginTop: 100,
    marginLeft: 20,
    bottom: 200,
  },
  titleDesc: {
    fontFamily: fonts.medium,
    color: '#000',
    fontSize: 20,
  },
  textDesc: {
    fontFamily: fonts.book,
    fontSize: 15,
    color: '#000',
    marginTop: 10,
    marginRight: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  buttonPosition: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.medium,
    marginTop: 15,
    marginBottom: 15,
    color: '#fff',
    fontSize: 15,
  },
});

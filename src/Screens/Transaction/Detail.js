import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import fonts from '../../config/fonts';

class DetailTransaction extends Component {
  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }
  render() {
    const {
      name,
      price,
      _id,
      createdAt,
      date,
      driver,
      destination,
      pickupPoint,
      time,
    } = this.item;
    const format =
      new Date(createdAt).toString().slice(4, 8) +
      date +
      new Date(createdAt).toString().slice(10, 16) +
      time;
    return (
      <View style={styles.container}>
        <Text style={styles.date}>{format}</Text>
        <View style={styles.contentId}>
          <Text style={[styles.textId, {marginLeft: 20}]}>No. Order</Text>
          <Text style={[styles.textId, {marginRight: 20}]}>ID-{_id}</Text>
        </View>
        <View style={styles.driverContainer}>
          <Image
            style={styles.avatar}
            source={require('../../assets/icon/user.png')}
          />
          <View style={styles.driverContent}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.motorcycle}>{driver.motorcycle}</Text>
            <View style={styles.plateNumberContent}>
              <Text style={styles.plateNumber}>{driver.plateNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentLocation}>
          <Image
            style={styles.icon}
            source={require('../../assets/icon/pickup.png')}
          />
          <Text>{pickupPoint}</Text>
        </View>
        <View style={styles.contentLocation}>
          <Image
            style={styles.icon}
            source={require('../../assets/icon/destination.png')}
          />
          <Text>{destination}</Text>
        </View>
      </View>
    );
  }
}

export default DetailTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentId: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textId: {
    fontFamily: fonts.book,
  },
  date: {
    fontFamily: fonts.medium,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  driverContainer: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
  driverContent: {
    marginLeft: 10,
  },
  driverName: {
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  plateNumber: {
    fontFamily: fonts.medium,
    fontSize: 13,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    color: '#fff',
  },
  plateNumberContent: {
    backgroundColor: '#000',
    borderRadius: 5,
  },
  motorcycle: {
    fontFamily: fonts.medium,
  },
  icon: {
    width: 35,
    height: 35,
  },
  contentLocation: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
    alignItems: 'center',
  },
});

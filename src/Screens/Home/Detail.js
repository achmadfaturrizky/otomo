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
import firebase from 'firebase';

import fire from '../../config/firebase';
import fonts from '../../config/fonts';

const desc =
  'one-month subscription for Rp. 100,000, for you who want to be more efficient';

const driver = [
  {
    id: 1,
    name: 'Mustopa',
    motorcycle: 'Vario',
    plateNumber: 'H 2020 PA',
  },
  {
    id: 2,
    name: 'Achmad',
    motorcycle: 'Ducati',
    plateNumber: 'H 2021 PA',
  },
  {
    id: 3,
    name: 'Tiger',
    motorcycle: 'Ninja 600cc',
    plateNumber: 'H 2022 PA',
  },
];

class Detail extends Component {
  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
    this.state = {
      modalVisible: false,
      name: '',
      pickupPoint: '',
      destination: '',
      price: '',
      time1: '',
      time2: '',
    };
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModalDetailVisible(modalVisibleDetail) {
    this.setState({modalVisibleDetail});
  }

  subscribe = async () => {
    // const uid =  Math.floor(Math.random() * 10000000000000) + 1
    const {duration, name, price} = this.item;
    const {time1, time2, pickupPoint, destination} = this.state;
    const randomDriver = driver[Math.floor(Math.random() * driver.length)];
    const ref = firebase.database().ref('/transaction');
    const fixDuration = duration * 22;
    let data = [];
    let tmp = {};
    let j = 1;
    for (let i = 0; i < fixDuration; i++) {
      tmp = {
        _id: Math.floor(Math.random() * 10000000000000) + 1,
        name,
        duration,
        pickupPoint,
        destination,
        price,
        driver: randomDriver,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        date: new Date().getDate() + i,
        time: time1,
      };

      data.push(tmp);
      j++;

      tmp = {
        _id: Math.floor(Math.random() * 10000000000000) + 1,
        name,
        duration,
        pickupPoint,
        destination,
        price,
        driver: randomDriver,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        date: new Date().getDate() + i,
        time: time2,
      };
      data.push(tmp);
      j++;
    }
    if (pickupPoint === '') {
      return ToastAndroid.showWithGravity(
        'Pickup Point must be filled!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (destination === '') {
      return ToastAndroid.showWithGravity(
        'Destination must be filled!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (time1 === '') {
      return ToastAndroid.showWithGravity(
        'First Time must be filled!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (time2 === '') {
      return ToastAndroid.showWithGravity(
        'Second Time must be filled!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.setState({location: '', time1: '', time2: ''});
    ToastAndroid.showWithGravity(
      'Task successfully added',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    await ref.push({
      data,
    });
    this.setModalVisible(!this.state.modalVisible);
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
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Subscribe</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <Modal
            visible={this.state.modalVisible}
            backdropColor="transparent"
            transparent={true}
            style={styles.modalWindow}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.containerInput}>
                  <Text style={styles.modalTitle}>Details</Text>
                  <View style={styles.contentInput}>
                    <TextInput
                      onChangeText={value =>
                        this.setState({
                          name,
                        })
                      }
                      editable={false}
                      placeholder={name}
                      style={styles.textInput}
                    />
                    <TextInput
                      onChangeText={value =>
                        this.setState({
                          pickupPoint: value,
                        })
                      }
                      multiline={true}
                      numberOfLines={8}
                      placeholder="Pickup Point"
                      style={styles.inputDesc}
                    />
                    <TextInput
                      onChangeText={value =>
                        this.setState({
                          destination: value,
                        })
                      }
                      multiline={true}
                      numberOfLines={8}
                      placeholder="Destination"
                      style={styles.inputDesc}
                    />
                    <TextInput
                      onChangeText={value =>
                        this.setState({
                          time1: value,
                        })
                      }
                      placeholder="First Time"
                      style={styles.textInput}
                    />
                    <TextInput
                      onChangeText={value =>
                        this.setState({
                          time2: value,
                        })
                      }
                      placeholder="Second Time"
                      style={styles.textInput}
                    />
                    <Text style={styles.textTotal}>
                      Total: Rp. {this.format(price)}
                    </Text>
                  </View>
                  <View style={styles.containerButton}>
                    <TouchableOpacity
                      onPress={this.subscribe}
                      style={styles.buttonAdd}>
                      <Text style={styles.textButtonAdd}>Subscribe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonCancel}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.textButtonCancel}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontFamily: fonts.medium,
    fontSize: 18,
    marginLeft: 20,
  },
  containerInput: {
    marginTop: 20,
    marginBottom: 20,
  },
  contentInput: {
    marginTop: 10,
    alignItems: 'center',
  },
  textInput: {
    marginBottom: 15,
    borderRadius: 5,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#C8CEC4',
  },
  inputDesc: {
    marginBottom: 15,
    borderRadius: 5,
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#C8CEC4',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  buttonAdd: {
    backgroundColor: '#7be495',
    width: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonAdd: {
    color: '#fff',
    fontFamily: fonts.medium,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonCancel: {
    borderColor: '#7be495',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonCancel: {
    color: '#7be495',
    fontFamily: fonts.medium,
    marginTop: 10,
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  textTotal: {
    fontFamily: fonts.medium,
  },
});

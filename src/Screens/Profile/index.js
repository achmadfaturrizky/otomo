import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import fonts from '../../config/fonts';

const desc =
  'Trainer full stack developer yang berdedikasi tinggi mengajarkan teknologi terbaru dalam dunia pemrograman. Berpengalaman dalam mengembangkan aplikasi mobile menggunakan react native, react, express js maupun node js untuk back end. Mampu bekerja dalam team, mampu bekerja remote maupun onsite, serta selalu tertarik akan perkembangan UI/UX design.';
class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#7be495', '#93f9b9']}
          style={styles.background}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require('../../assets/cv.png')}
          />
          <Image
            style={styles.avatar}
            source={require('../../assets/me.jpg')}
          />
        </LinearGradient>
        <View style={styles.topContent}>
          <Text style={styles.name}>Achmad Fatur Rizky</Text>
          <Text style={styles.title}>React Native Developer</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
    top: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    top: 40,
  },
  topContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  title: {
    fontFamily: fonts.book,
    fontSize: 13,
  },
  desc: {
    fontFamily: fonts.book,
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
});

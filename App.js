import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [image, setImageurl] = useState(null);
  const [change, setChange] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImage();
    setTimeout(() => {
      changeBackground();
    }, 5000);
  }, [])

  const changeBackground = () => {
    setChange(true)
  }

  const getImage = () => {
    setLoading(true);
    fetch('https://reactnativeassignment.000webhostapp.com/view.php', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        console.log(data.data);
        let imagePath = `data:image/jpeg;base64,${data.data}`
        setImageurl(imagePath);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
  }

  let dynamicContent = '';
  if (image) {
    dynamicContent = (
      <Image
        style={styles.logo}
        source={{ uri: image }}
      />
    )
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.noContent]}>
        <ActivityIndicator size={'large'} color={'blue'} animating={true} />
      </View>
    )
  }

  if (change) {
    return (
      <SafeAreaView style={[styles.container, styles.noContent]}>
        <Text style={styles.text}> Splash Screen has disappeared</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <ActivityIndicator size={'large'} color={'blue'} animating={true} />
      </View>
      {dynamicContent}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  noContent: {
    alignItems: 'center',
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold"
  },
  topView: {
    justifyContent: "center"
  }
})
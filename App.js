import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [image, setImageurl] = useState(null);
  const [change, setChange] = useState(null);

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
    fetch('https://reactnativeassignment.000webhostapp.com/view.php', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        let imagePath = `data:image/jpeg;base64,${data.data}`
        setImageurl(imagePath);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  let dynamicContent = <Text>No Image</Text>;
  if (image) {
    dynamicContent = (
      <Image
        style={styles.logo}
        source={{ uri: image }}
      />
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
import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const EnterCoordinatesScreen = ({route, navigation}) => {
  const {profileImageUri} = route.params;
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');

  const handleSave = async () => {
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    const response = await fetch('https://dummyjson.com/products/add', {
      body: JSON.stringify({latitude, longitude}),
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });

    console.log('response', response.json());
  };

  const handleNext = () => {
    navigation.navigate('CalculateDistance', {
      profileImageUri,
      latitude,
      longitude,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Enter Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
      <Button
        title="Next"
        onPress={handleNext}
        disabled={!latitude || !longitude}
      />
    </View>
  );
};

export default EnterCoordinatesScreen;

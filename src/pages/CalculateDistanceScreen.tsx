import React from 'react';
import {View, Text, TextInput, Button, Image} from 'react-native';

const calculateDistance = (lat1: number, lon1: number) => {
  const degToRad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const earthRadiusKm = 6371;

  const dLat = degToRad(lat1);
  const dLon = degToRad(lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(dLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = earthRadiusKm * c;

  return distanceKm;
};

const CalculateDistanceScreen = ({navigation, route}) => {
  // State to hold latitude and longitude inputs
  const {profileImageUri, latitude, longitude} = route.params;
  const [latitudeState, setLatitude] = React.useState(latitude);
  const [longitudeState, setLongitude] = React.useState(longitude);
  const [distance, setDistance] = React.useState('');
  console.log('longitude', longitude);

  const handleCalculate = () => {
    const lat1 = parseFloat(latitude);
    const lon1 = parseFloat(longitude);

    const distance = calculateDistance(lat1, lon1);
    setDistance(distance);
    console.log('Calculated Distance:', distance);
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>My Uploaded Pic</Text>
      <Image source={{uri: profileImageUri ?? ''}} width={100} height={100} />
      <TextInput
        placeholder="Enter Latitude"
        value={latitudeState}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Enter Longitude"
        value={longitudeState}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      {distance ? <Text>Calculated Distance : {distance}</Text> : null}
      <Button
        title="Calculate"
        onPress={handleCalculate}
        disabled={!latitudeState || !longitudeState}
      />
      <Button title="Previous" onPress={handlePrevious} />
    </View>
  );
};

export default CalculateDistanceScreen;

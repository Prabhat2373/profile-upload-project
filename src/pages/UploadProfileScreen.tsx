import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import AWS from 'aws-sdk';
import {RNS3} from 'react-native-aws3';
AWS.config.update({
  accessKeyId: 'AKIA3KZVK3RM6V72UAHV',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

const s3 = new AWS.S3();

const UploadProfilePicScreen = ({navigation}) => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleImagePick = () => {
    ImagePicker.launchImageLibrary(
      {
        title: 'Select Profile Picture',
        mediaType: 'photo',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
      },
      response => {
        if (!response.didCancel && !response.error) {
          console.log('URI', response.assets[0].uri);

          if (response) {
            setSelectedImageUri(response.assets[0].uri ?? '');
          }
        }
      },
    );
  };

  const handleNext = async () => {
    const imageKey = `profile-pics/${Date.now()}_${Math.floor(
      Math.random() * 1000,
    )}.jpg`;

    const s3Options = {
      keyPrefix: '',
      bucket: 'equip9-testing',

      accessKey: 'AKIA3KZVK3RM6V72UAHV',
      secretKey: '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',
      region: 'ap-south-1',
      successActionStatus: 201,
    };
    console.log('imageKey', imageKey);

    // Upload image to AWS S3
    setLoading(true);
    const fileName = 'profile-pic.jpg';
    const file = {
      uri: selectedImageUri,
      name: fileName,
      type: 'image/jpeg',
    };

    const params = {
      Bucket: 'equip9-testing',
      Key: fileName,
      Body: file,
      ACL: 'public-read',
    };
    console.log('params', params);
    console.log('file', file);

    try {
      const response = await RNS3.put(file, s3Options);
      setLoading(false);
      console.log('RESPONSE', response);
      navigation.navigate('EnterCoordinates', {
        profileImageUri: selectedImageUri,
      });
    } catch (error) {
      console.log('ERRORRRRR', error);
    }
  };

  console.log('selectedImageUri', selectedImageUri);
  console.log('loading', loading);

  return (
    <View style={styles.container}>
      <Text>Upload Profile Picture</Text>
      {selectedImageUri && (
        <Image source={{uri: selectedImageUri}} style={styles.image} />
      )}
      <TouchableOpacity onPress={handleImagePick} style={styles.button}>
        <Text>Select Picture</Text>
      </TouchableOpacity>
      <Button title="Next" onPress={handleNext} disabled={!selectedImageUri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
});

export default UploadProfilePicScreen;

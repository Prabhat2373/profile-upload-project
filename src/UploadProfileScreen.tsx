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
// Configure AWS SDK with your AWS credentials
AWS.config.update({
  accessKeyId: 'AKIA3KZVK3RM6V72UAHV',
  secretAccessKey: 'OrMJ2oKSdPdnI+tM53XJcse2fY4VvZoJ3xBJPy4j',
  region: 'ap-south-1',
});

const s3 = new AWS.S3();

const UploadProfilePicScreen = ({navigation}) => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleImagePick = () => {
    // ImagePicker.showImagePicker(
    //   {
    //     title: 'Select Profile Picture',
    //     mediaType: 'photo',
    //     cancelButtonTitle: 'Cancel',
    //     takePhotoButtonTitle: 'Take Photo',
    //     chooseFromLibraryButtonTitle: 'Choose from Library',
    //   },
    //   response => {
    //     if (response.didCancel) {
    //       // User cancelled image picker
    //     } else if (response.error) {
    //       // Image picker error
    //     } else {
    //       // Selected image URI
    //       const uri = response.uri;
    //       setSelectedImageUri(uri);
    //     }
    //   },
    // );
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
          // const {uri} = response;

          if (response) {
            setSelectedImageUri(response.assets[0].uri ?? '');
          }
        }
      },
    );
  };

  const handleNext = async () => {
    // if (!selectedImageUri) return;
    const imageKey = `profile-pics/${Date.now()}_${Math.floor(
      Math.random() * 1000,
    )}.jpg`;
    const s3Options = {
      keyPrefix: '', // Optional: Prefix for the key (e.g., "profile-pics/")
      bucket: 'equip9-testing', // Replace with your actual S3 bucket name
      // region: 'YOUR_AWS_REGION', // Replace with your AWS region (e.g., 'us-east-1')
      // accessKey: 'YOUR_ACCESS_KEY', // Replace with your AWS access key
      // secretKey: 'YOUR_SECRET_KEY', // Replace with your AWS secret key
      accessKey: 'AKIA3KZVK3RM6V72UAHV',
      secretKey: 'OrMJ2oKSdPdnI+tM53XJcse2fY4VvZoJ3xBJPy4j',
      region: 'ap-south-1',
      successActionStatus: 201, // The HTTP status code expected for a successful upload (default: 201)
    };

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
      ACL: 'public-read', // Set access permissions for the uploaded image
    };
    console.log('params', params);
    console.log('file', file);

    try {
      const response = await RNS3.put(file, s3Options);
      // const s3response = await s3.upload(params).promise();
      setLoading(false);
      console.log('RESPONSE', response);
      navigation.navigate('EnterCoordinates', {
        profileImageUri: selectedImageUri,
      });
      // Image uploaded successfully, navigate to Screen 2
    } catch (error) {
      console.log('ERRORRRRR', error);

      // Handle error while uploading
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

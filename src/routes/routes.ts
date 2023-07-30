import CalculateDistanceScreen from '../pages/CalculateDistanceScreen';
import EnterCoordinatesScreen from '../pages/EnterCoordinatesScreen';
import UploadProfilePicScreen from '../pages/UploadProfileScreen';

export const MainRoutes = [
  {
    name: 'uploadProfile',
    label: 'Upload Profile',
    component: UploadProfilePicScreen,
  },
  {
    name: 'EnterCoordinates',
    label: 'Enter Coordinates',
    component: EnterCoordinatesScreen,
  },
  {
    name: 'CalculateDistance',
    label: 'Calculate Distance',
    component: CalculateDistanceScreen,
  },
];

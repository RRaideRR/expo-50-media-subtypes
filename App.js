import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Alert, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: 'All',
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const assetId = result.assets[0].assetId;

      if (!assetId) {
        return;
      }

      MediaLibrary.getAssetInfoAsync(assetId, {}).then((assetInfo) => {
        Alert.alert('Asset info', JSON.stringify(assetInfo.mediaSubtypes));
      })

    } else {
      alert('You did not select any image.');
    }
  };

  if (permissionResponse === null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        {permissionResponse.granted ? (
          <Button
            onPress={pickImageAsync}
            title={"Select Video"}
          />
        ) :
          <Button
            onPress={requestPermission}
            title={"Request Media Library Permission"}
          />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

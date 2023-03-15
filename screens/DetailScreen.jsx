import { useContext } from 'react';

import { StyleSheet, Text, ScrollView } from 'react-native';
import { AuthContext } from '../stores/AuthContext';

export const DetailScreen = ({route, navigation}) => {
  const {token} = useContext(AuthContext);
  const { item } = route.params;
  return (
    <ScrollView>
        <Text>{JSON.stringify(item, "", 4)}</Text>
    </ScrollView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  list: {
    flex: 1,
    marginTop: 0,
  }
});
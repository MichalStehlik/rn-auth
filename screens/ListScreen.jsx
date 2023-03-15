import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import {UserListItem} from "../components/app/UserListItem"
import { AuthContext } from '../stores/AuthContext';

export const ListScreen = ({navigation}) => {
  const [data, setData] = useState('');
  const {token} = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        'https://localhost:44496/api/v1/Users',
        {headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }}
      )
      .then((response) => {
        setData(response.data);
      });
  }, [token]);

  return (
        <FlatList 
        style={styles.list}
        data={data.data} 
        renderItem={({item}) => <UserListItem onPress={() => {navigation.navigate("Detail", {item: item})}} username={item.userName} />}
        keyExtractor={item => item.id}
        />
  );
}

export default ListScreen;

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
import { Pressable, StyleSheet, Text } from 'react-native';

export const UserListItem = ({ username, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text>{username}</Text>
    </Pressable>
  );
}

export default UserListItem;

const styles = StyleSheet.create({
  item: {
    padding: 8
  },
  pressed: {
    opacity: 0.7,
  },
  text: {

  }
});
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Colors } from '../constants/styles';

import { AuthContext } from '../stores/AuthContext';
//import axios from "axios";

export const SignInScreen = () => {
    const [enteredUsername, setEnteredUsername] = useState('soboty@pslib.cz');
    const [enteredPassword, setEnteredPassword] = useState('Admin_1234');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    
    const {token, login, authenticate} = useContext(AuthContext);
    const navigation = useNavigation();

    const loginHandler = async () => {
        setIsAuthenticating(true);
        /*
        axios.post("https://localhost:44496/api/v1/Account/login", 
        {username: enteredUsername, password: enteredPassword})
        .then(response => {
          authenticate(response.data.value);
          if (token) navigation.replace("Welcome");
        })
        .catch(error => {
          setInvalidPassword(true);
        })
        .then(()=>{
          setIsAuthenticating(false);
        })
        */
        
        try {
          const fetchedToken = await login(enteredUsername, enteredPassword);
          console.log(fetchedToken);
          authenticate(fetchedToken.value);
          //navigation.replace("Welcome");
        } catch (error) {
          setInvalidPassword(true);   
        }
        finally {
          setIsAuthenticating(false);
        }
        
      }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }
    
    return(
        <View style={styles.form}>
            <Input
                label="Uživatelské jméno"
                onUpdateValue={setEnteredUsername}
                value={enteredUsername}
                keyboardType="email-address"
                isInvalid={invalidUsername}
            />
            <Input
                label="Heslo"
                onUpdateValue={setEnteredPassword}
                secure
                value={enteredPassword}
                isInvalid={invalidPassword}
            />
            <View style={styles.buttons}>
                <Button onPress={loginHandler}>Příhlášení</Button>
                <Button onPress={() => navigation.navigate("SignUp")}>Registrace</Button>
            </View>
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    form: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      },
    buttons: {
      marginTop: 12,
    },
  });
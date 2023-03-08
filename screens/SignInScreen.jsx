import { useContext, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Colors } from '../constants/styles';

import { AuthContext } from '../stores/AuthContext';

export const SignInScreen = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();

    async function loginHandler() {
        console.log("Log");
        setIsAuthenticating(true);
        try {
          //await authCtx.login(enteredEmail, enteredPassword);
          navigation.replace('Welcome');
        } catch (error) {
          Alert.alert(
            'Authentication failed!',
            'Could not log you in. Please check your credentials or try again later!'
          );
          setIsAuthenticating(false);
        }
      }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }
    
    return(
        <View style={styles.form}>
            <Input
                label="Email Address"
                onUpdateValue={setEnteredEmail}
                value={enteredEmail}
                keyboardType="email-address"
                isInvalid={invalidEmail}
            />
            <Input
                label="Password"
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
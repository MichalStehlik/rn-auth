import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Colors } from '../constants/styles';

import { AuthContext } from '../stores/AuthContext';

export const SignUpScreen = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordCopy, setEnteredPasswordCopy] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    
    const {token} = useContext(AuthContext);
    const navigation = useNavigation();

    async function registrationHandler() {
        console.log("Registration");
      }

    if (isAuthenticating) {
        return <LoadingOverlay message="Registration in progress" />;
    }
    
    return(
        <View style={styles.form}>
            <Input
                label="Email"
                onUpdateValue={setEnteredEmail}
                value={enteredEmail}
                keyboardType="email-address"
                isInvalid={invalidEmail}
            />
            <Input
                label="Heslo"
                onUpdateValue={setEnteredPassword}
                secure
                value={enteredPassword}
                isInvalid={invalidPassword}
            />
            <Input
                label="Heslo pro kontrolu"
                onUpdateValue={setEnteredPasswordCopy}
                secure
                value={enteredPasswordCopy}
                isInvalid={invalidPassword}
            />
            <View style={styles.buttons}>
                <Button onPress={registrationHandler}>Registrace</Button>
                <Button onPress={() => navigation.navigate("SignIn")}>Zpět na příhlášení</Button>
            </View>
        </View>
    );
}

export default SignUpScreen;

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
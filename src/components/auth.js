import { View, Text, TextInput, Button } from 'react-native'
import {styles, colors} from './styles/mainStyle'
import { useState } from 'react';

export default function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function checkLogin() {
        const response = fetch('http://192.168.0.108:3000/check-login')
    }


    return(
        <View style={styles.container}>
            <View style={styles.containerAuth}>
                <View>
                    <Text style={styles.textStyle}>Usuário:</Text>
                    <TextInput placeholder='Digite o seu usuário:' placeholderTextColor={colors.primary}  style={styles.textInput} value={username} onChangeText={setUsername}/>
                </View>
                <View>
                    <Text style={styles.textStyle}>Senha:</Text>
                    <TextInput placeholder='Digite a sua senha:'  placeholderTextColor={colors.primary}  style={styles.textInput} value={password} onChangeText={setPassword}/>
                </View>
                <View>
                    <Button title='Entrar' onPress={console.log(username, password)}></Button>
                </View>
            </View>
        </View>
    )
}
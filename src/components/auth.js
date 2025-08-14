import { View, Text, TextInput, Button } from 'react-native'
import {styles, colors} from './styles/mainStyle'
import { useState } from 'react';

export default function Auth( { navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [returnLogin, setReturnLogin] = useState([])


    async function checkLogin(username, password) {
        const resLogin = await fetch(`http://192.168.0.218:3000/check-login?username=${username}&password=${password}`)
        const reqLogin = await resLogin.json();
        setReturnLogin(reqLogin)

        console.log(reqLogin)

        if(reqLogin.success === false ) {
            setPassword('')
            alert(reqLogin.message)
            return
        }

        if(reqLogin.success === true ) {
            navigation.navigate("Bem-Vindo")
        }
        
        console.log(returnLogin)
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
                    <Button title='Entrar' onPress={() => checkLogin(username, password)}></Button>
                </View>
            </View>
        </View>
    )
}
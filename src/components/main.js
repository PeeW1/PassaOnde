import { View, Text, Button, Pressable } from 'react-native'
import {styles, colors} from './styles/mainStyle'
import Auth from './auth'
import Register from './register'
import SelectMenu from './SelectMenu'
import Users from './users'
import  AntDesign   from '@expo/vector-icons/AntDesign';

export default function Main( { navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <View style={styles.footer}>
                <Pressable 
                    style={styles.buttonFooter}
                    onPress={() => navigation.navigate('Cadastrar')}
                    >
                    <AntDesign name='adduser' size={25} color="white"/>
                    <Text style={styles.buttonFooterText}>Cadastrar</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonFooter}
                    onPress={() => navigation.navigate('Linhas')}
                    >
                    <AntDesign name='search1' size={35} color="white"/>
                    <Text style={styles.buttonFooterText}>Linhas</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonFooter}
                    onPress={() => navigation.navigate('Usuários')}
                >
                    <AntDesign name = 'user' size={25} color="white"/>
                    <Text style={styles.buttonFooterText}>Usuários</Text>
                </Pressable>
            </View>
        </View>
    )
}
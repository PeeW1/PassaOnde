import { View, 
    Text, 
    TextInput, 
    Button, 
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable
} 
    from 'react-native'
import {styles, colors} from './styles/mainStyle'
import { StyleSheet } from 'react-native';
import { use, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

export default function UserPage({ navigation }) {
    const route = useRoute();
    const { motorista, linhaManha, linhaMeiodia, linhaTarde } = route.params
    const [escola, setEscola] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch('http://192.168.0.108:3000/filter-name-school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    linhaManha: linhaManha,
                    linhaMeiodia: linhaMeiodia,
                    linhaTarde: linhaTarde
                }),
            });
            const data = await response.json();
            setEscola(data);
        } catch (error) {
            console.error('Erro ao cadastrar motorista:', error);
        }

        }
        fetchData()
    }, []);


    return(
        <SafeAreaView style={styles.container}>
            <View style={stylesUserPage.containerMain}>
                <View>
                    <Text style={{color:'white', fontSize:25}}>{motorista.nome}</Text>
                </View>
                <View style={stylesUserPage.containerShowSchools}>
                    <View style={stylesUserPage.showSchoolsTextContainer}>
                        <Text style={stylesUserPage.showSchoolsText}>Escolas turno manhã:</Text>
                    </View>
                    <View style={stylesUserPage.showSchools}>
                        {escola.filter(item => item.turno === 'manha').map(item => (
                                <Text key={item.id} style={styles.title}>
                                    {item.nome + ' '} 
                                </Text>
                        ))}
                    </View>
                </View>
                <View style={stylesUserPage.containerShowSchools}>
                    <View style={stylesUserPage.showSchoolsTextContainer}>
                        <Text style={stylesUserPage.showSchoolsText}>Escolas turno meio-dia:</Text>
                    </View>
                    <View style={stylesUserPage.showSchools}>
                        {escola.filter(item => item.turno === 'meiodia').map(item => (
                                <Text key={item.id} style={styles.title}>
                                    {item.nome + ' '} 
                                </Text>
                        ))}
                    </View>
                </View>
                <View style={stylesUserPage.containerShowSchools}>
                    <View style={stylesUserPage.showSchoolsTextContainer}>
                        <Text style={stylesUserPage.showSchoolsText}>Escolas turno tarde:</Text>
                    </View>
                    <View style={stylesUserPage.showSchools}>
                        {escola.filter(item => item.turno === 'tarde').map(item => (
                                <Text key={item.id} style={styles.title}>
                                    {item.nome + ' '} 
                                </Text>
                        ))}
                    </View>
                </View>
                <View style={stylesUserPage.containerTextInput}>
                    <View style={stylesUserPage.showSchoolsTextContainer}>
                        <Text style={stylesUserPage.showSchoolsText}>Observação:</Text>
                    </View>
                    <View style={stylesUserPage.textInput}>
                        <TextInput placeholder='Digite uma observação' key={motorista.id} multiline={true}></TextInput>
                    </View>
                    <View style={stylesUserPage.containerTextInputButton}>
                        <Pressable style={stylesUserPage.textInputButton} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.textButton}>Salvar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
    </SafeAreaView>
    )
    
}

const stylesUserPage = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        gap: 20,
        width: '100%',
        height: 'auto',
    },
    containerShowSchools: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '100%',
        height: 'auto',
    },
    showSchools: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        height: '80',
        flexDirection: 'row',
        flexWrap: 'wrap',              
        alignItems: 'center',
        justifyContent: 'center',  
    },
    showSchoolsTextContainer: {
        width: '80%',
        height: 'auto',
        alignItems: 'start',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        marginBottom: 5,
    },
    showSchoolsText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'start',
    },
    containerTextInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: 5,
        width: '100%',
        height: 'auto',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        height: 100,
        padding: 10,
    },
    containerTextInputButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        marginTop: 30,
    },
    textInputButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '50%',
        height: 'auto',
        padding: 10,
    }
})
 
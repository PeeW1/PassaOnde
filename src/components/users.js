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
import UserPage from './userPage';
import {styles, colors} from './styles/mainStyle'
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from 'react';


export default function Users({ navigation }) {
    const [motorista, setMotorista] = useState([])
    const [escola, setEscola] = useState([])
    const [turno, setTurno] = useState([])
    const [searchLinha, setSearchLinha] = useState([])
    

    
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const resMotorista = await fetch('http://192.168.0.108:3000/motoristas')
                const jsonMotorista = await resMotorista.json();

                const resEscola = await fetch('http://192.168.0.108:3000/escolas')
                const jsonEscola = await resEscola.json();

                const resTurno = await fetch('http://192.168.0.108:3000/turnos')
                const jsonTurno = await resTurno.json();

                const resSearchLinha = await fetch('http://192.168.0.108:3000/buscar-linha')
                const jsonSearchLinha = await resSearchLinha.json();
                
                setMotorista(jsonMotorista)
                setEscola(jsonEscola)
                setTurno(jsonTurno)
                setSearchLinha(jsonSearchLinha)
            }catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        fetchData()
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList
                    data={motorista}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.selectedMenus}>
                            <Text style={styles.textStyle}>{item.nome}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const filteredSearchLinhaManha = searchLinha.filter(linha => linha.motorista_id === item.id && linha.turno === 'manha');
                                    const filteredSearchLinhaMeiodia = searchLinha.filter(linha => linha.motorista_id === item.id && linha.turno === 'meiodia');
                                    const filteredSearchLinhaTarde = searchLinha.filter(linha => linha.motorista_id === item.id && linha.turno === 'tarde');
                                    navigation.navigate('Usuário', {
                                        motorista: item,
                                        linhaManha: filteredSearchLinhaManha,
                                        linhaMeiodia: filteredSearchLinhaMeiodia,
                                        linhaTarde: filteredSearchLinhaTarde
                                    })
                                }}
                            >
                                <AntDesign name='right' size={20} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )

}
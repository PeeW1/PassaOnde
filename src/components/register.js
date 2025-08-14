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
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from 'react';
    



export default function Register( { navigation }) {
    const [motorista, setMotorista] = useState([])
    const [escola, setEscola] = useState([])
    const [turno, setTurno] = useState([])
    
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const resMotorista = await fetch('http://192.168.0.218:3000/motoristas')
                const jsonMotorista = await resMotorista.json();

                const resEscola = await fetch('http://192.168.0.218:3000/escolas')
                const jsonEscola = await resEscola.json();

                const resTurno = await fetch('http://192.168.0.218:3000/turnos')
                const jsonTurno = await resTurno.json();
                
                setMotorista(jsonMotorista)
                setEscola(jsonEscola)
                setTurno(jsonTurno) 
            }catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        fetchData()
    }, []);

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [schools, setSchools] = useState([])
    function handleSchool(item, turno) {
        setSchools(prevSelected => [...prevSelected, {...item, turno}])
    }

    const [visible, setVisible] = useState({
        manha: false,
        meiodia: false,
        tarde: false
    })
    function handleVisible(turno) {
        setVisible(prevVisible => ({
            ...prevVisible,
            [turno]: !prevVisible[turno]
        }))
    }
    
    const registerMotorista = async () => {
        try {
            const response = await fetch('http://192.168.0.218:3000/cadastrar-motorista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: name,
                    username: username,
                    password: password,
                    escolas: schools
                }),
            });
        } catch (error) {
            console.error('Erro ao cadastrar motorista:', error);
        }
    }
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.containerAuth}>
            <View>
                <Text style={styles.textStyle}>Nome motorista:</Text>
                <TextInput style={styles.textInput} value={name} onChangeText={setName}/>
            </View>
            <View>
                <Text style={styles.textStyle}>Digite  o usuário do motorista:</Text>
                <TextInput style={styles.textInput} value={username} onChangeText={setUsername}/>
            </View>
            <View>
                <Text style={styles.textStyle}>Digite  a senha do motorista:</Text>
                <TextInput style={styles.textInput} value={password} onChangeText={setPassword}/>
            </View>
            <View>
                <Text style={styles.textStyle}>Selecione as escolas(Manhã)</Text>
                <TouchableOpacity style={styles.selectedMenus} onPress={() => {handleVisible('manha')}}>
                    <Text>Selecione as escolas:</Text>
                    <AntDesign name="down" size={15} color="black" />
                </TouchableOpacity>
                <Modal visible={visible.manha} animationType='fade'  transparent >
                                        <TouchableWithoutFeedback onPress={()=>handleVisible('manha')}>
                                            <View style={styles.containerModal}>
                                                <View style={styles.modalMenus}> 
                                                    <FlatList 
                                                        data={escola}
                                                        keyExtractor={(item) => item.id}
                                                        renderItem={({item}) => (
                                                            <TouchableOpacity onPress={()=> handleSchool(item, 'manha')}>
                                                                <Text style={{color: schools.some(s => s.id === item.id && s.turno === 'manha') ? 'white' : 'black', 
                                                                    backgroundColor: schools.some(s => s.id === item.id && s.turno === 'manha') ? colors.gray : 'transparent',
                                                                    padding: 5,
                                                                    borderRadius: 5,
                                                                    marginVertical: 5
                                                                }}>{item.nome}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                <Pressable
                                                    style={styles.button2}
                                                    onPress={() => {
                                                        handleVisible('manha');
                                                    }}
                                                >
                                                    <Text style={{color: colors.primary }}>Cadastrar</Text>                  
                                                </Pressable>
                                            </View>
                                        </TouchableWithoutFeedback>
                                </Modal>                                                                                      
            </View>
                
            <View>
                <Text style={styles.textStyle}>Selecione as escolas(Meio-Dia)</Text>
                <TouchableOpacity style={styles.selectedMenus} onPress={() => {handleVisible('meiodia')}}>
                    <Text>Selecione as escolas:</Text>
                    <AntDesign name="down" size={15} color="black" />
                </TouchableOpacity>
                <Modal visible={visible.meiodia} animationType='fade'  transparent >
                                        <TouchableWithoutFeedback onPress={()=>handleVisible('meiodia')}>
                                            <View style={styles.containerModal}>
                                                <View style={styles.modalMenus}> 
                                                    <FlatList 
                                                        data={escola}
                                                        keyExtractor={(item) => item.id}
                                                        renderItem={({item}) => (
                                                            <TouchableOpacity onPress={()=> handleSchool(item, 'meiodia')}>
                                                                <Text style={{color: schools.some(s => s.id === item.id && s.turno === 'meiodia') ? 'white' : 'black', 
                                                                    backgroundColor: schools.some(s => s.id === item.id && s.turno === 'meiodia') ? colors.gray : 'transparent',
                                                                    padding: 5,
                                                                    borderRadius: 5,
                                                                    marginVertical: 5
                                                                }}>{item.nome}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                <Pressable
                                                    style={styles.button2}
                                                    onPress={() => {
                                                        handleVisible('meiodia');
                                                    }}
                                                >
                                                    <Text style={{color: colors.primary}}>Cadastrar</Text>                  
                                                </Pressable>
                                            </View>
                                        </TouchableWithoutFeedback>
                                </Modal>                                                                       
            </View>

            <View>
                <Text style={styles.textStyle}>Selecione as escolas(Tarde)</Text>
                <TouchableOpacity style={styles.selectedMenus} onPress={() => {handleVisible('tarde')}}>
                    <Text>Selecione as escolas:</Text>
                    <AntDesign name="down" size={15} color="black" />
                </TouchableOpacity>
                <Modal visible={visible.tarde} animationType='fade'  transparent >
                                        <TouchableWithoutFeedback onPress={()=>handleVisible('tarde')}>
                                            <View style={styles.containerModal}>
                                                <View style={styles.modalMenus}> 
                                                    <FlatList 
                                                        data={escola}
                                                        keyExtractor={(item) => item.id}
                                                        renderItem={({item}) => (
                                                            <TouchableOpacity onPress={()=> handleSchool(item, 'tarde')}>
                                                                <Text style={{color: schools.some(s => s.id === item.id && s.turno === 'tarde') ? 'white' : 'black', 
                                                                    backgroundColor: schools.some(s => s.id === item.id && s.turno === 'tarde') ? colors.gray : 'transparent',
                                                                    padding: 5,
                                                                    borderRadius: 5,
                                                                    marginVertical: 5
                                                                }}>{item.nome}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                <Pressable
                                                    style={styles.button2}
                                                    onPress={() => {
                                                        handleVisible('tarde');
                                                    }}
                                                >
                                                    <Text style={{color: colors.primary}}>Cadastrar</Text>                  
                                                </Pressable>
                                            </View>
                                        </TouchableWithoutFeedback>
                                </Modal>                                                                       
            </View>
            <View>
                <Pressable
                style={styles.button1}
                onPress={() => registerMotorista(name, username, password, schools)}
                >
                      <Text style={{color:'white'}}>Cadastrar</Text>                  
                </Pressable>
            </View>
        </View>
      </SafeAreaView>
    )
}

const stylesRegister = StyleSheet.create({
    
})  
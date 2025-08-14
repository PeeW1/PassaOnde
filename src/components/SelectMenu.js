import React, { useEffect, useState } from 'react';
import { 
    View, Text, SafeAreaView, 
    TouchableOpacity, 
    Modal, FlatList, TouchableWithoutFeedback,
    Button
} 
    from 'react-native';
import {styles, colors} from './styles/mainStyle'
import AntDesign from '@expo/vector-icons/AntDesign';





export default function SelectMenu({ navigation }) {
    
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
                console.log(jsonMotorista, jsonEscola, )
            }catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        fetchData()
    }, []);

    const [selected, setSelected] = useState(null)
    const [visible, setVisible] = useState(false)
    const showDropdown = () => setVisible(true)
    function handleDropdown(item) {
        setSelected(item)
        setVisible(false)
    }

    const [selectedSchool, setSelectedSchool] = useState(null)
    const [visibleSchool, setVisibleSchool] = useState(false)
    const showDropdownSchool = () => setVisibleSchool(true)
    function handleDropdownSchool(item) {
        setSelectedSchool(item)
        setVisibleSchool(false)
    }
    
    const [selectedTime, setSelectedTime] = useState(null)
    const [visibleTime, setVisibleTime] = useState(false)
    const showDropdownTime = () => setVisibleTime(true)
    function handleDropdownTime(item) {
        setSelectedTime(item)
        setVisibleTime(false)
    }

    const [returnLinha, setReturnLinha] = useState([])
    async function searchLinha( escola, turno) {
        console.log( escola, turno)
        try {
            const resLinha = await fetch(`http://192.168.0.218:3000/linhas?escola=${escola}&turno=${turno}`)
            const reqLinha = await resLinha.json();
            setReturnLinha(reqLinha)
        }catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.whiteH1}>Escolha as opcoes</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.selectedMenus} onPress={() => {showDropdown()}}>
                    <Text> {selected ? selected.nome : 'Selecione um motorista'}</Text>
                    <AntDesign name="down" size={15} color="black" />
                </TouchableOpacity>
                <Modal visible={visible} animationType='fade'  transparent >
                        <TouchableWithoutFeedback onPress={()=>setVisible(false)}>
                            <View style={styles.containerModal}>
                                <View style={styles.modalMenus}> 
                                    <FlatList 
                                        data={motorista}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({item}) => (
                                            <TouchableOpacity onPress={()=> handleDropdown(item)}>
                                                <Text style={{color: 'black'}}>{item.nome}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                </Modal>
            </View>

            <View>
                <TouchableOpacity style={styles.selectedMenus} onPress={() => {showDropdownSchool()}}>
                    <Text> {selectedSchool ? selectedSchool.nome : 'Selecione uma escola'}</Text>
                    <AntDesign name="down" size={15} color="black" />
                </TouchableOpacity>
                <Modal visible={visibleSchool} animationType='fade'  transparent >
                        <TouchableWithoutFeedback onPress={()=>setVisibleSchool(false)}>
                            <View style={styles.containerModal}>
                                <View style={styles.modalMenus}> 
                                    <FlatList 
                                        data={escola}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({item}) => (
                                            <TouchableOpacity onPress={()=> handleDropdownSchool(item)}>
                                                <Text style={{color: 'black'}}>{item.nome}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                </Modal>                          
            </View>

            <View>
                <TouchableOpacity style={styles.selectedMenus} onPress={() => {showDropdownTime()}}>
                    <Text> {selectedTime ? selectedTime.turno : 'Selecione um turno'}</Text>
                    <AntDesign name="down" size={15} color="black" />
                </TouchableOpacity>
                <Modal visible={visibleTime} animationType='fade'  transparent >
                        <TouchableWithoutFeedback onPress={()=> setVisibleTime(false)}>
                            <View style={styles.containerModal}>
                                <View style={styles.modalMenus}> 
                                    <FlatList 
                                        data={turno}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({item}) => (
                                            <TouchableOpacity onPress={()=> handleDropdownTime(item)}>
                                                <Text style={{color: 'black'}}>{item.turno}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                </Modal>                          
            </View>
            <View>
                <Button title='Enviar' 
                onPress={()=> searchLinha(selectedSchool.id, selectedTime.turno)}>
                </Button>
            </View>
            <View style={styles.returnLinha}>
                {returnLinha && returnLinha.length > 0 ? (
                    returnLinha.map((item) => (
                        <Text key={item.motorista_id}>{item.nome}</Text>
                    ))
                    ) : (
                    <Text>Nenhum motorista encontrado.</Text>
                    )}
            </View>
        </SafeAreaView>
      );
}


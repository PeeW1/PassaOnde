
import { View, Text, TextInput, StyleSheet} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const colors = {
    primary: '#333333',
    gray: '#666666'
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      width: '100%',
        height: 'auto',
    },
    containerModal: {
        flex: 1,                          
        justifyContent: 'center',        
        alignItems: 'center',            
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
    containerAuth: {
        color: 'white',
        display: 'flex',
        gap: '10',
        width: '250',
        height: 'auto',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10    
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.primary,
        paddingLeft: 10
    },
    textStyle: {
        fontFamily:'Font-Ghotic',
        color: colors.primary,
    },
    whiteH1: {
        fontSize: 28,
        color: 'white',
        fontWeight: 700,
    },
    selectedMenus: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'white',
        width: 200,
        height: 'auto',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        textAlign: 'center',
    },
    modalMenus: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        height: 'auto',                
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,      
    },
    returnLinha: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: 'auto',
        height: 'auto',                
        alignItems: 'center',
        justifyContent: 'center',       
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-around',
        gap: 50,
        bottom:0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '110%',
        height: 'auto',                
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    buttonFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 20,   
    },
    buttonFooterText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    button1: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        width: 'auto',
        height: 'auto',                
        alignItems: 'center',
        justifyContent: 'center',   
    },
    button2: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        height: 'auto',                
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10, 
    },
    showLinhas: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: 'auto',
        height: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',              
        alignItems: 'center',
        justifyContent: 'center',  
    }
  });
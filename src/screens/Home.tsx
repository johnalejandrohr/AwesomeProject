import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert
} from 'react-native';
import { Dimensions } from "react-native";
import { useSelector } from 'react-redux';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

function Home({navigation}) {
    const user = useSelector((state) => state.user);
    return (
        <SafeAreaView>
          <StatusBar
            
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.auth}>
                <Text style={styles.textAuth}>{user.name}</Text>
                <Text style={styles.textAuth}>{user.email}</Text>
            </View>
            <View style={styles.container}>
              <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>Inicio de sesión</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.text}>Registro</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.text}>Editar perfil</Text>
              </Pressable>
            </View>
            
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        width:width,
        height: height,
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        padding:50
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      text: {
        fontSize: 16,
        lineHeight: 28,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      auth: {
        width:width,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'orange'
      },
      textAuth: {
        fontSize: 16,
        lineHeight: 28,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      }
    });
    
    export default Home;
    
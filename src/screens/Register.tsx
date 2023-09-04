import {Text, View, TextInput, StyleSheet, Pressable, Alert} from 'react-native'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { URL } from '../utils';

function Register({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
      const url = URL+'register'
      const data = {
        name,
        email,
        password
      };
      setLoading(true);
      try {
        const response = await axios.post(url, data, {timeout: 5000});
        if(response.data.success) {
          dispatch(addUser(response.data.user))
          setLoading(false);
          navigation.navigate('Profile');
        } else {
          Alert.alert(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error");
        setLoading(false);
      }

  }

  return (
   <>
   <View style={styles.container}>
      <Text>{loading ? 'cargando...':null}</Text>
      <TextInput
        onChangeText={name => setName(name)}
        value={name}
        placeholder="Input Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={email => setEmail(email)}
        value={email}
        placeholder="Input Email"
        style={styles.input}
      />
      <TextInput
        onChangeText={password => setPassword(password)}
        value={password}
        placeholder="Input Password"
        style={styles.input}
        secureTextEntry={true}
      />
       <TextInput
        onChangeText={password => setPassword(password)}
        value={password}
        placeholder="Confirmed Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={() => onRegister()}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
   </View>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:50
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  button: {
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
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
});

export default Register;

import {Text, View, TextInput, StyleSheet, Pressable, Alert} from 'react-native'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { URL } from '../utils';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);

  const onEditProfile = async () => {
    const url = URL+'users/'+user.id
    const data = {
      name,
      email,
      password
    };
    setLoading(true);
    try {
      const response = await axios.put(url, data, {timeout: 5000});
      if(response.data.success) {
        dispatch(addUser(response.data.user))
        setLoading(false);
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

      {
        user.auth ?
        (<Pressable style={styles.button} onPress={() => onEditProfile()}>
          <Text style={styles.text}>Edit profile</Text>
        </Pressable>):<Text>To edit the profile you must first login</Text>
      }
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

export default Profile;

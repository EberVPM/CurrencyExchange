import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const data2 = [
  {name: 'Euro', code: 'EUR'},
  {name: 'Dolar', code: 'USD'},
  {name: 'Bolivar', code: '3'},
  {name: 'Peso argentino', code: 'ARS'},
  {name: 'Peso mexicano', code: 'MXN'},
  {name: 'Libra', code: '6'},
  {name: 'Yen', code: '7'},
  {name: 'Won', code: '8'},
];

const URL = 'https://api.manyapis.com/v1-list-currency';

const Home = () => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null)
  const [data, setData] = useState({});
  const [monto, setMonto] = useState("")
  const [total, setTotal] = useState("0.00")
  const [isLoading, setIsLoading] = useState(true);
  const [chiste, setChiste] = useState("Cuando hagas una conversion aparecera un chiste")

  const getData = async () => {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-api-key": "sk_f8e237fdf3aa46da84057b1af836928a"
      }
    });

    const nose = await response.json();
    setData(nose);
    setIsLoading(false);
  };

  const convert = async () => {

    const m = monto.toString()
    const date = new Date()
    const fecha = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`

    const url = `https://api.fxratesapi.com/convert?from=${value}&to=${value2}&date=${fecha}&amount=${m}&format=json`

    const response = await fetch(url, {
      method: "GET"
    })

    const response2 = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es&type=single", {
      method: "GET"
    })

    const nose2 = await response2.json()
    setChiste(nose2.joke)

    const nose = await response.json()
    setTotal(nose.result.toString())
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.bg}>
      {isLoading ? (
        <Text>Gargando...</Text>
      ) : (
        <ImageBackground
          source={require('../images/bg.jpg')}
          blurRadius={10}
          style={styles.container}>
          <Text style={styles.title}>Cambio de divisas</Text>
          <View style={styles.card}>
            <Text style={styles.text}>De:</Text>
            <Dropdown
              style={styles.dropdown}
              data={data}
              search
              labelField={'name'}
              valueField={'code'}
              placeholder="Selecciona una divisa"
              searchPlaceholder="Buscar divisa..."
              value={value}
              onChange={item => {
                setValue(item.code);
              }}
            />
            <Text style={styles.text}>Inresa el monto</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="number-pad"
              onChangeText={setMonto}
              value={monto.toString()}
            />
          </View>
          <View style={styles.card}>
            <Text>{chiste}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}>A:</Text>
            <Dropdown
              style={styles.dropdown}
              data={data}
              search
              labelField={'name'}
              valueField={'code'}
              placeholder="Selecciona una divisa"
              searchPlaceholder="Buscar divisa..."
              value={value2}
              onChange={item => {
                setValue2(item.code);
              }}
            />
            <Text style={styles.text}>Inresa el monto</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="number-pad"
              readOnly
              value={total}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={convert}>
            <Text style={styles.textButton}>Converir</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
  },
  container: {
    height: 830,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '80%',
  },
  change: {
    width: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#e8ebf0',
    borderRadius: 30,
    padding: 20,
  },
  input: {
    backgroundColor: '#e8ebf0',
    borderRadius: 30,
    padding: 10,
  },
  bg: {
    backgroundColor: '#e8ebf0',
    height: '100%',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: '#6d55f2',
    padding: 15,
    borderRadius: 20,
    width: '80%',
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Home;

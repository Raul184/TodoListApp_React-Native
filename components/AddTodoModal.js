import React ,{useState} from 'react'
import {View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,TextInput} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../shared/Colors'
import PropTypes from 'prop-types'
import tempData from '../tempData'

const AddTodoModal = ({closeModal, backgroundColors,addTodo}) => {
  const [data, setData] = useState({
    name: '',
    color: backgroundColors[0]
  })
  const createTodo = () => {
    const{ name,color } = data;
    const list = {name,color};
    addTodo(list)
    setData({ ...data, name:''})
    closeModal()
  };
  const renderColors = () => backgroundColors.map(
    el => <TouchableOpacity 
      key={el} 
      style={[styles.colorSelect, {backgroundColor:el}]}
      onPress={() => setData({ ...data, color: el})}
    />
  );

  return <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <TouchableOpacity style={styles.iconClose} onPress={closeModal}>
      <AntDesign name='close'size={28} color={colors.black}/>
    </TouchableOpacity>
    <View style={styles.strech}>
      <Text style={styles.title}>Create Todo</Text>
      <TextInput 
        style={styles.input} 
        placeholder="What's next?"
        onChangeText={text => setData({ ...data, name:text})}
      />
      <View style={{flexDirection:'row',justifyContent:'space-around', marginTop:15}}>
        {renderColors()}
      </View>
      <TouchableOpacity 
        style={[styles.closeModalAdd,{backgroundColor:data.color}]}
        onPress={createTodo}
      >
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
}

AddTodoModal.propTypes = {
  backgroundColors: PropTypes.array,
};

AddTodoModal.defaultProps = {
  backgroundColors:["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D80000", "#f7f74c" ]
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  iconClose:{
    position:'absolute',
    top:64,
    right:32
  },
  strech:{
    alignSelf: 'stretch',
    marginHorizontal: 32
  },
  title:{
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16
  },
  input:{
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  closeModalAdd:{
    marginTop:24,
    height:50,
    borderRadius:6,
    alignItems:'center',
    justifyContent:'center'
  },
  save:{
    color:colors.white,
    fontWeight:'600'
  },
  colorSelect:{
    width:30,
    height:30,
    borderRadius:4
  }
})

export default AddTodoModal;
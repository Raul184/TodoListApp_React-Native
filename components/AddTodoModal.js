import React from 'react'
import {StyleSheet,KeyboardAvoidingView,TouchableOpacity} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../shared/Colors'

const AddTodoModal = ({closeModal}) => 
  <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <TouchableOpacity 
      style={{position:'absolute',top:64,right:32}} 
      onPress={closeModal}
    >
      <AntDesign name='close'size={28} color={colors.black}/>
    </TouchableOpacity>
</KeyboardAvoidingView>

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default AddTodoModal;
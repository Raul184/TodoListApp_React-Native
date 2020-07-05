import React ,{useState} from 'react'
import { 
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import colors from '../shared/Colors';
import {AntDesign,Ionicons} from '@expo/vector-icons';

const TodoModal = ({item,closeModal,updateTodo}) => {
  const { name,color,todos } = item;
  const [nueTodo, setTodo] = useState('')

  const done = todos.filter(el => el.completed).length
  
  const toogleTodoComplete = index => {
    let todo = item
    todo.todos[index].completed = !todo.todos[index].completed
    
    updateTodo(todo) 
  }
  const renderTodo = (todo,index) => {
    let colored = todo.completed ? colors.green: colors.red
    return (
      <View style={[styles.todoContainer,{flexDirection:'row'}]}>
        <TouchableOpacity onPress={() => toogleTodoComplete(index)}>
          <Ionicons 
            name={todo.completed ? 'ios-square':'ios-square-outline'} 
            size={24} 
            color={colored} 
            style={{width:32}}
          />
        </TouchableOpacity>
        <Text 
          style={[
            styles.todo, 
            {textDecorationLine: todo.completed ? 'line-through':'none',
             color: todo.completed ? colors.green: colors.red
          }]}
        >{todo.title}</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          style={styles.touchable}
          onPress={closeModal}
        >
          <AntDesign name='caretleft' size={30} color={colors.black}/>
        </TouchableOpacity>

        <View style={[
          styles.section,
          styles.header,
          {borderBottomColor: color}
        ]}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.tasksCounter}>
              {done} of {todos.length} tasks
            </Text>
          </View>
        </View>
        <View style={styles.section, {flex:3}}>
          <FlatList 
            data={todos}
            renderItem={({item,index}) => renderTodo(item,index)}
            keyExtractor={item => item.title}
            contentContainerStyle={{paddingVertical:24}}
            showsVerticalScrollIndicator={false}
          /> 
        </View>
        <View style={[styles.section, styles.footer]}>
          <TextInput style={[styles.input,{borderColor:color}]}/>
          <TouchableOpacity style={[styles.addTodo,{backgroundColor:color}]}>
            <AntDesign name='plus' size={16} color={colors.white}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default TodoModal

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  touchable:{
    position: 'absolute',
    top:64,
    right:32,
    zIndex:10
  },
  section:{
    flex:1,
    alignSelf:'stretch'
  },
  header:{
    justifyContent:'flex-end',
    marginLeft:64,
    borderBottomWidth:3
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:colors.black
  },
  tasksCounter:{
    marginTop:4,
    marginBottom:16,
    color:colors.gray,
    fontWeight:'600'
  },
  footer:{
    paddingHorizontal:32,
    flexDirection:'row',
    alignItems:'center'
  },
  input:{
    flex:1,
    height:48,
    borderWidth:StyleSheet.hairlineWidth,
    borderRadius:6,
    marginRight:8,
    paddingHorizontal:8
  },
  addTodo:{
    borderRadius:4,
    padding:16,
    alignItems:'center',
    justifyContent:'center'
  },
  todoContainer:{
    paddingVertical:16,
    flexDirection:'column',
    alignItems:'center'
  },
  todo:{
    color: colors.black,
    fontWeight:'700',
    fontSize:16
  }
})

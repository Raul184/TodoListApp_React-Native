import React, { Component } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,FlatList,Modal} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from './shared/Colors';
import tempData from './tempData';
import TodoItem from './components/TodoItem'
import AddTodoModal from './components/AddTodoModal'
export default class App extends Component {
  state = {
    add:false,
    list: tempData
  }
  toggleTodoModal(){
    this.setState({add: !this.state.add})
  }
  renderFlatListItems(item){
    return <TodoItem item={item} updateTodo={this.updateTodo}/>
  }
  addTodo = todo => {
    this.setState({
      ...this.state,
      list: [...this.state.list , {id: this.state.list.length + 1, ...todo , todos:[] }] 
    })
  }
  updateTodo = todo => {
    this.setState({
      ...this.state,
      list: this.state.list.map(el => el.id === todo.id ? todo : el)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal 
          animationType='slide'
          visible={this.state.add}
          onRequestClose={() => this.toggleTodoModal()}
        >
          <AddTodoModal closeModal={() => this.toggleTodoModal()} addTodo={this.addTodo}/>
        </Modal>
        <View style={{flexDirection:"row"}}>
          <View style={styles.divider}/>
          <Text style={styles.title}>
            Todo <Text style={{fontWeight:'300',color: colors.blue}}>Lists</Text>
          </Text>
          <View style={styles.divider}/>
        </View>
        <View style={{marginVertical:48}}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add list</Text>
        </View>
        <View style={{height:275,paddingLeft:32}}>
          <FlatList 
            data={this.state.list} 
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderFlatListItems(item)}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor:colors.lightBlue,
    height:1,
    flex:1,
    alignSelf:'center'
  },
  title:{
    fontSize:38,
    fontWeight:'800',
    color: colors.black,
    paddingHorizontal:30
  },
  addList:{
    borderWidth:1,
    borderColor:colors.lightBlue,
    borderRadius:6,
    padding:16,
    alignItems:"center",
    justifyContent:"center"    
  },
  add:{
    color: colors.blue,
    fontWeight:'bold',
    fontSize:14,
    marginTop:8
  }
});

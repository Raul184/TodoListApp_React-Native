import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import colors from '../shared/Colors'

const TodoItem = ({item}) => {
  const completed = item.todos.filter(el => el.completed).length;
  return (
    <View style={[styles.itemContainer,{backgroundColor:item.color}]}>
      <Text style={styles.itemTitle} numberOfLines={1}>
        {item.name}
      </Text>
      <View>
        <View style={{alignItems:'center'}}>
          <Text style={styles.count}>{item.todos.length - completed}</Text>
          <Text style={styles.remain}>Remaining</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={styles.count}>{completed}</Text>
          <Text style={styles.remain}>Completed</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  itemContainer:{
    paddingVertical:32,
    paddingHorizontal:16,
    borderRadius:6,
    marginHorizontal:12,
    alignItems:'center',
    width:200
  },
  itemTitle:{
    fontSize:24,
    fontWeight:"700",
    color: colors.white,
    marginBottom:18
  },
  count:{
    fontSize:48,
    fontWeight:"200",
    color:colors.white
  },
  remain:{
    fontSize:14,
    fontWeight:"700",
    color:colors.white
  }
});

export default TodoItem;

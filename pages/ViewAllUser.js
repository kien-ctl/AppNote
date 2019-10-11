import React from 'react';
import { FlatList, Text, View,ImageBackground } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' }); 
export default class ViewAllUser extends React.Component {
    static navigationOptions= {
        drawerLabel:'List',
//         drawerIcon:() => (
//           <Image source={require('../src/iconDrawer.png')}  style={{width:'100%',height:50}}/>
//         )
  }
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };
  render() {
    return (
   
      <View style={{backgroundColor:'#BEF781'}}>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          
          renderItem={({ item }) => (
            <View key={item.user_id} style={{ backgroundColor: '#81F781', margin:20,borderWidth:1,borderRadius:5, }}>
              <Text>Id: {item.user_id}</Text>
              <Text>Tên ghi chú: {item.user_name}</Text>
              <Text>Thời gian: {item.user_contact}</Text>
              <Text>Nội dung: {item.user_address}</Text>
            </View>
          )}
        />
      </View>
   
    );
  }
}
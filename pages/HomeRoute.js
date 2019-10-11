import React from 'react';
import { View,StyleSheet,Image,TouchableHighlight,ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import {DrawerActions} from 'react-navigation-drawer';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class HomeScreen extends React.Component {
    static navigationOptions= {
        drawerLabel:'Homes',
        // drawerIcon:() => (
        //   <Image source={require('../src/iconDrawer.png')}  style={{width:'100%',height:50}}/>
        // )
 }
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }
  render() {
    return (
       <View>
            <View>
            <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                style={styles.touchableHighlight} underlayColor ={'rgba(0,0,0,0.8)'} >
              <Image source={require('./src/iconDrawer.png')} style={{width:50,height:30}}/>
            </TouchableHighlight>
             </View>
      
        </View>
    );
  }
}
    const styles = StyleSheet.create({
        touchableHighlight:{
            width:50,
            height:50,
            borderRadius:30,
            alignItems:'center',
            justifyContent:'center',
            position:'absolute',
            left:10,
            top:20,
        },

    })


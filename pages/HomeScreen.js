import React from 'react';
import { View,StyleSheet,TouchableHighlight,Image,TouchableOpacity,ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import {DrawerActions} from 'react-navigation-drawer';
export default class HomeScreen extends React.Component {
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
     
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
       
       <ImageBackground source={require('./src/BG.jpeg')} style={{width:'100%',height:'100%'}}>
        <View style={{width:'100%',height:50}}>
           <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                style={styles.touchableHighlight} underlayColor ={'rgba(0,0,0,0.8)'}
              >
              <Image source={require('./src/iconDrawer.png')} style={{width:50,height:30}}/>
            </TouchableHighlight>
            <TouchableOpacity style={styles.Tplus }
                
                onPress ={() => this.props.navigation.navigate('Register')}
            >
              <Image source={require('./src/iconPlus.png')} style={{width:40,height:40}}/>
            </TouchableOpacity>
            </View>
        {/* <Mybutton
          title="Thêm Ghi Chú"
          
        /> */}
        {/* <Mybutton
          title="Sửa ghi chú"
          customClick={() => this.props.navigation.navigate('Update')}
        /> */}
        {/* <Mybutton
          title="Tìm kiếm ghi chú"
          customClick={() => this.props.navigation.navigate('View')}
        /> */}
        {/* <Mybutton
          title="Danh sách các ghi chú"
          customClick={() => this.props.navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="xóa ghi chú"
          customClick={() => this.props.navigation.navigate('Delete')}
        /> */}
            </ImageBackground>
      </View>
  
    );
  }
}
    const styles =StyleSheet.create({

        touchableHighlight:{
            width:50,
            height:40,
            left:10,
            marginTop:10,
           
        },
        Tplus:{
          width:50,
            height:50,
            borderRadius:30,
            alignItems:'center',
            justifyContent:'center',
            position:'absolute',
            right:10,
            top:7,
  
        }
    })


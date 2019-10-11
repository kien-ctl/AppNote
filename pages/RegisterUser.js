import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert,ImageBackground,Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }
  register_user = () => {
    var that = this;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    
      if (user_contact) {
        if (user_address) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
              [user_name, user_contact, user_address],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Thêm thành công',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Thêm thất bại');
                }
              }
            );
          });
        } else {
          alert('Nhập tên ghi chú !');
        }
      } else {
        alert('Nhập thời gian ghi chú !');
      }{
        alert('nhập nội dung')
      }
    
  };
  render() {
    return (
    
      <View style={{ backgroundColor: '#BEF781', flex: 1 }}>
         
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Tên ghi chú !"
              onChangeText={user_name => this.setState({ user_name })}
              style={{ padding:10}}
            />
            <Mytextinput
              placeholder="Thời gian ghi chú !"
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding:10,marginTop:10 }}
            />
            <Mytextinput
              placeholder="Nội dung ghi chú"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={15}
              multiline={true}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            {/* <Button
              title='THÊM GHI CHÚ'
              style={{  borderWidth:2,
                borderRadius:15,
               }}
            /> */}
            <Mybutton
              title="THÊM GHI CHÚ"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
       
      </View>
      
    );
  }
}

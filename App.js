import React from 'react';
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
 import HomeRoute from './pages/HomeRoute';
import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';
import {createBottomTabNavigator} from 'react-navigation-tabs';
 
const Search = createStackNavigator({
        Searchs:{
          screen:ViewUser
        }
});
const List = createStackNavigator({
  List:{
    screen:ViewAllUser
  }
});

const Home = createStackNavigator({

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'HomeScreen',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
    
  },
 
  View: {
    screen: ViewUser,
    navigationOptions: {
      title: 'Danh sách ghi chú',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  ViewAll: {
    screen: ViewAllUser,
    navigationOptions: {
      title: 'Danh sách tất cả ghi chú',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Update: {
    screen: UpdateUser,
    navigationOptions: {
      title: 'Sửa ghi chú',
      headerStyle: { backgroundColor: '#f05555' },
      
    },
  },
  Register: {
    screen: RegisterUser,
    navigationOptions: {
      title: 'Thêm',
    
      headerTintColor: '#ffffff',
    },
  },
  Delete: {
    screen: DeleteUser,
    navigationOptions: {
      title: 'xóa ghi chú',
      headerBackImage:() => (
        <Image source={require('./pages/src/iconDrawer.png')}  style={{width:'100%',height:50}}/>
      )  
  
    },
  },
});
const Drawer = createDrawerNavigator({
    Home:HomeScreen,
    Edit:{
      screen:UpdateUser,
      navigationOptions: {
        title: 'xóa ghi chú',

      },
    },
    Delete:DeleteUser
    
});



export default createAppContainer(
  createBottomTabNavigator(
    {
      Drawer,
      Home,      
      List,
      Search,
     
     
    },
   
  )
);
  
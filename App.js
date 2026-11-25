import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import BottomNavigation from './src/components/BottomNavigation';
import { colors } from './src/constants/theme';

export default function App() {
 const [activePage,setActivePage]=useState('home');
 const page=activePage==='explore'?<ExploreScreen/>:activePage==='details'?<DetailsScreen/>:<HomeScreen/>;
 return <SafeAreaView style={styles.safeArea}><StatusBar barStyle="light-content" backgroundColor={colors.background}/><View style={styles.container}><View style={styles.content}>{page}</View><BottomNavigation activePage={activePage} onChange={setActivePage}/></View></SafeAreaView>;
}
const styles=StyleSheet.create({safeArea:{flex:1,backgroundColor:colors.background},container:{flex:1,backgroundColor:colors.background},content:{flex:1}});

import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import { colors } from '../constants/theme';

const videos=[
 {title:'Melhores momentos dos GPs',subtitle:'Replays, ultrapassagens e momentos decisivos',url:'https://www.youtube.com/@F1/search?query=race%20highlights'},
 {title:'Classificação e pole position',subtitle:'Voltas rápidas e disputas por posição',url:'https://www.youtube.com/@F1/search?query=qualifying%20highlights'},
 {title:'Bastidores e especiais',subtitle:'Rádio das equipes, entrevistas e histórias do paddock',url:'https://www.youtube.com/@F1/videos'}
];
export default function DetailsScreen(){return <Screen>
 <Text style={styles.kicker}>REPLAY • ON DEMAND</Text><Text style={styles.title}>Highlights</Text><Text style={styles.subtitle}>Reviva os melhores momentos da categoria.</Text>
 <View style={styles.hero}><Text style={styles.play}>▶</Text><Text style={styles.heroTitle}>A EMOÇÃO NÃO PARA.</Text><Text style={styles.heroCopy}>Vídeos e melhores momentos no canal oficial da Fórmula 1.</Text><Pressable style={styles.button} onPress={()=>Linking.openURL('https://www.youtube.com/@F1/videos')}><Text style={styles.buttonText}>VER CANAL OFICIAL ↗</Text></Pressable></View>
 {videos.map(v=><Pressable key={v.title} style={styles.item} onPress={()=>Linking.openURL(v.url)}><View style={styles.thumb}><Text style={styles.thumbPlay}>▶</Text></View><View style={{flex:1}}><Text style={styles.itemTitle}>{v.title}</Text><Text style={styles.itemCopy}>{v.subtitle}</Text></View><Text style={styles.arrow}>↗</Text></Pressable>)}
 <Text style={styles.note}>Links para vídeos publicados pela conta oficial da F1 no YouTube. A disponibilidade varia por região.</Text>
 </Screen>}
const styles=StyleSheet.create({kicker:{color:colors.primary,fontSize:10,fontWeight:'900',letterSpacing:1.6,marginBottom:10},title:{color:colors.text,fontSize:30,fontWeight:'900'},subtitle:{color:colors.muted,fontSize:13,marginTop:8,marginBottom:22},hero:{backgroundColor:'#211416',borderColor:'#552321',borderWidth:1,borderRadius:19,padding:20,marginBottom:22},play:{color:colors.primary,fontSize:32,marginBottom:14},heroTitle:{color:colors.text,fontSize:23,fontWeight:'900'},heroCopy:{color:'#C4A9A8',fontSize:12,lineHeight:19,marginTop:8},button:{alignSelf:'flex-start',backgroundColor:colors.primary,borderRadius:9,paddingHorizontal:14,paddingVertical:12,marginTop:18},buttonText:{color:colors.white,fontWeight:'900',fontSize:9,letterSpacing:1},item:{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:15,padding:12,marginBottom:10},thumb:{width:62,height:54,backgroundColor:'#35191B',borderRadius:9,alignItems:'center',justifyContent:'center'},thumbPlay:{color:colors.primary,fontSize:20},itemTitle:{color:colors.text,fontSize:12,fontWeight:'900'},itemCopy:{color:colors.muted,fontSize:10,lineHeight:15,marginTop:4},arrow:{color:colors.primary,fontSize:18},note:{color:'#737B86',fontSize:9,lineHeight:15,marginTop:12}});

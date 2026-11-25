import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text } from 'react-native';
import Screen from '../components/Screen';
import { colors } from '../constants/theme';
import { getLatestNews } from '../services/f1';

export default function ExploreScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { getLatestNews().then(setNews).catch(() => setError('Não foi possível carregar as manchetes. Use o portal oficial abaixo.')).finally(() => setLoading(false)); }, []);
  return (
    <Screen>
      <Text style={styles.kicker}>PADDOCK • ATUALIZAÇÕES</Text><Text style={styles.title}>Últimas notícias</Text><Text style={styles.subtitle}>As novidades mais recentes da Fórmula 1.</Text>
      <Pressable style={styles.source} onPress={() => Linking.openURL('https://www.formula1.com/en/latest')}><Text style={styles.sourceText}>ABRIR PORTAL OFICIAL DA F1 ↗</Text></Pressable>
      {loading ? <ActivityIndicator color={colors.primary} size="large" style={{marginTop:28}} /> : null}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {news.map((item,index)=><Pressable key={item.id} style={styles.card} onPress={()=>Linking.openURL(item.link)}>
        <Text style={styles.date}>{item.date ? new Date(item.date).toLocaleDateString('pt-BR') : 'F1 NEWS'} • {String(index+1).padStart(2,'0')}</Text>
        <Text style={styles.newsTitle}>{item.title}</Text>
        {!!item.description && <Text style={styles.description} numberOfLines={3}>{item.description}</Text>}
        <Text style={styles.read}>LER MATÉRIA ↗</Text>
      </Pressable>)}
      {!loading && !news.length && !error ? <Text style={styles.error}>Nenhuma manchete disponível agora.</Text> : null}
      <Text style={styles.footnote}>Feed Autosport • As matérias abrem no site de origem.</Text>
    </Screen>
  );
}
const styles=StyleSheet.create({kicker:{color:colors.primary,fontSize:10,fontWeight:'900',letterSpacing:1.6,marginBottom:10},title:{color:colors.text,fontSize:30,fontWeight:'900'},subtitle:{color:colors.muted,fontSize:13,marginTop:8,marginBottom:20},source:{backgroundColor:colors.primary,borderRadius:12,padding:14,marginBottom:18},sourceText:{color:colors.white,fontWeight:'900',fontSize:10,textAlign:'center',letterSpacing:1},card:{backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:16,padding:16,marginBottom:12},date:{color:colors.muted,fontSize:10,marginBottom:12},newsTitle:{color:colors.text,fontSize:16,lineHeight:22,fontWeight:'900'},description:{color:colors.muted,fontSize:11,lineHeight:17,marginTop:8},read:{color:colors.primary,fontSize:9,fontWeight:'900',marginTop:14},error:{color:'#FF8B85',fontSize:12,lineHeight:18,marginTop:20},footnote:{color:'#737B86',fontSize:9,marginTop:10,marginBottom:12}});

import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import { colors } from '../constants/theme';
import { getLatestSession } from '../services/f1';

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try { setData(await getLatestSession()); setError(''); }
    catch { setError('Não foi possível atualizar a cronometragem. Verifique sua conexão.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [load]);

  const session = data?.session;
  const dateLabel = session?.date_start
    ? new Date(session.date_start).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })
    : 'Aguardando dados da próxima sessão';

  return (
    <Screen>
      <View style={styles.topline}><Text style={styles.brand}>GRID <Text style={styles.red}>47</Text></Text><Text style={styles.season}>F1 • 2026</Text></View>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>FORMULA 1 / CENTRAL DE CORRIDA</Text>
        <Text style={styles.heroTitle}>SINTA A VELOCIDADE.</Text>
        <Text style={styles.heroCopy}>Corridas, notícias e os melhores momentos do automobilismo.</Text>
        <View style={styles.stripe} />
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>CRONOMETRAGEM</Text><Pressable onPress={load}><Text style={styles.refresh}>↻ ATUALIZAR</Text></Pressable></View>
      <View style={styles.raceCard}>
        <View style={styles.raceTop}>
          <Text style={styles.cardEyebrow}>ÚLTIMA SESSÃO DISPONÍVEL</Text>
          <View style={[styles.status, data?.live && styles.statusLive]}><View style={[styles.dot, data?.live && styles.dotLive]} /><Text style={[styles.statusText, data?.live && styles.statusTextLive]}>{data?.live ? 'AO VIVO' : 'SEM SESSÃO AO VIVO'}</Text></View>
        </View>
        <Text style={styles.raceTitle}>{session ? `${session.meeting_name || 'Grande Prêmio'} • ${session.session_name || 'Sessão'}` : 'Aguardando próxima sessão'}</Text>
        <Text style={styles.raceMeta}>{session?.circuit_short_name || session?.location || 'FIA Formula One World Championship'}</Text>
        <Text style={styles.date}>{dateLabel}</Text>
        {loading && !data ? <ActivityIndicator color={colors.primary} style={{ margin: 22 }} /> : null}
        {!!error && <Text style={styles.error}>{error}</Text>}
        {data?.positions?.length ? <View style={styles.table}>
          <View style={styles.tableHead}><Text style={styles.tableHeadText}>POS</Text><Text style={styles.tableHeadText}>PILOTO</Text><Text style={styles.tableHeadText}>Nº</Text></View>
          {data.positions.map((entry) => <View style={styles.driverRow} key={entry.driver_number}><Text style={styles.position}>{String(entry.position).padStart(2, '0')}</Text><Text style={styles.driverName}>{entry.driver?.name_acronym || entry.driver?.full_name || 'Piloto'}</Text><Text style={styles.driverNumber}>{entry.driver_number}</Text></View>)}
        </View> : <Text style={styles.empty}>{data ? 'O feed de posições aparece durante sessões com telemetria disponível.' : 'Conectando aos dados da pista…'}</Text>}
        <Text style={styles.disclaimer}>Atualização automática a cada 15 segundos • Dados via OpenF1</Text>
      </View>
      <Text style={styles.sectionTitle}>NO RADAR</Text>
      <Pressable style={styles.feature} onPress={() => require('react-native').Linking.openURL('https://www.formula1.com/en/racing/2026.html')}><Text style={styles.featureIcon}>🏁</Text><View style={{ flex: 1 }}><Text style={styles.featureTitle}>Calendário da temporada</Text><Text style={styles.featureCopy}>Datas, circuitos e programação dos GPs</Text></View><Text style={styles.arrow}>↗</Text></Pressable>
      <Pressable style={styles.feature} onPress={() => require('react-native').Linking.openURL('https://www.formula1.com/en/results/2026/drivers.html')}><Text style={styles.featureIcon}>🏆</Text><View style={{ flex: 1 }}><Text style={styles.featureTitle}>Classificação dos pilotos</Text><Text style={styles.featureCopy}>Acompanhe a disputa pelo campeonato</Text></View><Text style={styles.arrow}>↗</Text></Pressable>
    </Screen>
  );
}
const styles = StyleSheet.create({
  topline:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:22},brand:{color:colors.text,fontSize:25,fontWeight:'900',letterSpacing:-1},red:{color:colors.primary},season:{color:colors.muted,fontSize:10,fontWeight:'900',letterSpacing:1},
  hero:{backgroundColor:'#171B23',borderRadius:20,padding:22,marginBottom:26,overflow:'hidden',borderWidth:1,borderColor:colors.border},eyebrow:{color:'#FF514B',fontSize:9,fontWeight:'900',letterSpacing:1.5,marginBottom:13},heroTitle:{color:colors.text,fontSize:28,fontWeight:'900',letterSpacing:-1},heroCopy:{color:colors.muted,fontSize:13,lineHeight:20,marginTop:9},stripe:{height:5,width:90,backgroundColor:colors.primary,marginTop:22,borderRadius:4},
  sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},sectionTitle:{color:colors.text,fontSize:13,fontWeight:'900',letterSpacing:1.4,marginBottom:12},refresh:{color:colors.primary,fontSize:10,fontWeight:'900'},
  raceCard:{backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,borderRadius:18,padding:17,marginBottom:24},raceTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8},cardEyebrow:{color:colors.muted,fontSize:9,fontWeight:'800'},status:{flexDirection:'row',alignItems:'center',gap:6,backgroundColor:'#282D36',paddingHorizontal:9,paddingVertical:6,borderRadius:20},statusLive:{backgroundColor:'#153323'},dot:{width:6,height:6,borderRadius:4,backgroundColor:colors.muted},dotLive:{backgroundColor:colors.green},statusText:{color:colors.muted,fontSize:8,fontWeight:'900'},statusTextLive:{color:'#7CE6A2'},
  raceTitle:{color:colors.text,fontSize:19,fontWeight:'900',marginTop:17},raceMeta:{color:colors.primary,fontSize:12,fontWeight:'700',marginTop:5},date:{color:colors.muted,fontSize:11,marginTop:8},table:{marginTop:18,borderTopWidth:1,borderTopColor:colors.border,paddingTop:10},tableHead:{flexDirection:'row',paddingBottom:8},tableHeadText:{color:colors.muted,fontSize:9,fontWeight:'900',width:48},driverRow:{flexDirection:'row',alignItems:'center',paddingVertical:10,borderTopWidth:1,borderTopColor:'#252B35'},position:{color:colors.primary,width:48,fontWeight:'900'},driverName:{color:colors.text,flex:1,fontSize:13,fontWeight:'800'},driverNumber:{color:colors.muted,width:30,textAlign:'right'},empty:{color:colors.muted,fontSize:12,lineHeight:19,marginTop:18},error:{color:'#FF8B85',fontSize:11,marginTop:12},disclaimer:{color:'#727985',fontSize:9,marginTop:15},
  feature:{flexDirection:'row',alignItems:'center',backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:15,padding:15,marginBottom:10,gap:13},featureIcon:{fontSize:23},featureTitle:{color:colors.text,fontWeight:'800',fontSize:13},featureCopy:{color:colors.muted,fontSize:10,marginTop:4},arrow:{color:colors.primary,fontSize:18,fontWeight:'900'}
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import InfoCard from '../components/InfoCard';
import { colors } from '../constants/theme';

export default function HomeScreen({ onExplore }) {
  return (
    <Screen>
      <Text style={styles.kicker}>PROJETO • 2º INFO 2026</Text>
      <Text style={styles.title}>Bem-vindo.</Text>
      <Text style={styles.subtitle}>Seu espaço para conhecer o projeto e acessar seus conteúdos.</Text>

      <View style={styles.hero}>
        <Text style={styles.heroTag}>VISÃO GERAL</Text>
        <Text style={styles.heroTitle}>Explore. Descubra. Aprenda.</Text>
        <Text style={styles.heroText}>Uma estrutura simples, organizada e pronta para crescer com novas funcionalidades.</Text>
      </View>

      <Text style={styles.sectionTitle}>Comece por aqui</Text>
      <InfoCard
        eyebrow="Conteúdo"
        title="Área de exploração"
        description="Veja os conteúdos disponíveis e acesse uma área com mais informações."
        actionLabel="Abrir exploração"
        onPress={onExplore}
      />
      <InfoCard
        eyebrow="Estrutura"
        title="Projeto preparado para API"
        description="A camada de serviços já está separada da interface para facilitar uma futura integração com servidor."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 12 },
  title: { color: colors.text, fontSize: 34, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 22 },
  hero: { backgroundColor: '#12384A', borderRadius: 22, padding: 22, marginBottom: 27, borderWidth: 1, borderColor: '#226174' },
  heroTag: { color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 12 },
  heroTitle: { color: colors.text, fontSize: 25, fontWeight: '900', lineHeight: 31, marginBottom: 9 },
  heroText: { color: '#C1D5DF', fontSize: 13, lineHeight: 20 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 13 },
});

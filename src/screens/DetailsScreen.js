import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import { colors } from '../constants/theme';

export default function DetailsScreen({ onBack }) {
  return (
    <Screen>
      <Pressable onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>←  Voltar para explorar</Text>
      </Pressable>
      <Text style={styles.kicker}>INFORMAÇÕES</Text>
      <Text style={styles.title}>Detalhes</Text>
      <Text style={styles.subtitle}>Uma página dedicada às informações de cada conteúdo.</Text>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Sobre esta área</Text>
        <Text style={styles.body}>Esta tela pode receber os detalhes de um item selecionado na página Explorar. Quando a API estiver conectada, os dados poderão ser carregados pelo identificador do item.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Próximas integrações</Text>
        <Text style={styles.bullet}>• Buscar um item pelo ID</Text>
        <Text style={styles.bullet}>• Exibir título, descrição e imagem</Text>
        <Text style={styles.bullet}>• Mostrar mensagens de carregamento e erro</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 18 },
  backText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  kicker: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 },
  title: { color: colors.text, fontSize: 32, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 24 },
  panel: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 14 },
  panelTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 10 },
  body: { color: colors.muted, fontSize: 13, lineHeight: 21 },
  bullet: { color: colors.muted, fontSize: 13, lineHeight: 24 },
});

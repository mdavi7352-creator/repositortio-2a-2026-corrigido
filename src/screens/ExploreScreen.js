import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import InfoCard from '../components/InfoCard';
import { colors } from '../constants/theme';

const topics = [
  { id: 'intro', eyebrow: '01 • Introdução', title: 'Conheça o projeto', description: 'Entenda a proposta, os objetivos e como navegar pelas áreas do aplicativo.' },
  { id: 'content', eyebrow: '02 • Conteúdo', title: 'Conteúdos principais', description: 'Espaço reservado para listar categorias, materiais e informações que serão conectadas à API.' },
  { id: 'updates', eyebrow: '03 • Atualizações', title: 'Novidades', description: 'Área preparada para exibir atualizações recebidas do servidor futuramente.' },
];

export default function ExploreScreen({ onOpenDetails }) {
  return (
    <Screen>
      <Text style={styles.kicker}>DESCUBRA</Text>
      <Text style={styles.title}>Explorar</Text>
      <Text style={styles.subtitle}>Acesse as áreas do projeto.</Text>
      {topics.map((topic) => (
        <InfoCard
          key={topic.id}
          eyebrow={topic.eyebrow}
          title={topic.title}
          description={topic.description}
          actionLabel="Ver detalhes"
          onPress={onOpenDetails}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 },
  title: { color: colors.text, fontSize: 32, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 8, marginBottom: 24 },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function InfoCard({ eyebrow, title, description, onPress, actionLabel }) {
  const content = (
    <View style={styles.card}>
      {!!eyebrow && <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>}
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
      {!!actionLabel && <Text style={styles.action}>{actionLabel}  →</Text>}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 13,
  },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  title: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 7 },
  description: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  action: { color: colors.primary, fontWeight: '700', fontSize: 12, marginTop: 14 },
});

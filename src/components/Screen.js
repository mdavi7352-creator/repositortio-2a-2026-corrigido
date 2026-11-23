import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';

export default function Screen({ children, contentContainerStyle }) {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 30 },
});

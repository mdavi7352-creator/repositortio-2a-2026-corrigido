import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

const items = [
  { id: 'home', label: 'Início', icon: '⌂' },
  { id: 'explore', label: 'Explorar', icon: '⌕' },
  { id: 'details', label: 'Detalhes', icon: '◈' },
];

export default function BottomNavigation({ activePage, onChange }) {
  return (
    <View style={styles.bar}>
      {items.map((item) => {
        const active = activePage === item.id;
        return (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(item.id)}
            style={styles.item}
          >
            <Text style={[styles.icon, active && styles.active]}>{item.icon}</Text>
            <Text style={[styles.label, active && styles.active]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: { flex: 1, alignItems: 'center', gap: 3 },
  icon: { color: colors.muted, fontSize: 22 },
  label: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  active: { color: colors.primary },
});

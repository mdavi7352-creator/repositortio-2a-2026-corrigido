import React, { useEffect } from "react";
import { View, ViewProps, Appearance, ColorSchemeName } from "react-native";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";

export type ModeType = "light" | "dark" | "system";

interface GluestackUIProviderProps {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps["style"];
}

export function GluestackUIProvider({
  mode = "system",
  children,
  style,
}: GluestackUIProviderProps) {
  useEffect(() => {
    Appearance.setColorScheme(mode as ColorSchemeName);
  }, [mode]);

  return (
    <View
      style={[
        {
          flex: 1,
          width: "100%",
          height: "100%",
        },
        style,
      ]}
    >
      <OverlayProvider children={undefined}>
        <ToastProvider children={undefined}>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
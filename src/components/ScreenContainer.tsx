import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ScreenContainer = ({ style, children }: { style?: any, children: React.ReactNode }) => {
    const insets = useSafeAreaInsets();

    return <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, ...style }}>{children}</View>;
};
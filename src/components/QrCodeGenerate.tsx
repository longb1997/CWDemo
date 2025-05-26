import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleProp, ViewStyle, View, Text, StyleSheet } from 'react-native';

interface QrCodeGenerateProps {
  value: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const QrCodeGenerate = ({ value, size = 150, style }: QrCodeGenerateProps) => {
  const [error, setError] = useState(null);

  return (
    <View style={[styles.container, style, { width: size + 32 }]}>
      {error ? (
        <Text>Can not show QR code</Text>
      ) : (
        <QRCode value={value} size={size} onError={setError} />
      )}
    </View>
  );
};

export default QrCodeGenerate;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    alignSelf: 'center',
    borderRadius: 8
  }
});

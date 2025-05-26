import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const ClipboardService = {
  set(str, {copiedMessage = 'Copied', errorMessage = ''} = {}) {
    try {
      if (str && typeof str === 'string') {
        Clipboard.setString(str);
        Toast.show(copiedMessage ?? 'Copied');
      } else {
        throw new Error('Clipboard data must be string');
      }
    } catch {
      Toast.show(errorMessage ?? 'Please tap again to copy.');
    }
  },

  get() {
    return Clipboard.getString();
  },
};

export default ClipboardService;

import {Buffer} from 'buffer';

import axios from 'axios';
import RNFS from 'react-native-fs';

const Constants = {
  voiceSettings: {
    voice_id: 'TxGEqnHWrfWFTfGW9XjX',
    stability: 0.5,
    similarity_boost: 0.5,
    streamingLatency: 2,
  },
  modelID: 'eleven_multilingual_v1',
  text: 'Hello, I am your advisor',
  ElevenLabsApiKey: process.env.ELEVEN_LABS_API_KEY,
};

const ElevenLabsService = {
  endpointURL: `https://api.elevenlabs.io/v1/text-to-speech/${Constants.voiceSettings.voice_id}`,

  async sendMessage(text, voice_settings) {
    const body = {
      model_id: Constants.modelID,
      text: text || Constants.text,
      voice_settings: voice_settings || Constants.voiceSettings,
    };

    try {
      const response = await axios.post(this.endpointURL, body, {
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': Constants.ElevenLabsApiKey,
        },
        params: {
          optimize_streaming_latency: Constants.voiceSettings.streamingLatency,
        },
        responseType: 'arraybuffer',
      });

      const fileURL = `${RNFS.DocumentDirectoryPath}/output.mp3`;

      // Convert ArrayBuffer response to Base64
      let base64Audio = Buffer.from(response.data, 'binary').toString('base64');
      await RNFS.writeFile(fileURL, base64Audio, 'base64');

      return fileURL;
    } catch (error) {
      console.log('Error sending message:', error);
    }
  },
};

export default ElevenLabsService;

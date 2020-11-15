package com.web.backend.controller.conversation;

import com.google.cloud.speech.v1p1beta1.*;
import com.google.protobuf.ByteString;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


public class SpeechToText{

    public static String recognitionSpeech(String localFilePath) {
        try (SpeechClient speechClient = SpeechClient.create()) {

            // The language of the supplied audio
            String languageCode = "ko-KR";

            // Sample rate in Hertz of the audio data sent
            int sampleRateHertz = 48000;

            // Encoding of audio data sent. This sample sets this explicitly.
            // This field is optional for FLAC and WAV audio formats.
            RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.MP3;
            RecognitionConfig config =
                    RecognitionConfig.newBuilder()
                            .setLanguageCode(languageCode)
                            .setSampleRateHertz(sampleRateHertz)
                            .setEncoding(encoding)
                            .build();
            Path path = Paths.get(localFilePath);
            byte[] data = Files.readAllBytes(path);
            ByteString content = ByteString.copyFrom(data);

            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(content).build();
            RecognizeRequest request =
                    RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
            RecognizeResponse response = speechClient.recognize(request);
            String text = new String();
            for (SpeechRecognitionResult result : response.getResultsList()) {
                // First alternative is the most probable result
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                System.out.printf("Transcript: %s\n", alternative.getTranscript());
                text+=alternative.getTranscript();
            }
            return text;
        } catch (Exception exception) {
            System.err.println("Failed to create the client due to: " + exception);
        }
        return null;
    }
}
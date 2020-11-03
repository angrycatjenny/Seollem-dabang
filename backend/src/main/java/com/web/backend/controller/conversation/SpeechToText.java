package com.web.backend.controller.conversation;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.protobuf.ByteString;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class SpeechToText {

    public static void recognitionSpeech(String filePath) throws Exception {
        // Instantiates a client
        try (SpeechClient speechClient = SpeechClient.create()) {

            // Reads the audio file into memory
            Path path = Paths.get(filePath);
            System.out.println(path);
            System.out.println("QQQQQ");
            byte[] data = Files.readAllBytes(path);
            System.out.println(data);
            System.out.println("WWWWW");
            ByteString audioBytes = ByteString.copyFrom(data);
            System.out.println(audioBytes);
            System.out.println("EEEEE");

            // Builds the sync recognize request
            RecognitionConfig config =
                    RecognitionConfig.newBuilder()
                            .setEncoding(AudioEncoding.LINEAR16)
                            .setSampleRateHertz(16000)
                            .setLanguageCode("ko-KR")
                            .build();

            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();

            // Performs speech recognition on the audio file
            RecognizeResponse response = speechClient.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();
            System.out.println(response);
            System.out.println(results);

            for (SpeechRecognitionResult result : results) {
                // There can be several alternative transcripts for a given chunk of speech. Just use the
                // first (most likely) one here.
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                System.out.printf("Transcription: %s%n", alternative.getTranscript());
            }
        }
    }
}

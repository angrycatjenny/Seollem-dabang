package com.web.backend.controller.question;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;

import java.util.ArrayList;
import java.util.List;

public class MorphologicalAnalysis {
    public ArrayList<String> MorAnalysis(String content){
        Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
        String strToAnalyze = content;

        KomoranResult analyzeResultList = komoran.analyze(strToAnalyze);

        List<Token> tokenList = analyzeResultList.getTokenList();
        ArrayList<String> keywords = new ArrayList();
        for (Token token : tokenList) {
            if(token.getPos().equals("NP") || token.getPos().equals("NNG") || token.getPos().equals("NNP")){
                if(!token.getMorph().equals("나")&&!token.getMorph().equals("저")){
                    keywords.add(token.getMorph());
                }
            }
        }
        return keywords;
    }
}

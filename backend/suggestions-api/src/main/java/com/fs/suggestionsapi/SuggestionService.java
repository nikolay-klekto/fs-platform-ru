package com.fs.suggestionsapi;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {
    private final SuggestionRepository suggestionRepository;

    public SuggestionService(SuggestionRepository suggestionRepository) {
        this.suggestionRepository = suggestionRepository;
    }

    public List<Suggestion> fetchAllProfessionSuggestions(){
        return suggestionRepository.findByCompanyNameIsNullAndIsActiveTrue();
    }
    public List<Suggestion> fetchAllCompaniesSuggestions(){
        return suggestionRepository.findByProfessionNameIsNullAndIsActiveTrue();
    }
}

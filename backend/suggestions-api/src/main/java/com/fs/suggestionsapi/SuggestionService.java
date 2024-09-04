package com.fs.suggestionsapi;

import com.fs.suggestionsapi.util.SuggestionNotFoundException;
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
    public Suggestion createSuggestion(SuggestionInput suggestionInput){
        Suggestion suggestion = Suggestion.builder()
                .professionName(suggestionInput.professionName())
                .suggesterName(suggestionInput.suggesterName())
                .companyName(suggestionInput.companyName())
                .email(suggestionInput.email())
                .isActive(suggestionInput.isActive())
                .build();
        return suggestionRepository.save(suggestion);
    }
    public Suggestion updateSuggestionStatus(Long id, Boolean status){
        Suggestion suggestion = suggestionRepository.findById(id).orElseThrow(() ->
                new SuggestionNotFoundException(id));
        suggestion.setActive(status);
        return suggestionRepository.save(suggestion);
    }
}

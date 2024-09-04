package com.fs.suggestionsapi;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SuggestionController {
    private final SuggestionService suggestionService;

    public SuggestionController(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }

    @QueryMapping
    List<Suggestion> getAllProfessionSuggestions() {
        return suggestionService.fetchAllProfessionSuggestions();
    }
    @QueryMapping
    List<Suggestion> getAllCompanySuggestions(){
        return suggestionService.fetchAllCompaniesSuggestions();
    }
    @MutationMapping
    Suggestion addSuggestion(@Argument SuggestionInput suggestion){
        return suggestionService.createSuggestion(suggestion);
    }
    @MutationMapping
    Suggestion updateSuggestionStatus(@Argument Long id, @Argument Boolean isActive) {
        return suggestionService.updateSuggestionStatus(id, isActive);
    }
}

package com.fs.suggestionsapi;

public record SuggestionInput(String professionName, String suggesterName, String companyName, String email,
                              Boolean isActive) {
}

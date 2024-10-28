package com.fs.suggestionsapi.util;

public class SuggestionNotFoundException extends RuntimeException{
    public SuggestionNotFoundException(Long id) {
        super("Suggestion with id " + id + " not found");
    }
}

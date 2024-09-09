package com.fs.suggestionsapi;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
    List<Suggestion> findByCompanyNameIsNullAndIsActiveTrue();
    List<Suggestion> findByProfessionNameIsNullAndIsActiveTrue();
}

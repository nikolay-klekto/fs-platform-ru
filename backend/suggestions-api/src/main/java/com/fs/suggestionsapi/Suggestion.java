package com.fs.suggestionsapi;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profession_company_suggestions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "profession_name")
    private String professionName;
    @Column(name = "suggester_name")
    private String suggesterName;
    @Column(name = "company_name")
    private String companyName;
    private String email;
    @Column(name = "is_active")
    private boolean isActive;

}

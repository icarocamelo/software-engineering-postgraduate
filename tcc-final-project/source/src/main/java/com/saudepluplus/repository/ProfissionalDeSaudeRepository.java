package com.saudepluplus.repository;

import com.saudepluplus.domain.ProfissionalDeSaude;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfissionalDeSaude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfissionalDeSaudeRepository extends JpaRepository<ProfissionalDeSaude, Long> {
}

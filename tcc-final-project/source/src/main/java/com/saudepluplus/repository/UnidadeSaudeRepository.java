package com.saudepluplus.repository;

import com.saudepluplus.domain.UnidadeSaude;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UnidadeSaude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadeSaudeRepository extends JpaRepository<UnidadeSaude, Long> {
}

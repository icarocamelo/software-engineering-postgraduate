package com.saudepluplus.repository;

import com.saudepluplus.domain.Enfermeiro;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Enfermeiro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnfermeiroRepository extends JpaRepository<Enfermeiro, Long> {
}

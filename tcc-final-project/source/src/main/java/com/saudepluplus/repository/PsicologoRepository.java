package com.saudepluplus.repository;

import com.saudepluplus.domain.Psicologo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Psicologo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PsicologoRepository extends JpaRepository<Psicologo, Long> {
}

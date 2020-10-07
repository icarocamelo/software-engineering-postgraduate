package com.saudepluplus.repository;

import com.saudepluplus.domain.Procedimento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Procedimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long> {
}

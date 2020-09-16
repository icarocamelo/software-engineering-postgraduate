package com.saudepluplus.repository;

import com.saudepluplus.domain.AgendaConsulta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AgendaConsulta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaConsultaRepository extends JpaRepository<AgendaConsulta, Long> {
}

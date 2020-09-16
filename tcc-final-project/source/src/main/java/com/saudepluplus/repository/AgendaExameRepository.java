package com.saudepluplus.repository;

import com.saudepluplus.domain.AgendaExame;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AgendaExame entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaExameRepository extends JpaRepository<AgendaExame, Long> {
}
